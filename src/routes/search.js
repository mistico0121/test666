const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('search.list', '/:param', async (ctx) => {
  const groupsList = await ctx.orm.group.findAll({
    where: {
      name: ctx.params.param
    }
  });
  const usersList = await ctx.orm.user.findAll({
    where: {
      name: ctx.params.param
    }
  });
  const publicationsList = await ctx.orm.publication.findAll({
    where: {
      title: ctx.params.param
    }
  });

    await ctx.render('search/index', {groupsList, usersList, publicationsList});
});

module.exports = router;
