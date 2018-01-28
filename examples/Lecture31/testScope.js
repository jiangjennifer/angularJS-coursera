function Human() {
	this.name = "Jenn";
	this.printName = () => {
		console.log("this name is: ", this.name);
		console.log("this is:", this);
	}
	this.getName = function() {
		console.log("get name without arrow fn is:" + this.name);
		console.log("this is:" , this);
	}
}

var Jen = new Human();
var print = Jen.printName;
print();
var get = Jen.getName;
get();
console.log("Windows' name:", Window.name)

function Person() {
  this.fullName = "Yaakov";
  this.fav = "Cookies";

  this.describe = function () {
    console.log('this is: ', this);
    console.log(this.fullName + " likes " + this.fav);
  };
}

var yaakov = new Person();
yaakov.describe();

var describe = yaakov.describe;
describe();
describe.call(yaakov);
