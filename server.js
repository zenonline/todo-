var express = require('express');
var app = express();
var body_parser = require('body-parser');
var _ = require('underscore');
////////////////////////////////////////////////////////////////////////

var PORT = process.env.PORT || 3000
var todos =[];
var todo_next_id =1;

app.use(body_parser.json())

////////////////////////////////////////////////////////////////////////

app.get('/', function (req, res){
	res.send('Todo API Root');
});

///////////////////////////////////////////////////////////////////////////

app.get('/todos', function (req, res){
	var query_params = req.query;
	if(query_params.hasOwnProperty('completed')){
		if(query_params.completed == 'true'){
				query_params.completed = true;
		}else{
				query_params.completed = false;
		}
		filtered_todos = _.where(todos, {completed:query_params.completed});
		res.json(filtered_todos);
	}else{
		res.json(todos);
	}

});

/////////////////////////////////////////////////////////////////////////////

app.get('/todos/:id', function (req, res){
	var todo_id = parseInt(req.params.id, 10);
	var matched_todo = _.findWhere(todos, {id: todo_id});
	if (matched_todo) {
		res.json(matched_todo);
	} else {
		res.status(404).send();
	}
	
});

///////////////////////////////////////////////////////////////////////////////////

app.post('/todos', function (req, res){
	var body = _.pick(req.body, 'description','completed');

	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length == 0) {
		return res.status(400).send()
	}
	body.description = body.description.trim();
	body.id = todo_next_id++;
	todos.push(body);
	res.json(body);
});

////////////////////////////////////////////////////////////////////////////////////////

app.delete('/todos/:id', function (req, res){
	var todo_id = parseInt(req.params.id, 10);
	var matched_todo = _.findWhere(todos, {id:todo_id});
	if(matched_todo){
		todos = _.without(todos, matched_todo);
		res.json(matched_todo);
	}else{
		res.status(404).json("error: no todo found with that id");
	}

})

//////////////////////////////////////////////////////////////////////////////////////

app.put('/todos/:id', function ( req, res){
	var body = _.pick(req.body, 'description','completed');
	var valid_attributes = {};
	var todo_id = parseInt(req.params.id, 10);
	var matched_todo = _.findWhere(todos, {id:todo_id});

	if(!matched_todo){
		return res.status(404).send();
	}

	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
		valid_attributes.completed = body.completed;
	}else if(body.hasOwnProperty('completed')){
		return res.status(400).send();
	}

	if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
		valid_attributes.description = body.description;
	}else if (body.hasOwnProperty('description')){
		return res.status(400).send();
	}

	_.extend(matched_todo, valid_attributes);
	res.json(matched_todo);


});


/////////////////////////////////////////////////////////////////////////////////////////
app.listen(PORT, function (){
	console.log('Express listening on port '+ PORT);
});

