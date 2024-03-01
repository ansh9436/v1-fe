const {createProxyMiddleware} = require('http-proxy-middleware');
console.log('setupProxy 에서', process.env.REACT_APP_API_URL);
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            //target: 'https://ansh-anshcompany.koyeb.app',
            //target: 'http://172.30.36.29:8080',
            //target: 'http://localhost:8080',
            target: process.env.REACT_APP_API_URL,
            changeOrigin: true,
        })
    );
};
