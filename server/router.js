/*
 * router
 */
const fs = require('fs');
const path = require('path');

module.exports = app => {
  const { router, config } = app;

  // page route
  router.get('/', ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream(path.join(__dirname, '../dist/index.html'));
  });

  // api control
  router.get('/api', async (ctx) => {
    ctx.response.body = {
      code: 0,
      message: '请求成功',
      data: null
    }
  });
}
