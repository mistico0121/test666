const KoaRouter = require('koa-router');

const hello = require('./routes/hello');
const index = require('./routes/index');
const users = require('./routes/users');
const groups = require('./routes/groups');
const publications = require('./routes/publications');
const reports = require('./routes/reports');
const search = require('./routes/search');
const reviews = require('./routes/reviews');
const sessions = require('./routes/sessions');

const router = new KoaRouter();

router.use(async (ctx, next) => {
  Object.assign(ctx.state, {
    currentUser: ctx.session.userId && await ctx.orm.user.findByPk(ctx.session.userId),
    newSessionPath: ctx.router.url('session.new'),
    destroySessionPath: ctx.router.url('session.destroy'),
    coursesPath: ctx.router.url('courses.list'),
  });
  return next();
});

router.use('/', index.routes());
router.use('/hello', hello.routes());
router.use('/users', users.routes());
router.use('/groups', groups.routes());
router.use('/publications', publications.routes());
router.use('/reports', reports.routes());
router.use('/search', search.routes());
router.use('/reviews', reviews.routes());
router.use('/sessions', sessions.routes());


module.exports = router;
