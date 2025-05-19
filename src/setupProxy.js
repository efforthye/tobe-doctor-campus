// src/setupProxy.js - CRA의 webpack 설정을 확장
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // 개발 서버에서 확장 프로그램 관련 에러 처리
  app.use((req, res, next) => {
    // 확장 프로그램 요청은 무시
    if (req.url && req.url.includes('chrome-extension://')) {
      return res.status(204).end();
    }
    next();
  });
};