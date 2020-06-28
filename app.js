const express 		= require('express'),
	  app 			= express(),
	  bodyParser 	= require('body-parser'),
	  mongoose 		= require('mongoose'),
	  passport		= require('passport'),
	  localStrategy = require('passport-local'),
	  User			= require('./models/user'),
	  seedDB		= require('./seeds'),
	  methodOverride= require('method-override'),
	  flash	 	    = require('connect-flash'),
	  // require routes
	  commentRoutes = require('./routes/comments'),
	  masksRoutes = require('./routes/masks'),
	  indexRoutes = require('./routes/index');

// APP CONFIG
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('useFindAndModify', false);
app.use(express.static(__dirname + "/public"));
// seedDB();
app.use(methodOverride('_method'));
app.use(require('express-session')({
	secret: "This is a secret",
	resave: false,
	saveUninitialized: false
}));
app.use(flash()); 
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next)=>{
	res.locals.currentUser = req.user;
	res.locals.error 	   = req.flash("error");
	res.locals.success 	   = req.flash("success");

	next();
});
// using routes
app.use('/', indexRoutes);
app.use('/masks', masksRoutes);
app.use('/masks/:id/comments', commentRoutes);
// using passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.listen(3000, () => {
	console.log('Masks server is running');
});