const KoaRouter = require('koa-router');

const router = new KoaRouter();

async function loadUser(ctx, next) {
  ctx.state.user = await ctx.orm.user.findByPk(ctx.params.id);
  return next();
}


router.get('user.new', '/register', async (ctx) => {
  const user = ctx.orm.user.build();
  await ctx.render('users/register', {
    user,
    submitUserPath: ctx.router.url('users.create'),
  });

});


router.get('users.list', '/', async (ctx) => {
  const usersList = await ctx.orm.user.findAll();

  await ctx.render('users/index',{
    usersList,
  });
});

/*


//FUERON MOVIDOS A SESSION PARA SEPARAR USUARIO Y SUS VISTAS DE LOGINS Y SESIONES

router.get('sign_in', '/sign_in', async (ctx) => {
  await ctx.render('users/sign_in');
});*/

router.get('showUser', '/:username', async (ctx) => {
  const user = await ctx.orm.user.findOne({
    where: {
      username: ctx.params.username
    },
  });
  if(user != null) {
    //Found user, display its profile page.
    const username = user.username;
    const email = user.email;
    const userRealName = user.name;
    const phone = user.phone;
    const userAddress = user.address;
    await ctx.render('users/profile', { username, email,userRealName,phone, userAddress });
  } else {
    //user not found.

    const usersList = await ctx.orm.user.findAll();

    await ctx.render('users/index',{
      usersList,
    });
  }
});


router.post('users.create', '/', async (ctx) => {
  const user = ctx.orm.user.build(ctx.request.body);
  try {
    await user.save({ fields: ['username',"name", 'email', 'password', "phone", "address"] });
    ctx.redirect("/");
  } catch (validationError) {
    await ctx.render('user.new', {
      user,
      errors: validationError.errors,
      submitUserPath: ctx.router.url('user.create'),
    });
  }
});



module.exports = router;
