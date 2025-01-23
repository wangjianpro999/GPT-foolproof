// 从存储获取初始状态
let pluginEnabled = true;
chrome.storage.local.get(['pluginEnabled'], result => {
  pluginEnabled = result.pluginEnabled ?? true;
});

// 监听存储变化实现跨标签同步
chrome.storage.onChanged.addListener((changes) => {
  if (changes.pluginEnabled) {
    pluginEnabled = changes.pluginEnabled.newValue;
    if (pluginEnabled) {
      enableSimulations();
    } else {
      disableSimulations();
    }
  }
});

// 存储原始方法的引用
let originalToDataURL;
let originalGetParameter;
let originalGetContext;
let handleOrientation;

// 防抖函数
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// 监听来自 popup.js 或其他脚本的消息
chrome.runtime.onMessage.addListener((message) => {
  try {
    if (message.action === "togglePlugin") {
      pluginEnabled = message.enabled;
      console.log(`防降智功能已 ${pluginEnabled ? "启用" : "禁用"}`);
      if (pluginEnabled) {
        enableSimulations();
      } else {
        disableSimulations();
      }
    }
  } catch (error) {
    console.error("处理消息时发生错误:", error);
  }
});

// 防降智功能实现
const enableSimulations = () => {
  try {
    console.log("防降智功能已启用，模拟 Android 客户端环境...");
    
    // 模拟 Canvas 指纹
    originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
    originalGetContext = HTMLCanvasElement.prototype.getContext;
    
    HTMLCanvasElement.prototype.toDataURL = function (...args) {
      try {
        console.log("Canvas 指纹被拦截并修改");
        return originalToDataURL.apply(this, args).replace(/./g, (c, i) => 
          i % 2 ? String.fromCharCode(c.charCodeAt(0) ^ 2) : c);
      } catch (error) {
        console.error("Canvas toDataURL 拦截失败:", error);
        return originalToDataURL.apply(this, args);
      }
    };

    HTMLCanvasElement.prototype.getContext = function (...args) {
      const context = originalGetContext.apply(this, args);
      if (context && args[0] === '2d') {
        const originalGetImageData = context.getImageData;
        context.getImageData = function (...args) {
          const imageData = originalGetImageData.apply(this, args);
          // 轻微修改像素数据
          for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] = (imageData.data[i] + 1) % 256;
          }
          return imageData;
        };
      }
      return context;
    };

    // 模拟 WebGL 指纹
    originalGetParameter = WebGLRenderingContext.prototype.getParameter;
    WebGLRenderingContext.prototype.getParameter = function (param) {
      try {
        console.log("WebGL 指纹被拦截并修改");
        if (param === 37446) {
          return "Android GPU";
        }
        if (param === 37445) {
          return "Google Inc. (ARM)";
        }
        return originalGetParameter.call(this, param);
      } catch (error) {
        console.error("WebGL getParameter 拦截失败:", error);
        return originalGetParameter.call(this, param);
      }
    };

    // 模拟 Audio 指纹
    const audioContext = window.AudioContext || window.webkitAudioContext;
    if (audioContext) {
      const originalGetChannelData = AudioBuffer.prototype.getChannelData;
      AudioBuffer.prototype.getChannelData = function (channel) {
        const data = originalGetChannelData.call(this, channel);
        // 轻微修改音频数据
        for (let i = 0; i < data.length; i += 100) {
          data[i] = data[i] + 0.0001;
        }
        return data;
      };
    }

    // 动态电池状态模拟
    let batteryLevel = 0.85;
    let charging = true;
    
    const updateBattery = () => {
      batteryLevel = Math.min(1, Math.max(0,
        batteryLevel - (charging ? -0.01 : 0.005) + (Math.random()*0.06-0.03)
      ));
      
      // 每5分钟有10%概率切换充电状态
      if (Math.random() < 0.1) {
        charging = !charging;
      }
      
      setTimeout(updateBattery, 300000); // 每5分钟更新
    };
    
    updateBattery();

    Object.defineProperty(navigator, "getBattery", {
      value: () => Promise.resolve({
        charging,
        chargingTime: charging ? 3600 : 0,
        dischargingTime: charging ? Infinity : 7200,
        level: Number(batteryLevel.toFixed(2)),
        addEventListener: (type, listener) => {
          setTimeout(() => listener({
            charging,
            chargingTime: charging ? 3600 : 0,
            dischargingTime: charging ? Infinity : 7200,
            level: batteryLevel
          }), 500);
        },
        removeEventListener: () => {}
      }),
      configurable: false,
      writable: false
    });

    // 隐藏模拟痕迹
    navigator.getBattery.toString = () => 'function getBattery() { [native code] }';

    // 模拟振动 API
    navigator.vibrate = (pattern) => {
      console.log(`振动 API 被调用，模式: ${pattern}`);
      return true;
    };

    // 模拟设备方向
    handleOrientation = debounce((event) => {
      try {
        console.log("设备方向事件被触发");
        Object.defineProperties(event, {
          alpha: { value: 90 },
          beta: { value: 45 },
          gamma: { value: 0 }
        });
      } catch (error) {
        console.error("设备方向模拟失败:", error);
      }
    }, 100);

    window.addEventListener("deviceorientation", handleOrientation);

    // 模拟 Android WebView 环境
    const androidInterface = {
      getDeviceInfo: () => JSON.stringify({
        model: "Pixel 6",
        osVersion: "Android 13",
        manufacturer: "Google"
      }),
      isAppInstalled: (packageName) => true,
      getAppVersion: () => "2.0.0"
    };

    Object.defineProperty(window, "AndroidInterface", {
      value: androidInterface,
      configurable: false,
      enumerable: true
    });

    // 模拟 navigator 属性
    const navigatorProps = {
      userAgent: "Mozilla/5.0 (Linux; Android 13; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
      platform: "Linux armv8l",
      maxTouchPoints: 5,
      hardwareConcurrency: 8,
      deviceMemory: 4,
      connection: {
        effectiveType: "4g",
        rtt: 50,
        downlink: 10,
        saveData: false
      },
      language: "en-US",
      languages: ["en-US", "en"],
      vendor: "Google Inc."
    };

    Object.entries(navigatorProps).forEach(([key, value]) => {
      try {
        Object.defineProperty(navigator, key, {
          value: value,
          configurable: true,
          enumerable: true
        });
      } catch (error) {
        console.error(`设置 navigator.${key} 失败:`, error);
      }
    });

    // 模拟 WebRTC
    const originalRTCPeerConnection = window.RTCPeerConnection;
    window.RTCPeerConnection = function (...args) {
      const pc = new originalRTCPeerConnection(...args);
      const originalCreateOffer = pc.createOffer.bind(pc);
      
      pc.createOffer = async function (options) {
        const offer = await originalCreateOffer(options);
        offer.sdp = offer.sdp.replace(/IP4 .*\\r\\n/g, "IP4 0.0.0.0\\r\\n");
        return offer;
      };
      
      return pc;
    };
  } catch (error) {
    console.error("启用伪装功能时发生错误:", error);
  }
};

