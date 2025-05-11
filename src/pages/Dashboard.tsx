import React, { useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import { useAppDispatch } from '../hooks/useAppDispatch';

const DashboardContainer = styled.div`
  padding: 20px;
`;

const DashboardTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const DashboardContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const DashboardCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  // const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // 대시보드 데이터 로드 로직 추가 예정
  }, [dispatch]);

  return (
    <Layout>
      <DashboardContainer>
        <DashboardTitle>대시보드</DashboardTitle>
        <DashboardContent>
          <DashboardCard>
            <h3>수강 중인 강의</h3>
            <p>현재 수강 중인 강의가 없습니다.</p>
          </DashboardCard>
          <DashboardCard>
            <h3>최근 활동</h3>
            <p>최근 활동 내역이 없습니다.</p>
          </DashboardCard>
          <DashboardCard>
            <h3>다가오는 일정</h3>
            <p>예정된 일정이 없습니다.</p>
          </DashboardCard>
        </DashboardContent>
      </DashboardContainer>
    </Layout>
  );
};

export default Dashboard;
