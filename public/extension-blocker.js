// Extension Error Blocker - 확장 프로그램 에러 완전 차단
(function() {
  'use strict';
  
  // 확장 프로그램 감지 패턴들
  const EXTENSION_PATTERNS = [
    'chrome-extension://',
    'moz-extension://',
    'safari-extension://',
    'edge-extension://',
    'Cannot read properties of null (reading \'type\')',
    'Cannot read property \'type\' of null',
    'Cannot read properties of undefined (reading \'type\')',
    'Cannot read property \'type\' of undefined',
    'Extension context invalidated',
    'Invocation of form get(anonymous function)',
    'Non-Error promise rejection captured',
    'inpage.js',
    'content_script'
  ];

  // 에러가 확장 프로그램 관련인지 확인
  function isExtensionError(error, source, message) {
    const contexts = [
      error && error.toString(),
      error && error.message,
      error && error.stack,
      source,
      message
    ].filter(Boolean);

    return EXTENSION_PATTERNS.some(pattern =>
      contexts.some(context => context.includes(pattern))
    );
  }

  // 원본 함수들 저장
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  const originalError = window.Error;

  // Console.error 오버라이드
  console.error = function(...args) {
    const errorString = args.join(' ');
    if (EXTENSION_PATTERNS.some(pattern => errorString.includes(pattern))) {
      return; // 확장 프로그램 에러는 출력하지 않음
    }
    return originalConsoleError.apply(console, args);
  };

  // Console.warn도 마찬가지로 처리
  console.warn = function(...args) {
    const warnString = args.join(' ');
    if (EXTENSION_PATTERNS.some(pattern => warnString.includes(pattern))) {
      return;
    }
    return originalConsoleWarn.apply(console, args);
  };

  // Error 생성자 오버라이드
  window.Error = function(message, fileName, lineNumber) {
    if (isExtensionError(null, fileName, message)) {
      return {}; // 빈 객체 반환으로 에러 무력화
    }
    return new originalError(message, fileName, lineNumber);
  };

  // Error 프로토타입 복사
  window.Error.prototype = originalError.prototype;

  // 이벤트 리스너 강화
  const originalAddEventListener = window.addEventListener;
  window.addEventListener = function(type, listener, options) {
    if (type === 'error') {
      const wrappedListener = function(event) {
        if (isExtensionError(event.error, event.filename, event.message)) {
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();
          return false;
        }
        return listener.call(this, event);
      };
      return originalAddEventListener.call(this, type, wrappedListener, options);
    }
    
    if (type === 'unhandledrejection') {
      const wrappedListener = function(event) {
        if (isExtensionError(event.reason, null, event.reason && event.reason.toString())) {
          event.preventDefault();
          return false;
        }
        return listener.call(this, event);
      };
      return originalAddEventListener.call(this, type, wrappedListener, options);
    }
    
    return originalAddEventListener.call(this, type, listener, options);
  };

  // 전역 에러 핸들러들 설치
  window.onerror = function(message, source, lineno, colno, error) {
    if (isExtensionError(error, source, message)) {
      return true; // 에러 전파 중단
    }
    return false;
  };

  window.onunhandledrejection = function(event) {
    if (isExtensionError(event.reason, null, event.reason && event.reason.toString())) {
      event.preventDefault();
      return;
    }
  };

  // DOM이 준비되면 추가 처리
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAfterDOM);
  } else {
    initializeAfterDOM();
  }

  function initializeAfterDOM() {
    // React Error Boundary 우회를 위한 전역 플래그
    window.__EXTENSION_ERROR_BLOCKER_ACTIVE__ = true;
    
    // 주기적으로 확장 프로그램 에러 체크 및 정리
    setInterval(function() {
      // React DevTools 에러 핸들러 강화
      if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
        const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (hook.onError) {
          const originalOnError = hook.onError;
          hook.onError = function(error) {
            if (isExtensionError(error, null, error && error.message)) {
              return;
            }
            return originalOnError.call(this, error);
          };
        }
      }
    }, 1000);
  }

  console.log('🛡️ Extension Error Blocker activated');
})();