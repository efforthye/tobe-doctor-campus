import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  fonts: {
    body: "'Pretendard JP', sans-serif",
    heading: "'Pretendard JP', sans-serif",
  },
  colors: {
    primary: '#448181', // 피그마 디자인의 주요 색상
    primaryLight: '#5AA3A3',
    primaryDark: '#336060',
    secondary: '#4FBCA3',
    secondaryLight: '#7EDBC8',
    secondaryDark: '#3D967F',
    background: '#FFFFFF',
    backgroundGray: '#F4F4F5', // 피그마 디자인의 배경색
    text: '#171719', // 피그마 디자인의 텍스트 색상
    textSecondary: 'rgba(46, 47, 51, 0.88)', // 피그마 디자인의 보조 텍스트 색상
    textLight: 'rgba(55, 56, 60, 0.61)', // 피그마 디자인의 연한 텍스트 색상
    textLighter: 'rgba(55, 56, 60, 0.28)', // 피그마 디자인의 더 연한 텍스트 색상
    border: 'rgba(112, 115, 124, 0.16)', // 피그마 디자인의 테두리 색상
    borderDark: 'rgba(112, 115, 124, 0.22)', // 피그마 디자인의 진한 테두리 색상
    error: '#ff5252',
    success: '#4CAF50',
    warning: '#FFC107',
    info: '#2196F3',
  },
  fontSizes: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    md: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    xxl: '1.5rem', // 24px
    xxxl: '2.5rem', // 40px - 피그마 디자인의 큰 헤딩 크기
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    xxl: '3rem', // 48px
  },
  borderRadius: {
    small: '8px', // 피그마 디자인의 작은 둥근 모서리
    medium: '12px', // 피그마 디자인의 중간 둥근 모서리
    large: '16px', // 피그마 디자인의 큰 둥근 모서리
    round: '50%',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    largeDesktop: '1360px', // 컨텐츠 영역 1200px + 패딩 160px
  },
  shadows: {
    small: '0 1px 2px rgba(0, 0, 0, 0.03)', // 피그마 디자인의 작은 그림자
    medium: '0 4px 6px rgba(0, 0, 0, 0.1)', // 피그마 디자인의 중간 그림자
    large: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s',
  },
};

// 타입스크립트를 위한 테마 타입 확장
declare module 'styled-components' {
  export interface DefaultTheme {
    fonts: {
      body: string;
      heading: string;
    };
    colors: {
      primary: string;
      primaryLight: string;
      primaryDark: string;
      secondary: string;
      secondaryLight: string;
      secondaryDark: string;
      background: string;
      backgroundGray: string;
      text: string;
      textSecondary: string;
      textLight: string;
      textLighter: string;
      border: string;
      borderDark: string;
      error: string;
      success: string;
      warning: string;
      info: string;
    };
    fontSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
    };
    fontWeights: {
      light: number;
      regular: number;
      medium: number;
      semiBold: number;
      bold: number;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
      round: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
      largeDesktop: string; // 1360px로 변경됨 (컨텐츠 영역 1200px)
    };
    shadows: {
      small: string;
      medium: string;
      large: string;
    };
    transitions: {
      fast: string;
      normal: string;
      slow: string;
    };
  }
}