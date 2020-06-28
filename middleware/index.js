const MaskModel     = require('../models/mask'),
      CommentModel  = require('../models/comment'),
      middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('/login');
};

middlewareObj.checkCommentOwnership = (req, res, next) =>{
	// is user logged in?
	if(req.isAuthenticated()){
		CommentModel.findById(req.params.comment_id, (err, foundComment)=>{
			if(err) res.redirect('back');
			else{
				// does user wrote the comment?
				if(foundComment.author.id.equals(req.user._id)){
					next();
				// otherwise, redirect
				}else{
					res.redirect('back');
				}
			}
		});
	// if not, redirect
	}else{
        req.flash('error', 'You need to be logged in to do that');
		res.redirect('back');
	}
}
middlewareObj.checkMaskOwnership = (req, res, next) =>{
	// is user logged in?
	if(req.isAuthenticated()){
		MaskModel.findById(req.params.id, (err, foundMask)=>{
			if(err){
                req.flash('error', 'Mask not found');
                res.redirect('back');
            } 
			else{
				// does user own the mask?
				if(foundMask.author.id.equals(req.user._id)){
					next();
				// otherwise, redirect
				}else{
                    req.flash('error', "you don't have permission to do that");
					res.redirect('back');
				}
			}
		});
	// if not, redirect
	}else{
        req.flash('error', 'You need to be logged in to do that');
		res.redirect('back');
	}
}

module.exports = middlewareObj;