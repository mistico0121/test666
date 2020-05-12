const KoaRouter = require('koa-router');
// const sendLoginAlertEmail = require('../mailers/login-alert');

const router = new KoaRouter();

router.get('session.new', '/sign_in', (ctx) => ctx.render('sessions/sign_in', {
  createSessionPath: ctx.router.url('session.create'),
  notice: ctx.flashMessage.notice,
}));

router.put('session.create', '/', async (ctx) => {
  const { email, password } = ctx.request.body;
  const user = await ctx.orm.user.findOne({ where: { email } });
  const isPasswordCorrect = user && await user.checkPassword(password);
  if (isPasswordCorrect) {
    // await sendLoginAlertEmail(ctx, { user });
    ctx.session.userId = user.id;
    return ctx.redirect(ctx.router.url('index'));
  }
  return ctx.render('sessions/sign_in', {
    email,
    createSessionPath: ctx.router.url('session.create'),
    error: 'Incorrect mail or password',
  });
});

router.delete('session.destroy', '/', (ctx) => {
  ctx.session = null;
  ctx.redirect(ctx.router.url('session.new'));
});

router.get('register', '/register', async (ctx) => {
  await ctx.render('sessions/register');
});


module.exports = router;