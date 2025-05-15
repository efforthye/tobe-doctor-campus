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

// 새로운 페이지 구조
// 클래스 라우트
import ClassIndex from './pages/class/ClassIndex';
import ClassCategory from './pages/class/ClassCategory';
import ClassDetail from './pages/class/ClassDetail';
import ClassRoom from './pages/class/ClassRoom';

// 아카이브 라우트
import ArchiveIndex from './pages/archive/ArchiveIndex';
import ArchiveCategory from './pages/archive/ArchiveCategory';
import ArchiveDetail from './pages/archive/ArchiveDetail';

// 커넥트 라우트
import ConnectIndex from './pages/connect/ConnectIndex';
import ConnectEvents from './pages/connect/ConnectEvents';
import ConnectMentoring from './pages/connect/ConnectMentoring';
import ConnectCommunity from './pages/connect/ConnectCommunity';
import ConnectDetail from './pages/connect/ConnectDetail';

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
        <Route path="/classes/:category" element={<ClassCategory />} />
        <Route path="/classes/detail/:id" element={<ClassDetail />} />
        <Route path="/classes/classroom/:id" element={<ClassRoom />} />
        
        {/* 아카이브 */}
        <Route path="/archive" element={<ArchiveIndex />} />
        <Route path="/archive/:category" element={<ArchiveCategory />} />
        <Route path="/archive/detail/:id" element={<ArchiveDetail />} />
        
        {/* 커넥트 */}
        <Route path="/connect" element={<ConnectIndex />} />
        <Route path="/connect/events" element={<ConnectEvents />} />
        <Route path="/connect/mentoring" element={<ConnectMentoring />} />
        <Route path="/connect/community" element={<ConnectCommunity />} />
        <Route path="/connect/detail/:id" element={<ConnectDetail />} />
        
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