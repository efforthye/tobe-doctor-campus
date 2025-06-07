import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // 확장 프로그램 관련 에러들을 더 포괄적으로 감지
    const errorMessage = error?.message || error?.toString() || '';
    const errorStack = error?.stack || '';
    
    const isExtensionError = 
      errorMessage.includes('chrome-extension://') ||
      errorMessage.includes('moz-extension://') ||
      errorMessage.includes('safari-extension://') ||
      errorMessage.includes('edge-extension://') ||
      errorMessage.includes('Cannot read properties of null (reading \'type\')') ||
      errorMessage.includes('Cannot read property \'type\' of null') ||
      errorMessage.includes('Cannot read properties of undefined (reading \'type\')') ||
      errorMessage.includes('Cannot read property \'type\' of undefined') ||
      errorMessage.includes('Extension context invalidated') ||
      errorMessage.includes('Invocation of form get(anonymous function)') ||
      errorStack.includes('chrome-extension://') ||
      errorStack.includes('moz-extension://') ||
      errorStack.includes('safari-extension://') ||
      errorStack.includes('edge-extension://') ||
      errorStack.includes('inpage.js') ||
      // 전역 플래그 확인
      (window as any).__IGNORE_EXTENSION_ERRORS__;
    
    // 본인확인 관련 에러 감지 및 무시
    const isMobileAuthError = 
      errorMessage.includes('postMessage') ||
      errorMessage.includes('DataCloneError') ||
      errorMessage.includes('client_process') ||
      errorMessage.includes('mobile-auth') ||
      errorMessage.includes('could not be cloned') ||
      errorMessage.includes('MOBILEOK') ||
      errorStack.includes('client_process') ||
      errorStack.includes('mobile-auth') ||
      (window as any).__SUPPRESS_MOBILE_AUTH_ERRORS__;
    
    if (isExtensionError) {
      console.warn('🔇 Extension error caught and ignored in ErrorBoundary:', error);
      return { hasError: false }; // 에러 상태로 변경하지 않음
    }
    
    if (isMobileAuthError) {
      console.warn('🔇 Mobile auth error caught and ignored in ErrorBoundary:', error);
      return { hasError: false }; // 에러 상태로 변경하지 않음
    }
    
    console.error('Real application error caught:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 확장 프로그램 에러는 무시
    const errorMessage = error?.message || error?.toString() || '';
    const errorStack = error?.stack || '';
    
    const isExtensionError = 
      errorMessage.includes('chrome-extension://') ||
      errorMessage.includes('Cannot read properties of null (reading \'type\')') ||
      errorMessage.includes('Extension context invalidated') ||
      errorStack.includes('chrome-extension://') ||
      errorStack.includes('inpage.js');
    
    // 본인확인 관련 에러도 무시
    const isMobileAuthError = 
      errorMessage.includes('postMessage') ||
      errorMessage.includes('DataCloneError') ||
      errorMessage.includes('client_process') ||
      errorMessage.includes('mobile-auth') ||
      errorMessage.includes('could not be cloned') ||
      errorStack.includes('client_process');
    
    if (isExtensionError) {
      console.warn('🔇 Extension error caught and ignored in componentDidCatch:', error, errorInfo);
      // 상태를 리셋하여 컴포넌트가 정상 작동하도록 함
      this.setState({ hasError: false, error: undefined });
      return;
    }
    
    if (isMobileAuthError) {
      console.warn('🔇 Mobile auth error caught and ignored in componentDidCatch:', error, errorInfo);
      // 상태를 리셋하여 컴포넌트가 정상 작동하도록 함
      this.setState({ hasError: false, error: undefined });
      return;
    }
    
    console.error('Real ErrorBoundary caught an error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback;
      if (FallbackComponent) {
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }
      
      return (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          margin: '20px'
        }}>
          <h2>앗! 문제가 발생했습니다.</h2>
          <p>페이지를 새로고침하거나 잠시 후 다시 시도해주세요.</p>
          <button 
            onClick={this.resetError}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            다시 시도
          </button>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ marginTop: '10px', textAlign: 'left' }}>
              <summary>에러 상세 정보 (개발용)</summary>
              <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;