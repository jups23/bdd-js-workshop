class Dog
	constructor : (@color) ->


if (typeof(window) != 'undefined')
   window.BDD or= {}
   window.BDD.Dog = Dog

if (typeof(exports) != 'undefined')
   exports.BDD = {Dog: Dog}

