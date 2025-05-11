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
            <Description>
              온라인 교육 플랫폼으로 언제 어디서나 배움의 즐거움을 경험하세요.
            </Description>
          </LogoSection>

          <LinksSection>
            <LinkColumn>
              <ColumnTitle>서비스</ColumnTitle>
              <LinkItem>
                <Link to="/courses">강의 찾기</Link>
              </LinkItem>
              <LinkItem>
                <Link to="/instructors">강사 소개</Link>
              </LinkItem>
              <LinkItem>
                <Link to="/pricing">가격 안내</Link>
              </LinkItem>
              <LinkItem>
                <Link to="/enterprises">기업 교육</Link>
              </LinkItem>
            </LinkColumn>

            <LinkColumn>
              <ColumnTitle>회사</ColumnTitle>
              <LinkItem>
                <Link to="/about">소개</Link>
              </LinkItem>
              <LinkItem>
                <Link to="/careers">채용</Link>
              </LinkItem>
              <LinkItem>
                <Link to="/press">언론보도</Link>
              </LinkItem>
              <LinkItem>
                <Link to="/partners">파트너사</Link>
              </LinkItem>
            </LinkColumn>

            <LinkColumn>
              <ColumnTitle>지원</ColumnTitle>
              <LinkItem>
                <Link to="/help">도움말</Link>
              </LinkItem>
              <LinkItem>
                <Link to="/faq">자주 묻는 질문</Link>
              </LinkItem>
              <LinkItem>
                <Link to="/contact">문의하기</Link>
              </LinkItem>
              <LinkItem>
                <Link to="/feedback">의견 제출</Link>
              </LinkItem>
            </LinkColumn>

            <LinkColumn>
              <ColumnTitle>법적 정보</ColumnTitle>
              <LinkItem>
                <Link to="/terms">이용약관</Link>
              </LinkItem>
              <LinkItem>
                <Link to="/privacy">개인정보처리방침</Link>
              </LinkItem>
              <LinkItem>
                <Link to="/cookies">쿠키 정책</Link>
              </LinkItem>
              <LinkItem>
                <Link to="/accessibility">접근성</Link>
              </LinkItem>
            </LinkColumn>
          </LinksSection>
        </FooterTop>

        <Divider />

        <FooterBottom>
          <Copyright>
            © {currentYear} 투비닥터 캠퍼스. All rights reserved.
          </Copyright>
          <SocialLinks>
            <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="facebook">F</i>
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="twitter">T</i>
            </SocialLink>
            <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="instagram">I</i>
            </SocialLink>
            <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="linkedin">L</i>
            </SocialLink>
            <SocialLink href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <i className="youtube">Y</i>
            </SocialLink>
          </SocialLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

const FooterTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const LogoSection = styled.div`
  flex: 1;
  min-width: 250px;
`;

const Logo = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

const LinksSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const LinkColumn = styled.div`
  min-width: 150px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-width: 120px;
    width: calc(50% - ${({ theme }) => theme.spacing.md});
  }
`;

const ColumnTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

const LinkItem = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  a {
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: color ${({ theme }) => theme.transitions.fast};
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
  
  i {
    font-style: normal;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
`;

export default Footer;