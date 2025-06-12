import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

const TermsOfService: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 페이지 로드 시 맨 위로 스크롤
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = () => {
    if (location.state?.returnTo) {
      navigate(location.state.returnTo, { 
        state: { formData: location.state.formData }
      });
    } else {
      navigate(-1);
    }
  };

  return (
    <Layout>
      <MainContainer>
        <BackButton onClick={handleBackClick}>
          ← 돌아가기
        </BackButton>
        <SloganSection>
          <SloganTitle>투비닥터 캠퍼스 이용약관</SloganTitle>
        </SloganSection>
        
        <ContentContainer>
          <TermsContent>
            <Section>
              <SectionTitle>제1조 (목적)</SectionTitle>
              <SectionContent>
                더미 데이터 입니다. 더미 데이터 입니다. 더미 데이터 입니다. 더미 데이터 입니다. 더미 데이터 입니다.<br/>
                본 약관은 투비닥터 캠퍼스(이하 "회사")가 제공하는 의료교육 플랫폼 서비스(이하 "서비스")의 이용조건 및 절차, 
                회사와 이용자의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>제2조 (정의)</SectionTitle>
              <SectionContent>
                ① "서비스"라 함은 회사가 제공하는 의료교육 플랫폼 및 이와 관련된 제반 서비스를 의미합니다.<br />
                ② "이용자"라 함은 본 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.<br />
                ③ "회원"이라 함은 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며, 회사가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>제3조 (약관의 게시와 개정)</SectionTitle>
              <SectionContent>
                ① 회사는 본 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.<br />
                ② 회사는 약관의 규제에 관한 법률, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관련법을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>제4조 (서비스의 제공 및 변경)</SectionTitle>
              <SectionContent>
                ① 회사는 다음과 같은 업무를 수행합니다.<br />
                1. 의료교육 컨텐츠 제공<br />
                2. 온라인 강의 서비스<br />
                3. 학습 진도 관리 및 평가<br />
                4. 기타 회사가 정하는 업무<br />
                ② 회사는 운영상, 기술상의 필요에 따라 제공하고 있는 전부 또는 일부 서비스를 변경할 수 있습니다.
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>제5조 (서비스의 중단)</SectionTitle>
              <SectionContent>
                ① 회사는 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.<br />
                ② 회사는 제1항의 사유로 서비스의 제공이 일시적으로 중단되는 것에 대하여 이용자 또는 제3자가 입은 손해에 대해서는 배상하지 않습니다.
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>제6조 (회원가입)</SectionTitle>
              <SectionContent>
                ① 이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 본 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.<br />
                ② 회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.<br />
                1. 가입신청자가 본 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우<br />
                2. 등록 내용에 허위, 기재누락, 오기가 있는 경우<br />
                3. 기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고 판단되는 경우
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>제7조 (개인정보 보호)</SectionTitle>
              <SectionContent>
                회사는 관련법이 정하는 바에 따라서 이용자 등록정보를 포함한 이용자의 개인정보를 보호하기 위하여 노력합니다. 
                이용자의 개인정보보호에 관해서는 관련법 및 회사의 개인정보처리방침에 정한 바에 의합니다.
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>제8조 (이용자의 의무)</SectionTitle>
              <SectionContent>
                ① 이용자는 다음 행위를 하여서는 안 됩니다.<br />
                1. 신청 또는 변경시 허위내용의 등록<br />
                2. 타인의 정보 도용<br />
                3. 회사가 게시한 정보의 변경<br />
                4. 회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시<br />
                5. 회사 기타 제3자의 저작권 등 지적재산권에 대한 침해<br />
                6. 회사 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위<br />
                7. 외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 회사에 공개 또는 게시하는 행위
              </SectionContent>
            </Section>
          </TermsContent>
        </ContentContainer>
      </MainContainer>
    </Layout>
  );
};

// 스타일 컴포넌트들
const MainContainer = styled.main`
  max-width: 1360px;
  margin: 0 auto;
  padding: 64px 80px;
  min-height: 100vh;
  
  @media (max-width: 1024px) {
    padding: 64px 40px;
  }
  
  @media (max-width: 768px) {
    padding: 64px 20px;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #448181;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 0;
  margin-bottom: 24px;
  
  &:hover {
    /* opacity: 0.8; */
  }
`;

const SloganSection = styled.div`
  margin-bottom: 48px;
`;

const SloganTitle = styled.h1`
  font-family: 'Pretendard JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -1.13px;
  color: #171719;
  margin: 0;
  text-align: left;
`;

const ContentContainer = styled.div`
  width: 100%;
`;

const TermsContent = styled.div`
  background: transparent;
`;

const Section = styled.div`
  margin-bottom: 32px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Pretendard JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  color: #171719;
  margin: 0 0 12px 0;
`;

const SectionContent = styled.p`
  font-family: 'Pretendard JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  color: rgba(23, 23, 25, 0.88);
  margin: 0;
  white-space: pre-line;
`;

export default TermsOfService;