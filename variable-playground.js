var person = {
	name: 'zen',
	age: 21
};
function update_person(obj){
// 	obj = {
// 		name: 'zen',
// 		age:90

// 	};
obj.age = 90;
 }

update_person(person);
console.log(person);

/////////////////////////////////////

var grades =[15, 21];

function update_array_1 (arr){
	arr = [15,21,45];
}

update_array_1(grades);
console.log(grades);

function update_array_2 (arr){
	arr.push(45);
}
update_array_2(grades);
console.log(grades);