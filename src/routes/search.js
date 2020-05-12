const KoaRouter = require('koa-router');

const router = new KoaRouter();

async function loadGroup(ctx, next) {
  ctx.state.param = ctx.params.param;
  return next();
}
router.post('search.list', '/', async (ctx) => {
  const searched = ctx.request.body.search;
  const groupsList = await ctx.orm.group.findAll({
    where: {
      name: searched
    }
  });
  const usersList = await ctx.orm.user.findAll({
    where: {
      name: searched
    }
  });
  const publicationsList = await ctx.orm.publication.findAll({
    where: {
      title: searched
    }
  });

    await ctx.render('search/index', {groupsList, usersList, publicationsList});
});

module.exports = router;
