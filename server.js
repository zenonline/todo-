var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000
var todos =[{
	id:1,
	description: "Eat some food",
	completed: false
},{
	id:2,
	description: "have a bath",
	completed: false
},{
	id:3,
	description: "sleep",
	completed: true
}]

app.get('/', function (req, res){
	res.send('Todo API Root');
});


app.get('/todos', function (req, res){
	res.json(todos);
});

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
app.listen(PORT, function (){
	console.log('Express listening on port '+ PORT);
});