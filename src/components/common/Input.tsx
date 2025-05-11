import React, { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import styled, { css } from 'styled-components';

export type InputSize = 'small' | 'medium' | 'large';
export type InputVariant = 'default' | 'outlined' | 'filled';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  size?: InputSize;
  variant?: InputVariant;
  fullWidth?: boolean;
  error?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  helperText?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      size = 'medium',
      variant = 'default',
      fullWidth = false,
      error,
      startIcon,
      endIcon,
      helperText,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <InputWrapper fullWidth={fullWidth} className={className}>
        {label && <Label>{label}</Label>}
        <InputContainer size={size} variant={variant} hasError={!!error}>
          {startIcon && <IconWrapper position="start">{startIcon}</IconWrapper>}
          <StyledInput
            ref={ref}
            hasStartIcon={!!startIcon}
            hasEndIcon={!!endIcon}
            {...props}
          />
          {endIcon && <IconWrapper position="end">{endIcon}</IconWrapper>}
        </InputContainer>
        {(error || helperText) && (
          <HelperText hasError={!!error}>{error || helperText}</HelperText>
        )}
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';

const InputWrapper = styled.div<{ fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Label = styled.label`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const getInputSizeStyles = (size: InputSize, theme: any) => {
  switch (size) {
    case 'small':
      return css`
        height: 32px;
        padding: 0 ${theme.spacing.sm};
        font-size: ${theme.fontSizes.xs};
      `;
    case 'medium':
      return css`
        height: 40px;
        padding: 0 ${theme.spacing.md};
        font-size: ${theme.fontSizes.sm};
      `;
    case 'large':
      return css`
        height: 48px;
        padding: 0 ${theme.spacing.lg};
        font-size: ${theme.fontSizes.md};
      `;
    default:
      return css`
        height: 40px;
        padding: 0 ${theme.spacing.md};
        font-size: ${theme.fontSizes.sm};
      `;
  }
};

const getInputVariantStyles = (variant: InputVariant, theme: any, hasError: boolean) => {
  const errorColor = theme.colors.error;
  const borderColor = hasError ? errorColor : theme.colors.border;
  const focusBorderColor = theme.colors.primary;
  
  switch (variant) {
    case 'outlined':
      return css`
        border: 1px solid ${borderColor};
        background-color: transparent;
        &:focus-within {
          border-color: ${hasError ? errorColor : focusBorderColor};
          box-shadow: 0 0 0 2px ${hasError ? 'rgba(255, 82, 82, 0.2)' : 'rgba(92, 122, 255, 0.2)'};
        }
      `;
    case 'filled':
      return css`
        border: none;
        background-color: ${theme.colors.backgroundGray};
        &:focus-within {
          background-color: ${theme.colors.background};
          box-shadow: 0 0 0 2px ${hasError ? 'rgba(255, 82, 82, 0.2)' : 'rgba(92, 122, 255, 0.2)'};
        }
      `;
    default:
      return css`
        border: none;
        border-bottom: 1px solid ${borderColor};
        background-color: transparent;
        border-radius: 0;
        &:focus-within {
          border-bottom-color: ${hasError ? errorColor : focusBorderColor};
        }
      `;
  }
};

const InputContainer = styled.div<{
  size: InputSize;
  variant: InputVariant;
  hasError: boolean;
}>`
  display: flex;
  align-items: center;
  border-radius: ${({ theme, variant }) => 
    variant !== 'default' ? theme.borderRadius.small : '0'};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  ${({ size, theme }) => getInputSizeStyles(size, theme)}
  ${({ variant, theme, hasError }) => getInputVariantStyles(variant, theme, hasError)}
`;

const StyledInput = styled.input<{
  hasStartIcon: boolean;
  hasEndIcon: boolean;
}>`
  flex: 1;
  border: none;
  background: none;
  outline: none;
  width: 100%;
  height: 100%;
  padding-left: ${({ hasStartIcon }) => (hasStartIcon ? '0' : 'inherit')};
  padding-right: ${({ hasEndIcon }) => (hasEndIcon ? '0' : 'inherit')};
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const IconWrapper = styled.div<{ position: 'start' | 'end' }>`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  ${({ position }) =>
    position === 'start'
      ? css`
          margin-right: 8px;
        `
      : css`
          margin-left: 8px;
        `}
`;

const HelperText = styled.p<{ hasError: boolean }>`
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme, hasError }) =>
    hasError ? theme.colors.error : theme.colors.textSecondary};
`;

export default Input;