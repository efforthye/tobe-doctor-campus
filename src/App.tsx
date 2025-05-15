import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import './styles/global.css';

// 클래스 라우트
import ClassIndex from './pages/class/ClassIndex';
import ClassDetail from './pages/class/ClassDetail';
import ClassRoom from './pages/class/ClassRoom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        {/* 홈 */}
        <Route path="/" element={<Home />} />
        
        {/* 인증 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* 클래스 */}
        <Route path="/classes" element={<ClassIndex />} />
        <Route path="/classes/detail/:id" element={<ClassDetail />} />
        <Route path="/classes/classroom/:id" element={<ClassRoom />} />
        <Route path="/classes/:category" element={<NotFound />} />
        
        {/* 커피챗 */}
        <Route path="/coffee-chat" element={<NotFound />} />
        <Route path="/coffee-chat/:category" element={<NotFound />} />
        
        {/* 아카이브 */}
        <Route path="/archive" element={<NotFound />} />
        <Route path="/archive/:category" element={<NotFound />} />
        
        {/* 커뮤니티 */}
        <Route path="/community" element={<NotFound />} />
        <Route path="/community/:category" element={<NotFound />} />
        
        {/* 사용자 */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* 변경 됨. not found 화면 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;