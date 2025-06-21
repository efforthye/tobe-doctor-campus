import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import SideNavigationBar from './SideNavigationBar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface CommunityLayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

const CommunityLayout: React.FC<CommunityLayoutProps> = ({ children, hideFooter = false }) => {
  const { isLoading } = useSelector((state: RootState) => state.ui);

  return (
    <LayoutContainer>
      <Header />
      <MainContent>
        <SideNavigationBar />
        <ContentArea>
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

const MainContent = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  max-width: 1200px; 
  margin: 0 auto; 
  position: relative;
  padding-top: 80px; 
  padding-bottom: 128px; 
  padding-left: 306px; /* SNB(242px) + gap(64px) */
  gap: 0; /* gap 제거 - padding으로 처리 */
  align-items: flex-start;
  min-height: calc(100vh - 80px);
  
  @media (max-width: 1024px) {
    padding-left: 0;
    padding-bottom: 64px;
  }
  
  @media (max-width: 768px) {
    padding-bottom: 48px;
  }
`;

const ContentArea = styled.main`
  flex: 1;
  margin-left: 0; /* 여백 제거 - SNB가 fixed이므로 */
  min-height: calc(100vh - 80px);
  background: white;
  
  @media (max-width: 1024px) {
    margin-left: 0;
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
  border-top-color: #5c7aff;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default CommunityLayout;