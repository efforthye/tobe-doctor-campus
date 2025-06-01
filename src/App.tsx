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
          
          {/* 클래스 */}
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