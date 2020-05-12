const KoaRouter =  require("koa-router");

const router = new KoaRouter();

//BASADO EN CODIGO DE PROYECTO MY UNIVERSITY

async function loadPublications(ctx, next) {
  ctx.state.publications = await ctx.orm.publication.findByPk(ctx.params.id);
  return next();
}

router.get('publications.list','/',async(ctx)=>{
	//OBTENER LISTA DE PUBLICACIONES
	const publicationsList = await ctx.orm.publication.findAll();

	//RENDEREAR VISTA EN RUTA
	await ctx.render('publications/index', {
		publicationsList,
		newPublicationsPath: ctx.router.url('publications.new'),

    getPublicationsPath: (publications) => ctx.router.url('publications.show', { id: publications.id }),
  	editPublicationsPath: (publications) => ctx.router.url('publications.edit', { id: publications.id }),
  	deletePublicationsPath: (publications) => ctx.router.url('publications.delete', { id: publications.id }),

	});
});


/*
router.get('publications', '/', async (ctx) => {
  await ctx.render('publications/index');
});*/

router.get("publications.new", "/new", async (ctx) =>{
	const publications = ctx.orm.publication.build();
	await ctx.render("publications/new", {
		publications,
		submitPublicationsPath: ctx.router.url("publications.create"),
	});
});



router.post('publications.create', "/", async(ctx) => {
	const publications = ctx.orm.publication.build(ctx.request.body);

	//SI FALLA
	try{
		await publications.save({fields: ["title", "category","description", "state", "groupId"]});
		ctx.redirect(ctx.router.url("publications.list"));
	} catch(validationError){
		await ctx.render("publications.new",{
			publications,
			errors: validationError.errors,
			submitPublicationsPath: ctx.router("publications.create"),
		});

	}
});

/*title: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    state*/
router.get('publications.edit', '/:id/edit', loadPublications, async (ctx) => {
  const { publications } = ctx.state;
  await ctx.render('publications/edit', {
    publications,
    submitPublicationsPath: ctx.router.url('publications.update', { id: publications.id }),
  });
});

router.patch('publications.update', '/:id', loadPublications, async (ctx) => {
  const { publications } = ctx.state;
  try {
    const { title, category, description , state} = ctx.request.body;
    await publications.update({ title, category, description , state });
    ctx.redirect(ctx.router.url('publications.list'));
  } catch (validationError) {
    await ctx.render('publications/edit', {
      publications,
      errors: validationError.errors,
      submitPublicationsPath: ctx.router.url('publications.update', { id: publications.id }),
    });
  }
});

router.get('publications.show','/:id', loadPublications, async(ctx)=>{
  const { publications } = ctx.state;
  try {
    const { title, category, description , state } = ctx.request.body;
    await ctx.render('publications/show',{
      getPublicationsPath: (publications) => "publications/".concat(publications.id),

    });
  }catch (validationError){
    if (!publications) ctx.throw(404, 'invalid group id');
  }
});

router.del('publications.delete', '/:id', loadPublications, async (ctx) => {
  const { publications } = ctx.state;
  await publications.destroy();
  ctx.redirect(ctx.router.url('publications.list'));
});


module.exports = router;
