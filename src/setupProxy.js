import proxy from 'http-proxy-middleware'

module.exports = function(app) {
    app.use(proxy('/api', { target: 'https://web-api-pos.herokuapp.com/api' }));
};