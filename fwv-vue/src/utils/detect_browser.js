export default function () {
  var isFirefox = typeof InstallTrigger !== 'undefined';
  var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
  var isIE = /*@cc_on!@*/false || !!document.documentMode;
  var isEdge = !isIE && !!window.StyleMedia;
  var isChrome = !!window.chrome && !!window.chrome.webstore;
  var is_windows = navigator.platform.indexOf('Win32') !== -1
  var is_mac = navigator.platform.indexOf('MacIntel') !== -1
  
  return {
    isFirefox,
    isSafari,
    isIE,
    isEdge,
    isChrome,
    is_windows,
    is_mac
  }
}