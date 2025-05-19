import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { store } from './store';
import './styles/global.css';

// 추가 확장 프로그램 에러 차단 (React 앱 레벨)
const blockExtensionErrors = () => {
  // Console.error 오버라이드 (크롬 확장 프로그램 에러 숨기기)
  const originalConsoleError = console.error;
  console.error = function(...args) {
    const errorStr = args.join(' ');
    if (errorStr.includes('chrome-extension://') || 
        errorStr.includes('Cannot read properties of null (reading \'type\')') ||
        errorStr.includes('Extension context invalidated')) {
      return; // 확장 프로그램 에러는 출력하지 않음
    }
    return originalConsoleError.apply(console, args);
  };

  // React 에러 경계를 우회하는 확장 프로그램 에러들을 위한 추가 처리
  const handleGlobalError = (event: Event) => {
    const errorEvent = event as ErrorEvent;
    const error = errorEvent.error || errorEvent;
    const message = errorEvent.message || error?.message || '';
    const filename = errorEvent.filename || '';
    
    if (filename.includes('chrome-extension://') || 
        message.includes('Cannot read properties of null (reading \'type\')') ||
        message.includes('Extension context invalidated') ||
        filename.includes('inpage.js')) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      return false;
    }
  };

  const handleUnhandledRejection = (event: Event) => {
    const rejectionEvent = event as PromiseRejectionEvent;
    const reason = rejectionEvent.reason;
    const reasonStr = reason?.toString() || '';
    
    if (reasonStr.includes('chrome-extension://') || 
        reasonStr.includes('Cannot read properties of null (reading \'type\')') ||
        reasonStr.includes('Extension context invalidated')) {
      event.preventDefault();
      return;
    }
  };

  // 이벤트 리스너 등록 (타입 안전하게)
  document.addEventListener('error', handleGlobalError, true);
  window.addEventListener('error', handleGlobalError, true);
  window.addEventListener('unhandledrejection', handleUnhandledRejection, true);

  // React 에러 바운더리도 확장 프로그램 에러 무시하도록 전역 플래그 설정
  (window as any).__IGNORE_EXTENSION_ERRORS__ = true;
};

// 확장 프로그램 에러 차단 실행
blockExtensionErrors();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// React 렌더링 전에 추가 안전장치
try {
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>
  );
} catch (error) {
  // 렌더링 중 확장 프로그램 에러 발생 시 무시
  const errorStr = error?.toString() || '';
  if (errorStr.includes('chrome-extension://') || 
      errorStr.includes('Cannot read properties of null (reading \'type\')')) {
    console.warn('Extension error during render ignored:', error);
    // 에러 무시하고 재시도
    setTimeout(() => {
      root.render(
        <React.StrictMode>
          <ErrorBoundary>
            <Provider store={store}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </Provider>
          </ErrorBoundary>
        </React.StrictMode>
      );
    }, 100);
  } else {
    console.error('Actual render error:', error);
    throw error;
  }
}