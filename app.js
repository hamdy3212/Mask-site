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
	  require('dotenv').config();
	
// APP CONFIG
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

mongoose.connect(process.env.DATABASEURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// mongodb+srv://hamdy:faster@cluster0-svqew.mongodb.net/masks?retryWrites=true&w=majority

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


app.listen(process.env.PORT || 3000, function(){
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
  