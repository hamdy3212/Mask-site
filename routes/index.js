const express  = require('express'),
      router   = express.Router(),
      passport = require('passport'),
      User     = require('../models/user');


// HOME PAGE
router.get('/', (req, res) =>{
	res.render('landing');
})

//	============================
// 		AUTHENTICATION ROUTE
// 	============================

// ==== REGISTER ROUTES =====

// get the register form
router.get('/register', (req, res)=>{
	res.render('register');
});

// register a new user
router.post('/register', (req, res)=>{
	const newUser = new User({username: req.body.username});
	const pw = req.body.password;
	User.register(newUser, pw, (err, user)=>{
		if(err){
			req.flash('error', err.message); 
			return res.redirect('/register');
		}
		passport.authenticate('local')(req, res, ()=>{
			req.flash('success', 'welcome ' + user.username);
			res.redirect('/masks');
		});
	});
});

// ==== LOGIN ROUTES ====

// show login form
router.get('/login', (req, res)=>{
	res.render('login');
});

// handling login logic 
router.post('/login', passport.authenticate('local', {
	successRedirect: '/masks',
	failureRedirect: 'login'
}), (req, res)=>{
});

// LOGOUT ROUTE
router.get('/logout', (req, res)=>{
	req.logout();
	req.flash('success', "logged you out");
	res.redirect('./masks');
});

module.exports = router;