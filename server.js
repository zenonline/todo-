var express = require('express');
var app = express();
var body_parser = require('body-parser');

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
	res.json(todos);
});

/////////////////////////////////////////////////////////////////////////////

app.get('/todos/:id', function (req, res){
	var todo_id = req.params.id;
	var flag = false;
	for(var i = 0; i< todos.length; i++){
		if (todos[i]['id'] == todo_id){
			flag = true;
			//res.send('description:'+todos[i]['description']+'\n'+'completed:'+todos[i]['completed']);
			res.json(todos[i]);
		}
	}
	if(!flag){
		res.status(404).send();
	}
	//res.send('Asking for todo with id of '+ req.params.id+ req.params.description);
})

///////////////////////////////////////////////////////////////////////////////////

app.post('/todos', function (req, res){
	var body = req.body;
	body.id = todo_next_id++;
	todos.push(body);
	/*todos.push({
		"id": todo_next_id++,
		"description":body.description,
		"completed": body.completed
	});*/
	res.json(body);
	console.log("the todos array:"+todos);
});

////////////////////////////////////////////////////////////////////////////////////////

app.listen(PORT, function (){
	console.log('Express listening on port '+ PORT);
});