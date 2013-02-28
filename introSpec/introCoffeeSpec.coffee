describe "Some basic CoffeeScript", ->
	it "can define functions", ->
		add = (arg1, arg2) ->
			arg1 + arg2
		expect(add(1,2)).toBe(3);

	it "can define classes", ->
		dog = new BDD.Dog 'black'
		expect(dog.color).toBe('black')






