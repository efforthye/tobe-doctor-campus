import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const menuItems = [
  { id: 'profile', title: '내 프로필', link: '/profile' },
  { id: 'myclass', title: '내 클래스', link: '/my-classes' },
  { id: 'settings', title: '계정 설정', link: '/settings' },
  { id: 'support', title: '고객센터', link: '/support' },
];

const ProfileMenu = forwardRef<HTMLDivElement, ProfileMenuProps>(
  ({ isOpen, onClose, onLogout }, ref) => {
    if (!isOpen) return null;

    return (
      <Container ref={ref}>
        <MenuList>
          {menuItems.map((item) => (
            <MenuItem key={item.id}>
              <StyledLink to={item.link} onClick={onClose}>
                {item.title}
              </StyledLink>
            </MenuItem>
          ))}
          <Separator />
          <MenuItem>
            <LogoutButton onClick={onLogout}>로그아웃</LogoutButton>
          </MenuItem>
        </MenuList>
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
  overflow: hidden;
  
  /* 드롭다운과 버튼 사이의 공간 메움 */
  &:before {
    content: '';
    position: absolute;
    top: -4px;
    left: 0;
    width: 100%;
    height: 4px;
  }
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 19px 32px;
  margin: 0;
`;

const MenuItem = styled.li`
  padding: 11px 0;
`;

const StyledLink = styled(Link)`
  display: block;
  color: var(--Label-Normal, #171719);
  text-decoration: none;
  font-size: 15px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 500;
  line-height: 22.01px;
  letter-spacing: 0.14px;
  transition: color 0.1s ease;
  
  &:hover {
    color: var(--Primary-Strong, #296768);
  }
`;

const Separator = styled.div`
  padding: 8px 0;
  
  &:after {
    content: '';
    display: block;
    height: 1px;
    background: rgba(112, 115, 124, 0.08);
    width: 100%;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  width: 100%;
  text-align: left;
  color: var(--Label-Error, #e53935);
  cursor: pointer;
  font-size: 15px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 500;
  line-height: 22.01px;
  letter-spacing: 0.14px;
  
  &:hover {
    opacity: 0.8;
  }
`;

export default ProfileMenu;