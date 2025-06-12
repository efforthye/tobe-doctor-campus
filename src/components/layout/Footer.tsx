import React from 'react';
import styled from 'styled-components';

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <MainSection>
          <FooterSection>
            <FooterTop>
              <LogoContainer>
                <Logo>
                  <img 
                    src={`${process.env.PUBLIC_URL}/logo.svg`}
                    alt="TOBE DOCTOR CAMPUS" 
                    onError={(e) => {
                      console.error('Logo failed to load');
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const logoDiv = target.parentElement;
                      if (logoDiv) {
                        logoDiv.innerHTML = '<div style="color: #448181; font-weight: 600; font-size: 16px; white-space: nowrap;">TOBE DOCTOR CAMPUS</div>';
                      }
                    }}
                  />
                </Logo>
              </LogoContainer>
              <FooterLinks>
                <FooterLinkText>공지사항</FooterLinkText>
                <FooterLinkText>이용약관</FooterLinkText>
                <FooterLinkText>개인정보 처리방침</FooterLinkText>
              </FooterLinks>
            </FooterTop>
            <FooterText>
              <FooterDescription>
                투비닥터 캠퍼스는 대한민국의학한림원과 정보통신산업진흥원의 지원을 받아 구축된 의료 교육 플랫폼입니다. (한림원 / NIPA 문구)
              </FooterDescription>
              <FooterDescription>
                Wanted Design System CC BY 4.0 (디자인 시스템 저작자표시 문구)
              </FooterDescription>
            </FooterText>
          </FooterSection>
          <FooterDivider />
          <FooterSection>
            <FooterTobedoctor>
              <FooterBrand>투비닥터</FooterBrand>
              <FooterSocial>
                {/* 뉴스/블로그 아이콘 - 5.svg */}
                <FooterSocialIcon href="https://tobedoctor.net" target="_blank" rel="noopener noreferrer">
                  <img src="/images/5.svg" alt="News" width="24" height="24" />
                </FooterSocialIcon>
                {/* 카카오 아이콘 - 4.svg */}
                <FooterSocialIcon href="https://pf.kakao.com" target="_blank" rel="noopener noreferrer">
                  <img src="/images/4.svg" alt="Kakao" width="24" height="24" />
                </FooterSocialIcon>
                {/* 유튜브 아이콘 - 3.svg */}
                <FooterSocialIcon href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <img src="/images/3.svg" alt="YouTube" width="24" height="24" />
                </FooterSocialIcon>
                {/* 인스타그램 아이콘 - 2.svg */}
                <FooterSocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <img src="/images/2.svg" alt="Instagram" width="24" height="24" />
                </FooterSocialIcon>
                {/* 투비닥터 아이콘 - 1.svg */}
                <FooterSocialIcon href="https://tobedoctor.com" target="_blank" rel="noopener noreferrer">
                  <img src="/images/1.svg" alt="투비닥터" width="24" height="24" />
                </FooterSocialIcon>
              </FooterSocial>
            </FooterTobedoctor>
            <FooterInfo>
              <FooterDetails>
                <FooterDetailRow>
                  <FooterDetailText>대표 : 김경훈</FooterDetailText>
                  <FooterDetailDivider>
                    <FooterDetailDividerLine>
                      <FooterDetailDividerInner />
                    </FooterDetailDividerLine>
                  </FooterDetailDivider>
                  <FooterDetailText>고유번호 : 117-82-81966</FooterDetailText>
                </FooterDetailRow>
                <FooterDetailRow>
                  <FooterDetailText>주소 : 서울특별시 강동구 천호대로161길 7, 2동 706호</FooterDetailText>
                  <FooterDetailDivider>
                    <FooterDetailDividerLine>
                      <FooterDetailDividerInner />
                    </FooterDetailDividerLine>
                  </FooterDetailDivider>
                  <FooterDetailText>전화번호 : 010-9533-3731</FooterDetailText>
                  <FooterDetailDivider>
                    <FooterDetailDividerLine>
                      <FooterDetailDividerInner />
                    </FooterDetailDividerLine>
                  </FooterDetailDivider>
                  <FooterDetailText>제휴·문의 : tobedoc2020@gmail.com</FooterDetailText>
                </FooterDetailRow>
              </FooterDetails>
            </FooterInfo>
          </FooterSection>
        </MainSection>
        <FooterBottom>
          <FooterCopyright>
            <FooterCopyrightText>© 2025 TO BE DOCTOR All Rights Reserved</FooterCopyrightText>
          </FooterCopyright>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: white;
  width: 100%;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  border-top: 1px solid rgba(112, 115, 124, 0.08);
