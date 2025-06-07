import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

const MarketingConsent: React.FC = () => {
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
          <SloganTitle>마케팅 이용 · 수신 동의</SloganTitle>
        </SloganSection>
        
        <ContentContainer>
          <TermsContent>
            <Section>
              <SectionTitle>1. 마케팅 활용 목적</SectionTitle>
              <SectionContent>
                더미 데이터 입니다. 더미 데이터 입니다. 더미 데이터 입니다. 더미 데이터 입니다. 더미 데이터 입니다.<br/>
                투비닥터 캠퍼스는 아래의 목적으로 개인정보를 수집·이용하고자 합니다. 동의를 거부할 권리가 있으며, 동의 거부 시에도 서비스 이용에는 제한이 없습니다. 다만, 아래 목적으로는 서비스를 제공할 수 없습니다.

                가. 새로운 서비스(신상품) 개발 및 맞춤 서비스 제공
                나. 이벤트 및 광고성 정보 제공 및 참여기회 제공
                다. 인구통계학적 특성에 따른 서비스 제공 및 광고 게재
                라. 서비스의 유효성 확인
                마. 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>2. 수집하는 개인정보 항목</SectionTitle>
              <SectionContent>
                가. 수집항목
                - 이메일 주소
                - 휴대전화번호
                - 이름
                - 생년월일
                - 사용자 유형(의대생/의사)
                - 관심 분야
                - 서비스 이용기록
                - 접속 로그
                - 쿠키
                - 접속 IP 정보

                나. 수집방법
                - 홈페이지, 서면양식, 팩스, 전화, 상담게시판, 이메일
                - 협력회사로부터의 제공
                - 생성정보 수집 툴을 통한 수집
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>3. 개인정보의 보유 및 이용기간</SectionTitle>
              <SectionContent>
                수집된 개인정보의 보유 및 이용기간은 다음과 같습니다.

                ① 마케팅 활용 동의일로부터 회원 탈퇴 시 또는 마케팅 활용 동의 철회 시까지 보유 및 이용됩니다.
                ② 다만, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.

                가. 관련 법령에 의한 정보보유 사유
                - 소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래 등에서의 소비자보호에 관한 법률)
                - 신용정보의 수집/처리 및 이용 등에 관한 기록: 3년 (신용정보의 이용 및 보호에 관한 법률)
                - 본인 확인에 관한 기록: 6개월 (정보통신망 이용촉진 및 정보보호 등에 관한 법률)
                - 방문에 관한 기록: 3개월 (통신비밀보호법)
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>4. 개인정보 제공 및 공유</SectionTitle>
              <SectionContent>
                투비닥터 캠퍼스는 이용자들의 개인정보를 「개인정보의 수집 및 이용목적」에서 고지한 범위 내에서 사용하며, 이용자의 사전 동의 없이는 동 범위를 초과하여 이용하거나 원칙적으로 이용자의 개인정보를 외부에 공개하지 않습니다.

                다만, 아래의 경우에는 예외로 합니다.
                - 이용자들이 사전에 동의한 경우
                - 법령의 규정에 의거하거나, 수사 목적으로 법집행기관이 요구하는 경우
                - 통계작성, 학술연구 또는 시장조사를 위하여 필요한 경우로서 특정 개인을 알아볼 수 없는 형태로 제공하는 경우
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>5. 마케팅 정보 수신 방법</SectionTitle>
              <SectionContent>
                투비닥터 캠퍼스는 다음과 같은 방법으로 마케팅 정보를 제공합니다.

                가. 이메일을 통한 정보 제공
                - 새로운 강의 안내
                - 할인 이벤트 정보
                - 맞춤형 추천 컨텐츠
                - 서비스 업데이트 소식

                나. SMS/MMS를 통한 정보 제공
                - 중요한 이벤트 알림
                - 긴급 공지사항
                - 맞춤형 혜택 정보

                다. 앱 푸시 알림을 통한 정보 제공
                - 실시간 이벤트 알림
                - 개인화된 학습 추천
                - 커뮤니티 활동 알림
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>6. 동의 철회 방법</SectionTitle>
              <SectionContent>
                이용자는 마케팅 정보 수신에 대한 동의를 언제든지 철회할 수 있습니다.

                가. 온라인 철회
                - 홈페이지 로그인 후 회원정보 수정 페이지에서 철회
                - 수신한 이메일 하단의 '수신거부' 링크 클릭

                나. 고객센터를 통한 철회
                - 이메일: support@tobedoctor.kr
                - 전화: 1588-0000 (평일 09:00~18:00)

                다. 철회 처리
                - 동의 철회 요청 시 즉시 처리됩니다.
                - 철회 후에는 마케팅 목적의 개인정보 이용이 중단됩니다.
                - 다만, 이미 진행된 마케팅 활동에 대해서는 철회가 제한될 수 있습니다.
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>7. 기타</SectionTitle>
              <SectionContent>
                본 동의서는 투비닥터 캠퍼스의 개인정보처리방침과 함께 적용됩니다. 마케팅 활용에 대한 동의와 관련하여 궁금한 사항이 있으시면 고객센터로 문의하시기 바랍니다.

                동의일자: 동의 버튼 클릭 시점
                동의방법: 홈페이지 회원가입 시 체크박스 선택
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

export default MarketingConsent;