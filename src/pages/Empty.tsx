import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';

const Empty: React.FC = () => {
  return (
    <Layout hideFooter={true}>
      <EmptyContainer>
        {/* 의도적으로 비워 둠 */}
      </EmptyContainer>
    </Layout>
  );
};

// 스타일 컴포넌트
const EmptyContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 200px); /* 헤더와 푸터 공간 제외 */
  padding: 36px 0 160px;
  box-sizing: border-box;
`;

export default Empty;