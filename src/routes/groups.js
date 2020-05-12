const KoaRouter = require('koa-router');

const router = new KoaRouter();

async function loadGroup(ctx, next) {
  ctx.state.group = await ctx.orm.group.findByPk(ctx.params.id);
  return next();
}

router.get('groups.list', '/', async (ctx) => {
  await ctx.render('groups/index');
});

router.get('group.new', '/new', async (ctx) => {
  const group = ctx.orm.group.build();
  await ctx.render('groups/new', {
    group,
    submitGroupPath: ctx.router.url('groups.create'),
  });

});

router.post('groups.create', '/', async (ctx) => {
  const group = ctx.orm.group.build(ctx.request.body);
  try {
    await group.save({ fields: ['name', 'image', 'description'] });
    ctx.redirect("/");
  } catch (validationError) {
    await ctx.render('groups.new', {
      group,
      errors: validationError.errors,
      submitGroupPath: ctx.router.url('groups.create'),
    });
  }
});

router.get('groups.edit', '/:id/edit', loadGroup, async (ctx) => {
  const { group } = ctx.state;
  await ctx.render('groups/edit', {
    group,
    submitGroupPath: ctx.router.url('groups.update', { id: group.id }),
  });
});

router.patch('groups.update', '/:id', loadGroup, async (ctx) => {
  const { group } = ctx.state;
  try {
    const { name, description, image } = ctx.request.body;
    await group.update({ name, description, image });
    ctx.redirect("/");
  } catch (validationError) {
    await ctx.render('groups/edit', {
      group,
      errors: validationError.errors,
      submitGroupPath: ctx.router.url('groups.update', { id: group.id }),
    });
  }
});

router.get('groups.show','/:id', loadGroup, async(ctx)=>{
  const { group } = ctx.state;
  try {
    const { name, description, image } = ctx.request.body;
    await ctx.render('groups/show');
  }catch (validationError){
    if (!group) ctx.throw(404, 'invalid group id');
  }
});



// router.del('groups.delete', '/:id', loadGroup, async (ctx) => {
//   const { group } = ctx.state;
//   await group.destroy();
//   ctx.redirect("/");
// });


module.exports = router;
