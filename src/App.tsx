import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './pages/NotFound';
import './styles/global.css';
import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SignupComplete from './pages/SignupComplete';
import ForgotPassword from './pages/forgot-password';
import ForgotPasswordVerify from './pages/forgot-password/verify';
import ForgotPasswordReset from './pages/forgot-password/reset';
import ForgotPasswordComplete from './pages/forgot-password/complete';
import TermsOfService from './pages/terms/TermsOfService';
import PrivacyPolicy from './pages/terms/PrivacyPolicy';
import MarketingConsent from './pages/terms/MarketingConsent';
import ClassIndex from './pages/class/ClassIndex';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ErrorBoundary>
        <Routes>
          {/* 홈 */}
          <Route path="/" element={
            <ErrorBoundary>
              <Home />
              {/* <Empty /> */}
              {/* <NotFound /> */}
            </ErrorBoundary>
          } />
          
          {/* 인증 */}
          <Route path="/login" element={
            <ErrorBoundary>
              <Login />
              {/* <NotFound /> */}
            </ErrorBoundary>
          } />
          <Route path="/signup" element={
            <ErrorBoundary>
              <Signup />
              {/* <NotFound /> */}
            </ErrorBoundary>
          } />
          <Route path="/signup-complete" element={
            <ErrorBoundary>
              <SignupComplete />
            </ErrorBoundary>
          } />
          <Route path="/forgot-password" element={
            <ErrorBoundary>
              <ForgotPassword />
            </ErrorBoundary>
          } />
          <Route path="/forgot-password/verify" element={
            <ErrorBoundary>
              <ForgotPasswordVerify />
            </ErrorBoundary>
          } />
          <Route path="/forgot-password/reset" element={
            <ErrorBoundary>
              <ForgotPasswordReset />
            </ErrorBoundary>
          } />
          <Route path="/forgot-password/complete" element={
            <ErrorBoundary>
              <ForgotPasswordComplete />
            </ErrorBoundary>
          } />
          
          {/* 약관 */}
          <Route path="/terms-of-service" element={
            <ErrorBoundary>
              <TermsOfService />
            </ErrorBoundary>
          } />
          <Route path="/privacy-policy" element={
            <ErrorBoundary>
              <PrivacyPolicy />
            </ErrorBoundary>
          } />
          <Route path="/marketing-consent" element={
            <ErrorBoundary>
              <MarketingConsent />
            </ErrorBoundary>
          } />
          
          {/* 클래스 */}
          <Route path="/class" element={
            <ErrorBoundary>
              <ClassIndex />
            </ErrorBoundary>
          } />
          <Route path="/classes" element={
            <ErrorBoundary>
              {/* <ClassIndex /> */}
              <NotFound />
            </ErrorBoundary>
          } />
          <Route path="/classes/detail/:id" element={
            <ErrorBoundary>
              {/* <ClassDetail /> */}
              <NotFound />
            </ErrorBoundary>
          } />
          <Route path="/classes/classroom/:id" element={
            <ErrorBoundary>
              {/* <ClassRoom /> */}
              <NotFound />
            </ErrorBoundary>
          } />
          <Route path="/classes/:category" element={
            <ErrorBoundary>
              <NotFound />
            </ErrorBoundary>
          } />
          
          {/* 커피챗 */}
          <Route path="/coffee-chat" element={
            <ErrorBoundary>
              <NotFound />
            </ErrorBoundary>
          } />
          <Route path="/coffee-chat/:category" element={
            <ErrorBoundary>
              <NotFound />
            </ErrorBoundary>
          } />
          
          {/* 아카이브 */}
          <Route path="/archive" element={
            <ErrorBoundary>
              <NotFound />
            </ErrorBoundary>
          } />
          <Route path="/archive/:category" element={
            <ErrorBoundary>
              <NotFound />
            </ErrorBoundary>
          } />
          
          {/* 커뮤니티 */}
          <Route path="/community" element={
            <ErrorBoundary>
              <NotFound />
            </ErrorBoundary>
          } />
          <Route path="/community/:category" element={
            <ErrorBoundary>
              <NotFound />
            </ErrorBoundary>
          } />
          
          {/* 사용자 */}
          <Route path="/dashboard" element={
            <ErrorBoundary>
              {/* <Dashboard /> */}
              <NotFound />
            </ErrorBoundary>
          } />
          <Route path="/profile" element={
            <ErrorBoundary>
              {/* <Profile /> */}
              <NotFound />
            </ErrorBoundary>
          } />
          
          {/* 변경 됨. not found 화면 */}
          <Route path="*" element={
            <ErrorBoundary>
              <NotFound />
            </ErrorBoundary>
          } />
        </Routes>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;