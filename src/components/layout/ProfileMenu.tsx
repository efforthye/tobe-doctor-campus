import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const menuItems = [
  { id: 'mypage', title: '마이페이지', link: '/profile' },
  { id: 'classroom', title: '나의 강의실', link: '/my-classes' },
  { id: 'cert', title: '수료증', link: '/certificates' }
];

const ProfileMenu = forwardRef<HTMLDivElement, ProfileMenuProps>(
  ({ isOpen, onClose, onLogout }, ref) => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleMouseEnter = (id: string) => {
      setHoveredItem(id);
    };

    const handleMouseLeave = () => {
      // setHoveredItem(null);
    };
    
    return (
      <Container ref={ref} data-variant="Menu">
        {menuItems.map((item) => (
          <MenuItem 
            key={item.id} 
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
          >
            <MenuLink 
              to={item.link} 
              onClick={onClose} 
              $isHovered={hoveredItem === item.id}
              $hasHovered={hoveredItem !== null}
            >
              {item.title}
            </MenuLink>
          </MenuItem>
        ))}
        <Separator />
        <MenuItem>
          <LogoutButton onClick={onLogout}>로그아웃</LogoutButton>
        </MenuItem>
      </Container>
    );
  }
);

const Container = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 180px;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 19px;
  padding-bottom: 19px;
  background: var(--Background-Elevated-Normal, white);
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  border-radius: 18px;
  outline: 1px rgba(112, 115, 124, 0.08) solid;
  outline-offset: -1px;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
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

const MenuItem = styled.div`
  align-self: stretch;
  padding-top: 11px;
  padding-bottom: 11px;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const MenuLink = styled(Link)<{ $isHovered?: boolean; $hasHovered?: boolean }>`
  flex: 1 1 0;
  text-decoration: none;
  color: ${({ $isHovered, $hasHovered }) => 
    $hasHovered && !$isHovered ? 'var(--Label-Assistive, rgba(55, 56, 60, 0.28))' : 'var(--Label-Normal, #171719)'};
  font-size: 15px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 500;
  line-height: 22.01px;
  letter-spacing: 0.14px;
  word-wrap: break-word;
  transition: color 0.1s ease;
`;

const Separator = styled.div`
  align-self: stretch;
  padding-top: 8px;
  padding-bottom: 8px;
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

const LogoutButton = styled.button`
  flex: 1 1 0;
  background: none;
  border: none;
  padding: 0;
  text-align: left;
  color: var(--Label-Alternative, rgba(55, 56, 60, 0.61));
  font-size: 15px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 500;
  line-height: 22.01px;
  letter-spacing: 0.14px;
  word-wrap: break-word;
  cursor: pointer;
`;

export default ProfileMenu;