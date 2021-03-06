// TOPIC CONTROLLERS - SERVER SIDE

var mongoose = require('mongoose');

var Topic = mongoose.model('Topic');
var Post = mongoose.model('Post');


module.exports = (function(){

	return{

		show: function(req, res){
			Topic.find({}, function(err, results){
				if(err){ console.log(err); }
					else { res.json(results); }
			})
		},


		getbyid: function(req, res){
			

			Topic.findOne({_id: req.params.id})
			.populate('post')
			.exec(function(err, results){
				if(err){console.log(err);}
				else{
					res.json(results);
				}
			})
		},



		add: function(req, res){

			console.log(req.body);

			
			var newTopic = Topic({
			topic: req.body.topic,
			description: req.body.description,
			user_id: req.body.user_id,
			user_name: req.body.username
			})

			newTopic.save(function(err){
				if(!err){ console.log('question created'); }
					else { console.log(err); }
			})


		},


		addComment: function(req, res){

		Post.findOne({_id: req.params.id}, function(err, post){
       
        var comment = new Comment(req.body);
       
        comment._post = post._id;
        
        post.comment.push(comment);

        console.log(comment);
        
        comment.save(function(err){
            post.save(function(err){
        		if(err) {
                   console.log('Error');

       			} else {
               		console.log('comment created');
               		res.json(true);
              		}
            	})
        	})
    	})	



		},



		addPost: function(req, res){

		Topic.findOne({_id: req.params.id}, function(err, topic){
       
        var post = new Post(req.body);
       
        post._topic = topic._id;
        
        topic.post.push(post);
        
        post.save(function(err){
            topic.save(function(err){
        		if(err) {
                   console.log('Error');

       			} else {
               		console.log('answer created');
               		res.json(topic._id);
              		}
            	})
        	})
    	})	

	},



		addLike: function(req, res){
			
			var query = {'_id':req.params.id};

			var newData = {'like': req.body.like };

				Post.findOneAndUpdate(query, newData, {upsert:false}, function(err, doc){
				    if (err) return res.send(500, { error: err });
				    return res.send("like succesfully added");
				});

		},

		addDislike: function(req, res){

			var query = {'_id':req.params.id};

			var newData = {'dislike': req.body.dislike };

				Post.findOneAndUpdate(query, newData, {upsert:false}, function(err, doc){
				    if (err) return res.send(500, { error: err });
				    return res.send("dislike succesfully added");
				});

		}



	}

})();


