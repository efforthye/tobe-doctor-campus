import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterTop>
          <LogoSection>
            <Logo>투비닥터 캠퍼스</Logo>
            <CompanyInfo>
              <InfoItem>서울특별시 영등포구 여의도동 12-3</InfoItem>
              <InfoItem>사업자등록번호: 123-45-67890</InfoItem>
              <InfoItem>통신판매업: 제2025-서울강남-12345호</InfoItem>
              <InfoItem>대표: 홍길동</InfoItem>
              <InfoItem>개인정보책임자: 김영희</InfoItem>
              <InfoItem>고객센터: 02-123-4567 (평일 10:00 ~ 18:00, 점심시간 12:30 ~ 13:30, 주말/공휴일 휴무)</InfoItem>
              <InfoItem>이메일: help@tobidoctorcampus.com</InfoItem>
            </CompanyInfo>
          </LogoSection>

          <LinksSection>
            <LinkColumn>
              <ColumnTitle>회사소개</ColumnTitle>
              <LinkItem>
                <Link to="/about">소개</Link>
              </LinkItem>
              <LinkItem>
                <Link to="/team">팀</Link>
              </LinkItem>
              <LinkItem>
                <Link to="/career">채용</Link>
              </LinkItem>
            </LinkColumn>

            <LinkColumn>
              <ColumnTitle>이용안내</ColumnTitle>
              <LinkItem>
                <Link to="/faq">FAQ</Link>
              </LinkItem>
              <LinkItem>
                <Link to="/customer-support">고객지원</Link>
              </LinkItem>
              <LinkItem>
                <Link to="/contact">문의하기</Link>
              </LinkItem>
            </LinkColumn>

            <LinkColumn>
              <ColumnTitle>정책</ColumnTitle>
              <LinkItem>
                <Link to="/terms">이용약관</Link>
              </LinkItem>
              <LinkItem>
                <Link to="/privacy">개인정보처리방침</Link>
              </LinkItem>
              <LinkItem>
                <Link to="/refund">환불정책</Link>
              </LinkItem>
            </LinkColumn>
          </LinksSection>
        </FooterTop>

        <Divider />

        <FooterBottom>
          <Copyright>
            © {currentYear} 투비닥터 캠퍼스 모든 권리 보유
          </Copyright>
          <SocialLinks>
            <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.3333 10C18.3333 5.4 14.6 1.66667 10 1.66667C5.4 1.66667 1.66667 5.4 1.66667 10C1.66667 14.1333 4.53333 17.5667 8.33333 18.2333V12.5H6.66667V10H8.33333V8.33333C8.33333 6.33333 9.65 5.16667 11.4667 5.16667C12.3333 5.16667 13.25 5.33333 13.25 5.33333V7H12.25C11.25 7 11 7.58333 11 8.16667V10H13.1667L12.8333 12.5H11V18.2333C14.8 17.5667 17.6667 14.1333 17.6667 10H18.3333Z" fill="currentColor"/>
              </svg>
            </SocialLink>
            <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 1.66667C12.0833 1.66667 12.4167 1.66667 13.25 1.75C14.0833 1.75 14.5833 1.91667 14.9167 2.08333C15.3333 2.25 15.6667 2.5 16 2.83333C16.3333 3.16667 16.5833 3.5 16.75 3.91667C16.9167 4.25 17 4.75 17.0833 5.58333C17.0833 6.41667 17.1667 6.75 17.1667 8.83333C17.1667 10.9167 17.1667 11.25 17.0833 12.0833C17.0833 12.9167 16.9167 13.4167 16.75 13.75C16.5833 14.1667 16.3333 14.5 16 14.8333C15.6667 15.1667 15.3333 15.4167 14.9167 15.5833C14.5833 15.75 14.0833 15.8333 13.25 15.9167C12.4167 15.9167 12.0833 16 10 16C7.91667 16 7.58333 16 6.75 15.9167C5.91667 15.9167 5.41667 15.75 5.08333 15.5833C4.66667 15.4167 4.33333 15.1667 4 14.8333C3.66667 14.5 3.41667 14.1667 3.25 13.75C3.08333 13.4167 3 12.9167 2.91667 12.0833C2.91667 11.25 2.83333 10.9167 2.83333 8.83333C2.83333 6.75 2.83333 6.41667 2.91667 5.58333C2.91667 4.75 3.08333 4.25 3.25 3.91667C3.41667 3.5 3.66667 3.16667 4 2.83333C4.33333 2.5 4.66667 2.25 5.08333 2.08333C5.41667 1.91667 5.91667 1.83333 6.75 1.75C7.58333 1.75 7.91667 1.66667 10 1.66667ZM10 0C7.83333 0 7.5 0 6.66667 0.0833333C5.83333 0.166667 5.16667 0.333333 4.58333 0.583333C4 0.833333 3.5 1.16667 3 1.66667C2.5 2.16667 2.16667 2.66667 1.91667 3.25C1.66667 3.83333 1.5 4.5 1.41667 5.33333C1.33333 6.16667 1.33333 6.5 1.33333 8.66667C1.33333 10.8333 1.33333 11.1667 1.41667 12C1.5 12.8333 1.66667 13.5 1.91667 14.0833C2.16667 14.6667 2.5 15.1667 3 15.6667C3.5 16.1667 4 16.5 4.58333 16.75C5.16667 17 5.83333 17.1667 6.66667 17.25C7.5 17.3333 7.83333 17.3333 10 17.3333C12.1667 17.3333 12.5 17.3333 13.3333 17.25C14.1667 17.1667 14.8333 17 15.4167 16.75C16 16.5 16.5 16.1667 17 15.6667C17.5 15.1667 17.8333 14.6667 18.0833 14.0833C18.3333 13.5 18.5 12.8333 18.5833 12C18.6667 11.1667 18.6667 10.8333 18.6667 8.66667C18.6667 6.5 18.6667 6.16667 18.5833 5.33333C18.5 4.5 18.3333 3.83333 18.0833 3.25C17.8333 2.66667 17.5 2.16667 17 1.66667C16.5 1.16667 16 0.833333 15.4167 0.583333C14.8333 0.333333 14.1667 0.166667 13.3333 0.0833333C12.5 0 12.1667 0 10 0Z" fill="currentColor"/>
                <path d="M10 4.25C7.75 4.25 5.91667 6.08333 5.91667 8.33333C5.91667 10.5833 7.75 12.4167 10 12.4167C12.25 12.4167 14.0833 10.5833 14.0833 8.33333C14.0833 6.08333 12.25 4.25 10 4.25ZM10 10.8333C8.58333 10.8333 7.5 9.75 7.5 8.33333C7.5 6.91667 8.58333 5.83333 10 5.83333C11.4167 5.83333 12.5 6.91667 12.5 8.33333C12.5 9.75 11.4167 10.8333 10 10.8333Z" fill="currentColor"/>
                <path d="M14.25 5.33333C14.8 5.33333 15.25 4.88333 15.25 4.33333C15.25 3.78333 14.8 3.33333 14.25 3.33333C13.7 3.33333 13.25 3.78333 13.25 4.33333C13.25 4.88333 13.7 5.33333 14.25 5.33333Z" fill="currentColor"/>
              </svg>
            </SocialLink>
            <SocialLink href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.9833 5.75833C17.9 5.41667 17.7417 5.125 17.5083 4.89167C17.2667 4.65 16.9667 4.48333 16.6333 4.4C15.3583 4.16667 10 4.16667 10 4.16667C10 4.16667 4.64167 4.16667 3.36667 4.4C3.03333 4.48333 2.73333 4.65 2.49167 4.89167C2.25833 5.125 2.1 5.41667 2.01667 5.75833C1.78333 7.05 1.78333 10 1.78333 10C1.78333 10 1.78333 12.95 2.01667 14.2417C2.1 14.5833 2.25833 14.875 2.49167 15.1083C2.73333 15.35 3.03333 15.5167 3.36667 15.6C4.64167 15.8333 10 15.8333 10 15.8333C10 15.8333 15.3583 15.8333 16.6333 15.6C16.9667 15.5167 17.2667 15.35 17.5083 15.1083C17.7417 14.875 17.9 14.5833 17.9833 14.2417C18.2167 12.95 18.2167 10 18.2167 10C18.2167 10 18.2167 7.05 17.9833 5.75833ZM8.25 12.5V7.5L12.75 10L8.25 12.5Z" fill="currentColor"/>
              </svg>
            </SocialLink>
          </SocialLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #F8F9FA;
  padding: 60px 0 40px;
  width: 100%;
`;

const FooterContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 16px;
  }
`;

const FooterTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 40px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 32px;
  }
`;

const LogoSection = styled.div`
  flex: 1;
  min-width: 250px;
  max-width: 680px;
`;

const Logo = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #448181;
  margin-bottom: 16px;
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InfoItem = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: rgba(55, 56, 60, 0.61);
`;

const LinksSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 60px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 32px;
    width: 100%;
  }
`;

const LinkColumn = styled.div`
  min-width: 120px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: calc(50% - 16px);
  }
`;

const ColumnTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #171719;
`;

const LinkItem = styled.div`
  margin-bottom: 12px;
  
  a {
    font-size: 14px;
    color: rgba(55, 56, 60, 0.61);
    text-decoration: none;
    transition: color 0.2s;
    
    &:hover {
      color: #448181;
    }
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: rgba(112, 115, 124, 0.22);
  margin: 40px 0 24px;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Copyright = styled.p`
  color: rgba(55, 56, 60, 0.61);
  font-size: 14px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(55, 56, 60, 0.61);
  transition: color 0.2s;
  
  &:hover {
    color: #448181;
  }
`;

export default Footer;