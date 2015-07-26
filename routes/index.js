var express = require('express');
var model   = require('../controllers/model')
var router  = express.Router();


/* GET home page. */

router.get('/:model/:id', function(req, res)
{
	var modelName 	= req.params.model 
	var m 			= model.index
	var id 			= req.params.id
	if(id) return res.send(model.findById(modelName, id))
	return res.send({modelName:m[modelName]})
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


router.delete('/:model/:id', function(req, res) 
{
	var id = req.params.id
	var modelName = req.params.model
	var makeComplete = function(data)
	{
		res.send(data)
	}
	model.deleteItem(id, modelName, makeComplete)

});

module.exports = router;
