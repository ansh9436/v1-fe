const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'https://ansh-anshcompany.koyeb.app',
            changeOrigin: true,
        })
    );
};
