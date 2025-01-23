document.addEventListener("DOMContentLoaded", async () => {
  const statusElement = document.getElementById("plugin-status");
  const domainElement = document.getElementById("current-domain");
  const toggleButton = document.getElementById("toggle-plugin");
  const warningElement = document.getElementById("domain-warning");

  // 获取当前标签页的域名
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tab.url);
  const currentDomain = url.hostname;
  domainElement.textContent = currentDomain;

  // 检查是否是允许的域名
  const allowedDomains = [
    "chat.openai.com",
    "chatgpt.com",
    "ai.com"
  ];

  const isAllowedDomain = allowedDomains.some(domain => 
    currentDomain.includes(domain) || currentDomain.endsWith(`.${domain}`)
  );

  if (!isAllowedDomain) {
    // 如果不是允许的域名，显示为未启用状态并显示警告
    updateUI(false);
    toggleButton.disabled = true;
    toggleButton.classList.add("disabled");
    warningElement.textContent = "警告：当前网站不是官方的ChatGPT网站！\nWarning: This is not an official ChatGPT website!";
    warningElement.style.display = "block";
    warningElement.classList.add("warning");
    return;
  }

  // 检查伪装功能是否启用
  chrome.storage.local.get(["pluginEnabled"], (result) => {
    const isEnabled = result.pluginEnabled ?? true;
    updateUI(isEnabled);
  });

  // 切换伪装功能
  toggleButton.addEventListener("click", () => {
    if (!isAllowedDomain) return; // 如果不是允许的域名，不处理点击事件

    chrome.storage.local.get(["pluginEnabled"], (result) => {
      const isEnabled = result.pluginEnabled ?? true;
      const newStatus = !isEnabled;

      chrome.storage.local.set({ pluginEnabled: newStatus }, () => {
        // 广播到所有标签页
        chrome.tabs.query({url: '*://*.openai.com/*'}, tabs => {
          tabs.forEach(t => {
            chrome.tabs.sendMessage(t.id, {
              action: "togglePlugin",
              enabled: newStatus
            });
          });
        });
        updateUI(newStatus);
      });
    });
  });

  // 更新UI状态的函数
  function updateUI(isEnabled) {
    // 更新状态显示
    statusElement.textContent = isEnabled ? "启用/Enabled" : "禁用/Disabled";
    
    // 更新按钮双语文本
    const cnSpan = toggleButton.querySelector('.lang-cn');
    const enSpan = toggleButton.querySelector('.lang-en');
    if (isEnabled) {
      cnSpan.textContent = "防降智禁用";
      enSpan.textContent = "Disable Protection";
    } else {
      cnSpan.textContent = "防降智启用";
      enSpan.textContent = "Enable Protection";
    }
    statusElement.className = isEnabled ? "status-enabled" : "status-disabled";
  }
});
