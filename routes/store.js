var express = require('express');
var model   = require('../controllers/model')
var router  = express.Router();


/* GET home page. */

router.get('/', function(req, res)
{
	res.send({'Welcome':'This is Store'})
})

router.get('/:model/:id?', function(req, res)
{
	var modelName 	= req.params.model 
	var id 			= req.params.id
	var m 			= model.index

	console.log(id, modelName);

	if(id) res.send([ model.findById(modelName, id) ]);

	res.send(m[modelName])
})

router.post('/:model', function(req, res) 
{
	var body = req.body
	var modelName = req.params.model
	var makeComplete = function(data)
	{
		res.send(data)
	}
	model.addItem(body, modelName, makeComplete)

});


router.put('/:model', function(req, res) 
{
	var body = req.body
	var modelName = req.params.model
	var makeComplete = function(data)
	{
		res.send(data)
	}
	model.updateItem(body, modelName, makeComplete)

});

module.exports = router;
