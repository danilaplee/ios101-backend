var mysql	= require('mysql');
var sworm	= require('sworm');
var config  =
{
	host: 'localhost',
	user: 'root',
	password: 'k451lis',
	database: 'mcs-swift'
};
var connection 	= mysql.createConnection(config)

connection.connect();

//STORE OUR MODEL INSIDE PROGRAM

var model =
	{
		"user":[]
	};


//GET DATA

var getData = function(tableName)
{

	var query = 'SELECT * FROM `'+tableName+'`';
	var response = false;
	connection.query(query, function(err, rows, fields)
	{
		if(err)
		{
			console.log(err);
		};
		if(rows)
		{
			for (var i = rows.length - 1; i >= 0; i--)
			{
				var item = JSON.stringify(rows[i]);
				item = JSON.parse(item);
				rows[i] = item;
			};
		};
		model[tableName] = rows;
		response = true;

	});
	return response;

}

//UPDATE PROGRAM CACHE WITH A SMALL INTERVAL

setInterval(getData, 1000, 'user');

exports.index = model;

var adapter = function(fieldName)
{
  	return fieldName;
}


//ADD SINGLE ITEM

exports.addItem = function(item, modelName, callback)
{
	var modelObject = item;
	sworm.db({
		driver: 'mysql',
		config: config
	})
	.then(function(db)
	{
		var model = db.model({table: modelName, id: 'id'})
		var nuItem = model(item);
		nuItem
		.save()
		.then(function()
		{
			callback(nuItem)
        	db.close();
		})

	})
}

exports.updateItem = function(item, modelName, callback)
{
	var modelObject = item;
	sworm.db({
		driver: 'mysql',
		config: config
	})
	.then(function(db)
	{
		var model = db.model({table: modelName, id: 'id'})
		var nuItem = model(item, {'saved':true, 'modified':true});

		nuItem
		.save()
		.then(function()
		{
			callback(nuItem)
			db.close();
		})

	})
}

exports.findById = function(modelName, id)
{
	var m = model[modelName]
	for (var i = m.length - 1; i >= 0; i--) 
	{
		if(+m[i].id === +id)
		{
			return m[i]
		}
	};
}


exports.deleteItem = function(id, tableName)
{

	var query = 'DELETE FROM `'+tableName+'` WHERE `id` = '+id;
	connection.query(query, function(err, rows, fields)
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			getData(tableName)
		}
	});
}
