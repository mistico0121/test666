const KoaRouter = require('koa-router');
const pkg = require('../../package.json');

const router = new KoaRouter();

async function loadGroup(ctx, next) { // TODO move this to group
  ctx.state.group = await ctx.orm.group.findByPk(ctx.params.id);
  return next();
}

router.get('/', async (ctx) => {
  const groupsList = await ctx.orm.group.findAll(); // TODO remove hardcode
  // const groupsList = [{name: "grupo1",id: 1},{name: "PSP", id: 2}];
  await ctx.render('index', {
    groupsList,
    appVersion: pkg.version,
    getGroupPath: (group) => "groups/".concat(group.id),
    editGroupPath: (group) => "groups/".concat(group.id).concat("/edit"),
    deleteGroupPath: (group) => ctx.router.url('groups.delete', { id: group.id })
  });
});


router.del('groups.delete', 'groups/:id', loadGroup, async (ctx) => {
  const { group } = ctx.state;
  await group.destroy();
  ctx.redirect("/");
});



router.post('sign_up', async (ctx) => {
  console.log("called.")
  //todo avoid people from being called register. Or just change the route idk
});

module.exports = router;
