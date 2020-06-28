const mongoose = require("mongoose");
const CommentModel = require('./comment');


const maskSchema = new mongoose.Schema({
	name: String ,
	price: String,
	image: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'comment'
		}
	]
});
maskSchema.pre("remove",async function(){
	await CommentModel.deleteMany({
	   _id:{
		  $in:this.comments
	   }
	});
 });
module.exports = mongoose.model('mask', maskSchema);