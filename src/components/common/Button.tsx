import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  isLoading?: boolean;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  startIcon,
  endIcon,
  isLoading = false,
  children,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <LoadingSpinner />}
      {!isLoading && startIcon && <IconWrapper position="start">{startIcon}</IconWrapper>}
      <span>{children}</span>
      {!isLoading && endIcon && <IconWrapper position="end">{endIcon}</IconWrapper>}
    </StyledButton>
  );
};

const getButtonVariantStyles = (variant: ButtonVariant, theme: any) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${theme.colors.primary};
        color: white;
        border: none;
        &:hover {
          background-color: ${theme.colors.primaryDark};
        }
        &:active {
          background-color: ${theme.colors.primaryDark};
        }
        &:disabled {
          background-color: ${theme.colors.borderDark};
          color: ${theme.colors.textLight};
          cursor: not-allowed;
        }
      `;
    case 'secondary':
      return css`
        background-color: ${theme.colors.secondary};
        color: white;
        border: none;
        &:hover {
          background-color: ${theme.colors.secondaryDark};
        }
        &:active {
          background-color: ${theme.colors.secondaryDark};
        }
        &:disabled {
          background-color: ${theme.colors.borderDark};
          color: ${theme.colors.textLight};
          cursor: not-allowed;
        }
      `;
    case 'outline':
      return css`
        background-color: transparent;
        color: ${theme.colors.primary};
        border: 1px solid ${theme.colors.primary};
        &:hover {
          background-color: rgba(92, 122, 255, 0.1);
        }
        &:active {
          background-color: rgba(92, 122, 255, 0.2);
        }
        &:disabled {
          color: ${theme.colors.textLight};
          border-color: ${theme.colors.border};
          cursor: not-allowed;
        }
      `;
    case 'text':
      return css`
        background-color: transparent;
        color: ${theme.colors.primary};
        border: none;
        &:hover {
          background-color: rgba(92, 122, 255, 0.1);
        }
        &:active {
          background-color: rgba(92, 122, 255, 0.2);
        }
        &:disabled {
          color: ${theme.colors.textLight};
          cursor: not-allowed;
        }
      `;
    case 'danger':
      return css`
        background-color: ${theme.colors.error};
        color: white;
        border: none;
        &:hover {
          background-color: darkred;
        }
        &:active {
          background-color: #c62828;
        }
        &:disabled {
          background-color: ${theme.colors.borderDark};
          color: ${theme.colors.textLight};
          cursor: not-allowed;
        }
      `;
    default:
      return css`
        background-color: ${theme.colors.primary};
        color: white;
        border: none;
      `;
  }
};

const getButtonSizeStyles = (size: ButtonSize, theme: any) => {
  switch (size) {
    case 'small':
      return css`
        padding: 6px 12px;
        font-size: ${theme.fontSizes.sm};
        border-radius: ${theme.borderRadius.small};
      `;
    case 'medium':
      return css`
        padding: 8px 16px;
        font-size: ${theme.fontSizes.md};
        border-radius: ${theme.borderRadius.medium};
      `;
    case 'large':
      return css`
        padding: 12px 24px;
        font-size: ${theme.fontSizes.lg};
        border-radius: ${theme.borderRadius.medium};
      `;
    default:
      return css`
        padding: 8px 16px;
        font-size: ${theme.fontSizes.md};
        border-radius: ${theme.borderRadius.medium};
      `;
  }
};

const StyledButton = styled.button<{
  variant: ButtonVariant;
  size: ButtonSize;
  fullWidth: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  
  ${({ variant, theme }) => getButtonVariantStyles(variant, theme)}
  ${({ size, theme }) => getButtonSizeStyles(size, theme)}
  
  & > span {
    white-space: nowrap;
  }
`;

const IconWrapper = styled.span<{ position: 'start' | 'end' }>`
  display: flex;
  align-items: center;
  ${({ position }) =>
    position === 'start'
      ? css`
          margin-right: 8px;
        `
      : css`
          margin-left: 8px;
        `}
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Button;