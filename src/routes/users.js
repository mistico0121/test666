const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('users', '/', async (ctx) => {
  await ctx.render('users/index');
});

/*
//FUERON MOVIDOS A SESSION PARA SEPARAR USUARIO Y SUS VISTAS DE LOGINS Y SESIONES

router.get('register', '/register', async (ctx) => {
  await ctx.render('users/register');
});


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
    await ctx.render("users/index");
  }
});
router.post("registerUser", "/", async (ctx)=>{

});
module.exports = router;
