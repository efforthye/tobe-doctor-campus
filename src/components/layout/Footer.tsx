import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <MainSection>
          <LogoSection>
            <Logo>
              <img src="/logo.png" alt="THE DOCTOR CAMPUS" />
            </Logo>
            <CompanyInfo>
              <p>
                인증사업자번호: 제2022-인증01호 (주)더닥터캠퍼스는 통신판매중개자이며, 통신판매의 당사자가 아닙니다.
                상품, 상품정보, 거래에 관한 의무와 책임은 판매자에게 있습니다.
              </p>
              <p>
                사업자번호: 123-45-67890 | 대표: 홍길동 | 개인정보책임자: 김영희 | 주소: 서울특별시 영등포구 여의도동 12-3 | 이메일: contact@thedoctorcampus.com
              </p>
            </CompanyInfo>
          </LogoSection>
          <SocialSection>
            <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.8 3.6H7.2C5.2353 3.6 3.6 5.2353 3.6 7.2V16.8C3.6 18.7647 5.2353 20.4 7.2 20.4H16.8C18.7647 20.4 20.4 18.7647 20.4 16.8V7.2C20.4 5.2353 18.7647 3.6 16.8 3.6Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M17.4 8.4C18.0627 8.4 18.6 7.86274 18.6 7.2C18.6 6.53726 18.0627 6 17.4 6C16.7373 6 16.2 6.53726 16.2 7.2C16.2 7.86274 16.7373 8.4 17.4 8.4Z" fill="currentColor"/>
              </svg>
            </SocialLink>
            <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </SocialLink>
            <SocialLink href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.5401 6.42C22.4213 5.94541 22.1794 5.51057 21.8387 5.15941C21.4981 4.80824 21.0708 4.55318 20.6001 4.42C18.8801 4 12.0001 4 12.0001 4C12.0001 4 5.12008 4 3.40008 4.46C2.92933 4.59318 2.50255 4.84824 2.16142 5.19941C1.82029 5.55057 1.57838 5.98541 1.46008 6.46C1.14524 8.20556 0.991368 9.97631 1.00008 11.75C0.988741 13.537 1.14263 15.3213 1.46008 17.08C1.59098 17.5398 1.83833 17.9581 2.17815 18.2945C2.51798 18.6308 2.93882 18.8738 3.40008 19C5.12008 19.46 12.0001 19.46 12.0001 19.46C12.0001 19.46 18.8801 19.46 20.6001 19C21.0708 18.8668 21.4981 18.6118 21.8387 18.2606C22.1794 17.9094 22.4213 17.4746 22.5401 17C22.8524 15.2676 23.0063 13.5103 23.0001 11.75C23.0114 9.96295 22.8574 8.1787 22.5401 6.42Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.75 15.02L15.5 11.75L9.75 8.48001V15.02Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </SocialLink>
            <SocialLink href="https://blog.naver.com" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 8H10C8.89543 8 8 8.89543 8 10V20C8 21.1046 8.89543 22 10 22H20C21.1046 22 22 21.1046 22 20V10C22 8.89543 21.1046 8 20 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 16C2.9 16 2 15.1 2 14V4C2 2.9 2.9 2 4 2H14C15.1 2 16 2.9 16 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </SocialLink>
          </SocialSection>
        </MainSection>

        <BottomSection>
          <Copyright>© {currentYear} THE DOCTOR CAMPUS All Rights Reserved.</Copyright>
          <Links>
            <StyledLink to="/privacy">개인정보처리방침</StyledLink>
            <StyledLink to="/terms">이용약관</StyledLink>
            <StyledLink to="/sitemap">사이트맵</StyledLink>
            <StyledLink to="/partnership">제휴문의 안내</StyledLink>
          </Links>
        </BottomSection>
      </FooterContent>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #F9F9F9;
  width: 100%;
`;

const FooterContent = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 40px 20px 24px;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-bottom: 32px;
  height: 215px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Logo = styled.div`
  img {
    height: 24px;
    width: auto;
    display: block;
  }
`;

const CompanyInfo = styled.div`
  font-size: 12px;
  color: #777;
  line-height: 1.6;
  
  p {
    margin: 0 0 10px 0;
  }
`;

const SocialSection = styled.div`
  display: flex;
  gap: 12px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: #777;
  transition: color 0.2s;
  
  &:hover {
    color: #448181;
  }
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-top: 1px solid rgba(112, 115, 124, 0.08);
  padding-top: 20px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Copyright = styled.p`
  font-size: 12px;
  color: #999;
  margin: 0;
`;

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const StyledLink = styled(Link)`
  font-size: 12px;
  color: #999;
  text-decoration: none;
  
  &:hover {
    color: #448181;
  }
`;

export default Footer;