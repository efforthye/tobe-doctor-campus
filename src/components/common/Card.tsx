import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

export type CardVariant = 'default' | 'outlined' | 'elevated';
export type CardPadding = 'none' | 'small' | 'medium' | 'large';

export interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'medium',
  fullWidth = false,
  className,
  onClick,
  children,
}) => {
  return (
    <StyledCard
      variant={variant}
      padding={padding}
      fullWidth={fullWidth}
      className={className}
      onClick={onClick}
      clickable={!!onClick}
    >
      {children}
    </StyledCard>
  );
};

const getCardVariantStyles = (variant: CardVariant, theme: any) => {
  switch (variant) {
    case 'outlined':
      return css`
        background-color: ${theme.colors.background};
        border: 1px solid ${theme.colors.border};
        box-shadow: none;
      `;
    case 'elevated':
      return css`
        background-color: ${theme.colors.background};
        border: none;
        box-shadow: ${theme.shadows.medium};
      `;
    default:
      return css`
        background-color: ${theme.colors.background};
        border: none;
        box-shadow: ${theme.shadows.small};
      `;
  }
};

const getCardPaddingStyles = (padding: CardPadding, theme: any) => {
  switch (padding) {
    case 'none':
      return css`
        padding: 0;
      `;
    case 'small':
      return css`
        padding: ${theme.spacing.sm};
      `;
    case 'large':
      return css`
        padding: ${theme.spacing.xl};
      `;
    default:
      return css`
        padding: ${theme.spacing.md};
      `;
  }
};

const StyledCard = styled.div<{
  variant: CardVariant;
  padding: CardPadding;
  fullWidth: boolean;
  clickable: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  ${({ variant, theme }) => getCardVariantStyles(variant, theme)}
  ${({ padding, theme }) => getCardPaddingStyles(padding, theme)}
  
  ${({ clickable, theme }) =>
    clickable &&
    css`
      cursor: pointer;
      &:hover {
        box-shadow: ${theme.shadows.medium};
        transform: translateY(-2px);
      }
      &:active {
        transform: translateY(0);
      }
    `}
`;

export default Card;