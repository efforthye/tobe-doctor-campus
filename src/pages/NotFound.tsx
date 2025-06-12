import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <NotFoundContainer>
        <Container>
          <TextWrapper>
            <NotFoundTitle>페이지를 찾을 수 없습니다.</NotFoundTitle>
            <NotFoundDescription>
              방문하시려는 페이지가 존재하지 않거나,<br />
              주소가 변경되어 사용하실 수 없습니다.<br />
              입력하신 주소가 정확한지 다시 한 번 확인해 주세요.
            </NotFoundDescription>
          </TextWrapper>
          <ActionWrapper>
            <ActionButton onClick={() => navigate('/')}>
              <ButtonContent>
                <ButtonText>홈으로 이동</ButtonText>
              </ButtonContent>
            </ActionButton>
          </ActionWrapper>
        </Container>
      </NotFoundContainer>
    </Layout>
  );
};

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  width: 100%;
  min-height: 600px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 128px 20px 160px;
  gap: 64px;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentWidth};
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 64px;
  width: 100%;
  max-width: 1060px;
`;

const NotFoundTitle = styled.h1`
  width: 100%;
  max-width: 404px;
  height: 52px;
  font-family: 'Pretendard JP';
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 130%;
  letter-spacing: -0.0282em;
  color: #171719;
  margin: 0;
`;

const NotFoundDescription = styled.p`
  width: 100%;
  max-width: 397px;
  font-family: 'Pretendard JP';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 140%;
  text-align: center;
  letter-spacing: -0.012em;
  font-feature-settings: 'ss10' on;
  color: rgba(55, 56, 60, 0.61);
  margin: 0;
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
  width: 130px;
  height: 48px;
`;

const ActionButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px 28px;
  isolation: isolate;
  width: 130px;
  height: 48px;
  background: #448181;
  border-radius: 12px;
  border: none;
  cursor: pointer;
`;

const ButtonContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 6px;
  width: 74px;
  height: 24px;
`;

const ButtonText = styled.span`
  width: 74px;
  height: 24px;
  font-family: 'Pretendard JP';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.0057em;
  font-feature-settings: 'ss10' on;
  color: #FFFFFF;
`;

export default NotFound;