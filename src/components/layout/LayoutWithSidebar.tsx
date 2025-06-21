import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import SideNavigationBar from '../community/SideNavigationBar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
  showSidebar?: boolean; // SNB 표시 여부 옵션 추가
}

const Layout: React.FC<LayoutProps> = ({ children, hideFooter = false, showSidebar = false }) => {
  const { isLoading } = useSelector((state: RootState) => state.ui);

  return (
    <LayoutContainer>
      <Header />
      <MainContent showSidebar={showSidebar}>
        {showSidebar && <SideNavigationBar />}
        <ContentArea showSidebar={showSidebar}>
          {children}
        </ContentArea>
      </MainContent>
      {!hideFooter && <Footer />}
      
      {isLoading && (
        <LoadingOverlay>
          <LoadingSpinner />
        </LoadingOverlay>
      )}
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 320px;
  overflow-x: hidden;
`;

const MainContent = styled.div<{ showSidebar: boolean }>`
  display: flex;
  flex: 1;
  width: 100%;
  position: relative;
  padding-top: 80px; /* 헤더 높이만큼 상단 여백 추가 */
`;

const ContentArea = styled.main<{ showSidebar: boolean }>`
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  max-width: ${({ theme }) => theme.layout.containerWidth};
  margin: 0 auto;
  padding: 0;
  margin-left: ${({ showSidebar }) => showSidebar ? '242px' : '0'};
  min-height: ${({ showSidebar }) => showSidebar ? 'calc(100vh - 80px)' : 'auto'};
  
  @media (max-width: 1024px) {
    margin-left: 0; /* 태블릿에서는 항상 SNB 숨김 */
    padding: 0;
  }
  
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(92, 122, 255, 0.3);
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.colors.primary};
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Layout;