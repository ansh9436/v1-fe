const {createProxyMiddleware} = require('http-proxy-middleware');

// 로컬,개발환경에서만 적용됨, 배포환경에서는 netlify.toml 의 프록시 설정을 따라감
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://localhost:8080',
            changeOrigin: true,
        })
    );

    app.use(
        createProxyMiddleware('/fileapi', {
            target: 'http://ansh.dothome.co.kr',
            changeOrigin: true,
        })
    );
};