// 禁用伪装功能
const disableSimulations = () => {
  try {
    console.log("正在禁用伪装功能...");
    // 移除所有事件监听器
    if (handleOrientation) {
      window.removeEventListener("deviceorientation", handleOrientation);
    }
    
    // 恢复原始原型方法
    if (originalToDataURL) {
      HTMLCanvasElement.prototype.toDataURL = originalToDataURL;
    }
    if (originalGetContext) {
      HTMLCanvasElement.prototype.getContext = originalGetContext;
    }
    if (originalGetParameter) {
      WebGLRenderingContext.prototype.getParameter = originalGetParameter;
    }
    
    console.log("伪装功能已禁用");
  } catch (error) {
    console.error("禁用伪装功能时发生错误:", error);
  }
};

// 初始化伪装功能
const initialize = () => {
  try {
    // 检查浏览器兼容性
    const checkCompatibility = () => {
      const requirements = {
        canvas: !!window.HTMLCanvasElement,
        webgl: !!window.WebGLRenderingContext,
        audio: !!(window.AudioContext || window.webkitAudioContext),
        deviceOrientation: !!window.DeviceOrientationEvent
      };
      
      const unsupported = Object.entries(requirements)
        .filter(([, supported]) => !supported)
        .map(([feature]) => feature);
        
      if (unsupported.length > 0) {
        console.warn(`以下特性不受支持: ${unsupported.join(", ")}`);
      }
      
      return unsupported.length === 0;
    };

    if (checkCompatibility()) {
      console.log("浏览器兼容性检查通过");
      enableSimulations();
    } else {
      console.warn("某些功能可能不可用，但仍将继续运行基本功能");
      enableSimulations();
    }
  } catch (error) {
    console.error("初始化时发生错误:", error);
  }
};

// 页面加载时初始化伪装功能
window.addEventListener("DOMContentLoaded", initialize);
