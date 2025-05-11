import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';

const ProfileContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const ProfileImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #e0e0e0;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  color: #666;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h2`
  margin: 0 0 5px 0;
  font-size: 24px;
`;

const ProfileEmail = styled.p`
  margin: 0;
  color: #666;
`;

const ProfileSection = styled.div`
  margin-bottom: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const SectionTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 18px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);

  const getInitials = (name: string) => {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase();
  };

  return (
    <Layout>
      <ProfileContainer>
        <ProfileHeader>
          <ProfileImage>
            {user?.name ? getInitials(user.name) : '?'}
          </ProfileImage>
          <ProfileInfo>
            <ProfileName>{user?.name || '사용자'}</ProfileName>
            <ProfileEmail>{user?.email || 'email@example.com'}</ProfileEmail>
          </ProfileInfo>
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? '취소' : '프로필 수정'}
          </Button>
        </ProfileHeader>

        <ProfileSection>
          <SectionTitle>개인 정보</SectionTitle>
          {isEditing ? (
            <div>프로필 수정 폼 구현 예정</div>
          ) : (
            <div>
              <p><strong>이름:</strong> {user?.name || '이름 없음'}</p>
              <p><strong>이메일:</strong> {user?.email || 'email@example.com'}</p>
              <p><strong>가입일:</strong> {'정보 없음'}</p>
            </div>
          )}
        </ProfileSection>

        <ProfileSection>
          <SectionTitle>학습 통계</SectionTitle>
          <p>학습 통계 데이터가 없습니다.</p>
        </ProfileSection>

        <ProfileSection>
          <SectionTitle>수강 이력</SectionTitle>
          <p>수강 이력이 없습니다.</p>
        </ProfileSection>
      </ProfileContainer>
    </Layout>
  );
};

export default Profile;
