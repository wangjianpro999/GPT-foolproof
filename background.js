// 日志函数
const log = (message, type = 'info') => {
  const timestamp = new Date().toISOString();
  console[type](`[${timestamp}] ${message}`);
};

// 错误处理函数
const handleError = (error, context) => {
  log(`Error in ${context}: ${error.message}`, 'error');
  if (error.stack) {
    log(`Stack trace: ${error.stack}`, 'error');
  }
};

// 初始化规则
chrome.runtime.onInstalled.addListener(async () => {
  try {
    log('插件安装/更新，正在初始化规则...');
    // 启用规则集
    await chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: ["ruleset_1"]
    });
    log('规则集初始化成功');
  } catch (error) {
    handleError(error, 'initialization');
  }
});

// 状态管理中间件
const broadcastStatus = (enabled) => {
  chrome.tabs.query({url: '*://*.openai.com/*'}, tabs => {
    tabs.forEach(tab => {
      chrome.tabs.sendMessage(tab.id, {
        action: "togglePlugin",
        enabled: enabled
      });
    });
  });
};

// 监听来自 popup 的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getStatus") {
    chrome.declarativeNetRequest.getEnabledRulesets()
      .then(enabledRulesets => {
        const isEnabled = enabledRulesets.includes("ruleset_1");
        log(`状态查询：规则集${isEnabled ? "已启用" : "未启用"}`);
        sendResponse({
          enabled: isEnabled
        });
      })
      .catch(error => {
        handleError(error, 'getStatus');
        sendResponse({
          enabled: false,
          error: error.message
        });
      });
    return true; // 保持消息通道开放以进行异步响应
  }
});