`;

const FooterContent = styled.div`
  width: 100%;
  max-width: 1360px;
  padding-top: 40px;
  padding-bottom: 24px;
  padding-left: 80px;
  padding-right: 80px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 32px;
  display: flex;
  
  @media (max-width: 1024px) {
    padding-left: 40px;
    padding-right: 40px;
  }
  
  @media (max-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const MainSection = styled.div`
  align-self: stretch;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 32px;
  display: flex;
`;

const FooterSection = styled.div`
  align-self: stretch;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  display: flex;
`;

const FooterTop = styled.div`
  align-self: stretch;
  justify-content: space-between;
  align-items: center;
  display: inline-flex;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const LogoContainer = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  display: inline-flex;
`;

const Logo = styled.div`
  height: 32px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  
  img {
    height: 28px;
    width: auto;
    display: block;
  }
  
  /* 로고가 안 보이는 경우를 대비한 스타일 */
  min-height: 28px;
  min-width: 134px;
`;

const FooterLinks = styled.div`
  justify-content: flex-start;
  align-items: flex-start;
  gap: 32px;
  display: flex;
  
  @media (max-width: 768px) {
    gap: 16px;
    flex-wrap: wrap;
  }
`;

const FooterLinkText = styled.span`
  color: rgba(55, 56, 60, 0.61);
  font-size: 13px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.25px;
  word-wrap: break-word;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: #448181;
  }
`;

const FooterText = styled.div`
  align-self: stretch;
  overflow: hidden;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  display: flex;
`;

const FooterDescription = styled.div`
  color: rgba(55, 56, 60, 0.61);
  font-size: 13px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.25px;
  word-wrap: break-word;
`;

const FooterDivider = styled.div`
  align-self: stretch;
  height: 1px;
  background: rgba(112, 115, 124, 0.08);
`;

const FooterTobedoctor = styled.div`
  align-self: stretch;
  justify-content: space-between;
  align-items: center;
  display: inline-flex;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const FooterBrand = styled.div`
  color: rgba(55, 56, 60, 0.61);
  font-size: 18px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 600;
  line-height: 26.01px;
  word-wrap: break-word;
`;

const FooterSocial = styled.div`
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
  display: flex;
`;

const FooterSocialIcon = styled.a`
  height: 24px;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  
  img {
    width: 24px;
    height: 24px;
  }
  
  /* 호버 시 배경 효과 */
  &:after {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 1000px;
    background-color: #171719;
    opacity: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    transition: opacity 0.2s ease;
  }
  
  &:hover:after {
    opacity: 0.04;
  }
`;

const FooterInfo = styled.div`
  align-self: stretch;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 28px;
  display: flex;
`;

const FooterDetails = styled.div`
  align-self: stretch;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  display: flex;
`;

const FooterDetailRow = styled.div`
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  display: inline-flex;
  flex-wrap: wrap;
  align-content: flex-start;
`;

const FooterDetailText = styled.div`
  color: rgba(55, 56, 60, 0.61);
  font-size: 13px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.25px;
  word-wrap: break-word;
`;

const FooterDetailDivider = styled.div`
  width: 1px;
  height: 18px;
  position: relative;
`;

const FooterDetailDividerLine = styled.div`
  width: 1px;
  height: 10.80px;
  left: 0px;
  top: 3.60px;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: inline-flex;
`;

const FooterDetailDividerInner = styled.div`
  width: 1px;
  flex: 1 1 0;
  background: rgba(112, 115, 124, 0.22);
`;

const FooterBottom = styled.div`
  align-self: stretch;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  display: flex;
`;

const FooterCopyright = styled.div`
  align-self: stretch;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  display: inline-flex;
`;

const FooterCopyrightText = styled.div`
  color: rgba(55, 56, 60, 0.61);
  font-size: 13px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.25px;
  word-wrap: break-word;
`;

export default Footer;