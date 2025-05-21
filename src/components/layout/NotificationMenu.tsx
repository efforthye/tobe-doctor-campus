import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface NotificationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const notifications = [
  {
    id: 1,
    title: '알림 메시지 테스트 1',
    date: '2분 전',
    read: false,
    link: '/notification/1'
  },
  {
    id: 2,
    title: '알림 메시지 테스트 2 - 조금 더 긴 메시지로 어떻게 보이는지 확인',
    date: '3시간 전',
    read: false,
    link: '/notification/2'
  },
  {
    id: 3,
    title: '알림 메시지 테스트 3',
    date: '어제',
    read: true,
    link: '/notification/3'
  },
  {
    id: 4,
    title: '알림 메시지 테스트 4',
    date: '3일 전',
    read: true,
    link: '/notification/4'
  },
  {
    id: 5,
    title: '알림 메시지 테스트 5',
    date: '1주일 전',
    read: true,
    link: '/notification/5'
  }
];

const NotificationMenu = forwardRef<HTMLDivElement, NotificationMenuProps>(
  ({ isOpen, onClose }, ref) => {
    if (!isOpen) return null;

    return (
      <Container ref={ref}>
        <Header>
          <Title>알림</Title>
        </Header>
        
        <NotificationList>
          {notifications.map((notification) => (
            <NotificationItem key={notification.id} read={notification.read}>
              <StyledLink to={notification.link}>
                <NotificationContent>
                  <NotificationTitle>{notification.title}</NotificationTitle>
                  <NotificationDate>{notification.date}</NotificationDate>
                </NotificationContent>
              </StyledLink>
            </NotificationItem>
          ))}
        </NotificationList>
        
        <Footer>
          <AllNotificationsLink to="/notifications">모든 알림 보기</AllNotificationsLink>
        </Footer>
      </Container>
    );
  }
);

const Container = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 304px;
  background: var(--Background-Elevated-Normal, white);
  border-radius: 18px;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.03);
  z-index: 10;
  margin-top: 4px;
  outline: 1px rgba(112, 115, 124, 0.08) solid;
  outline-offset: -1px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  /* 드롭다운과 네비게이션 아이템 사이의 공간 메움 */
  &:before {
    content: '';
    position: absolute;
    top: -4px;
    left: 0;
    width: 100%;
    height: 4px;
  }
`;

const Header = styled.div`
  padding: 19px 32px 10px;
  border-bottom: 1px solid rgba(112, 115, 124, 0.08);
`;

const Title = styled.h3`
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  font-family: 'Pretendard JP', sans-serif;
  color: var(--Label-Normal, #171719);
`;

const NotificationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 400px;
  overflow-y: auto;
`;

const NotificationItem = styled.li<{ read: boolean }>`
  padding: 0;
  border-bottom: 1px solid rgba(112, 115, 124, 0.08);
  background-color: ${(props) => props.read ? 'transparent' : 'rgba(41, 103, 104, 0.05)'};
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(112, 115, 124, 0.05);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 16px 32px;
  text-decoration: none;
  color: inherit;
`;

const NotificationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const NotificationTitle = styled.p`
  margin: 0;
  font-size: 15px;
  font-weight: 500;
  color: var(--Label-Normal, #171719);
  line-height: 1.4;
`;

const NotificationDate = styled.span`
  font-size: 13px;
  color: var(--Label-Assistive, rgba(55, 56, 60, 0.28));
`;

const Footer = styled.div`
  padding: 12px 0;
  border-top: 1px solid rgba(112, 115, 124, 0.08);
  text-align: center;
`;

const AllNotificationsLink = styled(Link)`
  font-size: 14px;
  color: var(--Primary-Strong, #296768);
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default NotificationMenu;