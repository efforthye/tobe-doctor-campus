import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

const PrivacyPolicy: React.FC = () => {
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
          <SloganTitle>개인정보 수집 및 이용 동의</SloganTitle>
        </SloganSection>
        
        <ContentContainer>
          <TermsContent>
            <Section>
              <SectionTitle>1. 개인정보 수집·이용 목적</SectionTitle>
              <SectionContent>
                더미 데이터 입니다. 더미 데이터 입니다. 더미 데이터 입니다. 더미 데이터 입니다. 더미 데이터 입니다.<br/>
                투비닥터 캠퍼스는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.

                가. 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지
                나. 의료교육 서비스 제공, 컨텐츠 송신, 맞춤형 서비스 제공
                다. 민원사무 처리
                라. 마케팅 및 광고에의 활용
                마. 서비스 개선 및 신규 서비스 개발을 위한 통계·분석
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>2. 수집하는 개인정보 항목</SectionTitle>
              <SectionContent>
                가. 필수항목
                - 이메일 주소
                - 비밀번호
                - 이름
                - 휴대전화번호
                - 생년월일
                - 사용자 유형(의대생/의사)

                나. 의대생 추가 정보
                - 소속 대학교
                - 학과
                - 학년
                - 학생증 사진

                다. 의사 추가 정보
                - 의사면허번호
                - 전문과목

                라. 자동 수집 정보
                - IP 주소
                - 쿠키
                - 방문 일시
                - 서비스 이용 기록
                - 불량 이용 기록
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>3. 개인정보의 처리 및 보유기간</SectionTitle>
              <SectionContent>
                ① 투비닥터 캠퍼스는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.

                ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
                - 회원정보: 회원탈퇴시까지 (단, 관련 법령에 의한 정보보유 사유가 발생할 경우 해당 기간 종료시까지)
                - 서비스 이용기록: 3년
                - 불량 이용 기록: 1년
                - 결제정보: 5년
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>4. 개인정보의 제3자 제공</SectionTitle>
              <SectionContent>
                ① 투비닥터 캠퍼스는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.

                ② 투비닥터 캠퍼스는 다음과 같이 개인정보를 제3자에게 제공하고 있습니다.
                - 제공받는 자: 결제대행업체 (결제 시에만)
                - 제공목적: 결제처리
                - 제공항목: 이름, 결제정보
                - 보유기간: 결제완료 후 즉시 삭제
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>5. 개인정보처리의 위탁</SectionTitle>
              <SectionContent>
                ① 투비닥터 캠퍼스는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.

                1. AWS (Amazon Web Services)
                - 위탁업무 내용: 클라우드 서비스 제공
                - 위탁기간: 서비스 이용계약 기간

                2. 문자발송업체
                - 위탁업무 내용: SMS 발송 서비스
                - 위탁기간: 서비스 이용계약 기간

                ② 투비닥터 캠퍼스는 위탁계약 체결시 개인정보가 안전하게 관리될 수 있도록 필요한 사항을 규정하고 있습니다.
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>6. 정보주체의 권리·의무 및 행사방법</SectionTitle>
              <SectionContent>
                ① 정보주체는 투비닥터 캠퍼스에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
                1. 개인정보 처리현황 통지요구
                2. 개인정보 열람요구
                3. 개인정보 정정·삭제요구
                4. 개인정보 처리정지요구

                ② 제1항에 따른 권리 행사는 투비닥터 캠퍼스에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 투비닥터 캠퍼스는 이에 대해 지체없이 조치하겠습니다.
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>7. 개인정보의 안전성 확보조치</SectionTitle>
              <SectionContent>
                투비닥터 캠퍼스는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.

                1. 관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등
                2. 기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치
                3. 물리적 조치: 전산실, 자료보관실 등의 접근통제
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>8. 개인정보 보호책임자</SectionTitle>
              <SectionContent>
                ① 투비닥터 캠퍼스는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.

                ▶ 개인정보 보호책임자
                성명: 홍길동
                직책: 개인정보보호팀장
                연락처: privacy@tobedoctor.kr

                ② 정보주체께서는 투비닥터 캠퍼스의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자에게 문의하실 수 있습니다.
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
  max-width: 1440px;
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
    opacity: 0.8;
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

export default PrivacyPolicy;