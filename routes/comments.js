const express       = require('express'),
      router        = express.Router({mergeParams:true}),
      MaskModel     = require('../models/mask'),
	  CommentModel  = require('../models/comment'),
	  middleware = require('../middleware');

// new comment
router.get('/new', middleware.isLoggedIn, (req, res) =>{
	MaskModel.findById(req.params.id, (err, found)=>{
		if(err) console.log(err);
		else{
			res.render("comments/new", {mask:found});
		}
	})
});

// create comment
router.post('/', middleware.isLoggedIn, (req, res)=>{
	MaskModel.findById(req.params.id, (err, found)=>{
		if(err) console.log(err);
		else{
			CommentModel.create(req.body.comment, (err, comment)=>{
				if(err){
					req.flash('error', 'something went wrong');
					console.log(err);
				} 
				else{
					// add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// save comment
					comment.save();
					found.comments.push(comment);
					found.save();
					req.flash('success', 'Successfully added comment');
					res.redirect('/masks/' + found._id);
				}
			})
		}
	});
});

// Edit comment
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res)=>{
	MaskModel.findById(req.params.id, (err, foundMask) =>{
		CommentModel.findById(req.params.comment_id, (err, foundComment) => {
			res.render('comments/edit', {mask:foundMask, comment: foundComment});
		});
	});
});

// Update comment
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res)=>{
	CommentModel.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updated)=>{
		res.redirect('/masks/' + req.params.id);
	});
});

// Delete comment
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res)=>{
	CommentModel.findByIdAndRemove(req.params.comment_id, (err)=>{
		if(err) console.log(err);
		req.flash('success', 'comment deleted');
		res.redirect('back');
	})
})

module.exports = router;
