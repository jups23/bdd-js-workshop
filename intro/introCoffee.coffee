class Dog
	constructor : (@color) ->

class Cat
	constructor : (@color) ->

	isPurring : ->
		false

if (typeof(window) != 'undefined')
   window.BDD or= {}
   window.BDD.Dog = Dog
   window.BDD.Cat = Cat

if (typeof(exports) != 'undefined')
   exports.BDD = {Dog: Dog}
   exports.BDD = {Cat: Cat}

