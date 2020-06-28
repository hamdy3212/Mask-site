const express   = require('express'),
      router    = express.Router(),
      MaskModel = require('../models/mask'),
      CommentModel = require('../models/mask'),
	  middleware = require('../middleware');

// INDEX - Show all masks
router.get('/', (req, res)=>{
	MaskModel.find({}, (err, allMasks)=>{
		if(err){
			console.log(err);
		}else{
			res.render('masks/index', {masks:allMasks});
		}
	})
});

// NEW - Show the form to add new mask
router.get('/new', middleware.isLoggedIn, (req, res)=>{
	res.render("masks/new");
});

// SHOW - Shows more info about one mask
router.get('/:id', (req, res)=>{
	MaskModel.findById(req.params.id).populate('comments').exec((err, foundMask)=>{
		if(err){
			console.log(err);
		}else{
			res.render('masks/show', {mask:foundMask});
		}
	});
});

// CREATE - Create new mask
router.post('/', middleware.isLoggedIn, (req, res)=>{
	const maskname = req.body.maskname,
		  price = req.body.price,
		  image	   = req.body.image,
		  desc 	   = req.body.description,
	      author   = {
			  id: req.user._id,
			  username: req.user.username
			},
	      newMask = {name:maskname, image:image, description:desc, author:author, price:price};
	MaskModel.create(newMask, (err, newlyCreated)=>{
		if(err){
			console.log(err);
		}else{
			res.redirect('/masks');
		}
	});
});

// Edit Mask
router.get('/:id/edit', middleware.checkMaskOwnership, (req, res)=>{
	MaskModel.findById(req.params.id, (err, foundMask)=>{
		if(err) console.log(err);
		else{
			res.render('masks/edit', {mask:foundMask});
		}
	});
});

// Update mask
router.put('/:id', middleware.checkMaskOwnership, (req, res)=>{
	MaskModel.findByIdAndUpdate(req.params.id, req.body.mask, (err, updatedMask)=>{
		if(err) res.redirect('/masks');
		else{
			res.redirect('/masks/' + updatedMask.id);
		}
	});
});

// DESTROY mask
router.delete('/:id',middleware.checkMaskOwnership, async(req, res)=>{
	try{
		const foundMask = await MaskModel.findById(req.params.id);
		await foundMask.remove();
		res.redirect("/masks");
	}catch(err){
		res.redirect("/masks");
	}
});

module.exports = router;
