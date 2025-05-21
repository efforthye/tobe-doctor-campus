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
    caption: '캡션',
    title: '알림의 내용이 들어갑니다. 내용이 길어지면 다음 줄로 넘어가요.',
    date: '날짜 또는 부가 정보',
    read: false,
    link: '/notification/1'
  },
  {
    id: 2,
    caption: '캡션',
    title: '알림의 내용이 들어갑니다. 내용이 길어지면 다음 줄로 넘어가요.',
    date: '날짜 또는 부가 정보',
    read: false,
    link: '/notification/2'
  },
  {
    id: 3,
    caption: '캡션',
    title: '알림의 내용이 들어갑니다. 내용이 길어지면 다음 줄로 넘어가요.',
    date: '2023.07.06(목)',
    read: true,
    link: '/notification/3'
  }
];

const NotificationMenu = forwardRef<HTMLDivElement, NotificationMenuProps>(
  ({ isOpen, onClose }, ref) => {
    if (!isOpen) return null;

    return (
      <Container ref={ref} hasNotifications={notifications.length > 0} data-variant="Notification">
        <NotificationContent>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <NotificationItem>
                  <StyledLink to={notification.link}>
                    <NotificationCaption>{notification.caption}</NotificationCaption>
                    <NotificationTitle>{notification.title}</NotificationTitle>
                    <NotificationDate>{notification.date}</NotificationDate>
                  </StyledLink>
                </NotificationItem>
                {index < notifications.length - 1 && <Separator />}
              </React.Fragment>
            ))
          ) : (
            <EmptyNotification>
              <EmptyText>새로운 알림이 없습니다.</EmptyText>
            </EmptyNotification>
          )}
        </NotificationContent>
      </Container>
    );
  }
);

const Container = styled.div<{ hasNotifications: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  width: 392px;
  background: var(--Background-Elevated-Normal, white);
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  border-radius: 18px;
  outline: 1px rgba(112, 115, 124, 0.08) solid;
  outline-offset: -1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 100;
  margin-top: 8px;
  
  &:before {
    content: '';
    position: absolute;
    top: -8px;
    left: 0;
    width: 100%;
    height: 8px;
  }
`;

const NotificationContent = styled.div`
  align-self: stretch;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const NotificationItem = styled.div`
  width: 392px;
  padding: 12px 32px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const NotificationCaption = styled.div`
  color: var(--Primary-Normal, #448181);
  font-size: 12px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 600;
  line-height: 16.01px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
`;

const NotificationTitle = styled.div`
  align-self: stretch;
  color: var(--Label-Normal, #171719);
  font-size: 14px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 500;
  line-height: 21.99px;
  letter-spacing: 0.20px;
  word-wrap: break-word;
`;

const NotificationDate = styled.div`
  color: var(--Label-Alternative, rgba(55, 56, 60, 0.61));
  font-size: 12px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 400;
  line-height: 16.01px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
`;

const Separator = styled.div`
  align-self: stretch;
  padding: 8px 32px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
  
  &:after {
    content: '';
    align-self: stretch;
    height: 1px;
    background: var(--Line-Normal-Alternative, rgba(112, 115, 124, 0.08));
  }
`;

const EmptyNotification = styled.div`
  width: 392px;
  padding: 12px 32px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
`;

const EmptyText = styled.div`
  align-self: stretch;
  text-align: center;
  color: var(--Label-Alternative, rgba(55, 56, 60, 0.61));
  font-size: 14px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 500;
  line-height: 21.99px;
  letter-spacing: 0.20px;
  word-wrap: break-word;
`;

export default NotificationMenu;