import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* 드래그 방지 및 텍스트 선택 방지 */
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    /* 드래그 앤 드롭 방지 */
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
    /* 이미지 드래그 방지 추가 */
    pointer-events: auto;
  }

  /* 이미지 드래그 완전 방지 */
  img {
    -webkit-user-drag: none !important;
    -khtml-user-drag: none !important;
    -moz-user-drag: none !important;
    -o-user-drag: none !important;
    user-drag: none !important;
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
    user-select: none !important;
    pointer-events: none !important;
    /* 우클릭 방지 */
    -webkit-touch-callout: none !important;
    -webkit-tap-highlight-color: transparent !important;
  }

  /* 모든 미디어 요소 드래그 방지 */
  img, video, audio, canvas, svg {
    -webkit-user-drag: none !important;
    -khtml-user-drag: none !important;
    -moz-user-drag: none !important;
    -o-user-drag: none !important;
    user-drag: none !important;
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
    user-select: none !important;
    pointer-events: none !important;
  }

  /* 텍스트 요소는 선택 가능하게 */
  p, span, h1, h2, h3, h4, h5, h6, text, input, textarea, label {
    -webkit-user-select: text !important;
    -moz-user-select: text !important;
    -ms-user-select: text !important;
    user-select: text !important;
    pointer-events: auto !important;
  }

  /* 버튼과 링크는 클릭 가능하게 */
  button, a, [role="button"], [tabindex] {
    pointer-events: auto !important;
  }

  body {
    font-family: 'Pretendard JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    overflow-x: hidden;
    min-width: 320px;
    /* 전체 페이지 드래그 방지 */
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  html {
    overflow-x: hidden;
    /* HTML 레벨에서도 드래그 방지 */
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  input, textarea {
    font-family: inherit;
  }

  ul, ol {
    list-style: none;
  }

  /* 추가 드래그 방지를 위한 이벤트 차단 */
  * {
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
  }
`;

export default GlobalStyle;