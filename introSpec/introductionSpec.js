
// to work with Node:
var BDD = BDD || {};
if (typeof(require) != 'undefined'){
   BDD = require('../intro/intro').BDD;
   BDD.Dog = require('../intro/introCoffee').BDD.Dog;
   var window = global;
}

describe("the tricky yet powerful parts of JavaScript", function(){

	describe("object definitions", function(){
		it("can be an object literal", function(){
			var literal = {name: 'John', surname: 'Connor'};

			expect(literal.name).toEqual('John');
		});

		it("can be a constructor with methods inside", function(){
			var cat = new BDD.Cat();

			expect(cat.isPurring()).toBeFalsy();
		});

		it("can have the methods in the prototype", function(){
			var balance = 20;
			var account = new BDD.Account(balance);

			expect(account.balance()).toEqual(0);
		});

		it("can iterate over object properties", function(){
			var literal = {name: 'John', age: 28};
			var propertyNames = [];
			for(var propName in literal)
				propertyNames.push(propName);

			expect(propertyNames.length).toEqual(2);
		});

		it("can iterate over an array, which is different way of iteration", function(){
			var sequence = [1,3,5,7];
			var sum = 0;
			for (var i = 0, len = sequence.length; i < len; i++)
				sum += sequence[i];

			expect(sum).toEqual(16);
		});
	});

	describe("scopes and closures", function(){
		it("can nest functions to create closures", function(){
			function closure(){
				var somePrivateVar = 5;

				var nested = function(){
					return {
						theValue: somePrivateVar
					};
				};
				return nested;
			}

			var nested = closure();
			expect(nested().theValue).toEqual(5);
		});

		it("doesnt have a private scope inside blocks", function(){
			var j = 0;
			for (var i = 0; i < 5; i++) {
				j += i;
			};

			expect(i).toEqual(5);
			expect(j).toEqual(10);
		});

		it("hoists variables the way you probably dont expect", function(){
			function generate(){
				var functions = [];
				for (var i = 0; i < 5; i++){
					functions.push(function(){
						return i;
					});
				}
				return functions;
			}

			expect(generate()[0]()).toEqual(5);
			expect(generate()[1]()).toEqual(5);
		});

		it("can create methods dynamically on an object instance", function(){
			var cat = new BDD.Cat();
			var methodNames = ['meow', 'jump'];
			for (var i = 0; i < methodNames.length; i++){
				cat[[methodNames[i]]] = function(){ return 'it works';};
			};

			expect(cat.meow()).toEqual('it works');
		});

		it("can have a static method", function(){
			function SomeObject(){
				this.someMethod = function(){};
			};
			SomeObject.someStaticMethod = function(){ return 5};

			var objInstance = new SomeObject();

			expect(objInstance.someStaticMethod).toBe(undefined);
			expect(SomeObject.someStaticMethod()).toBe(5);
		});

		it("can create methods in the object definition", function(){
			function SomeObject(){
				this.someMethod = function(){};
			};
			var methodNames = ['method1', 'method2', 'method3'];
			for (var i = 0; i < methodNames.length; i++){
				SomeObject.prototype[methodNames[i]] = function(){ return 'it works';};
			}
			var objInstance = new SomeObject();

			expect(objInstance.method1()).toEqual('it works');
		});

		it("adds methods dynamically", function(){
			function addMethods(objInstance, numberOfMethods){
				// AS EN EXERCISE, IMPLEMENT THIS METHOD TO MAKE THE TEST PASS
				for (var i = numberOfMethods - 1; i >= 0; i--) {
					(function() {
						var j = i;
						objInstance['dynamicMethod'+j] = function() {return j}
					})();
				};
			};

			var cat = new BDD.Cat();
			addMethods(cat, 5);

			expect(cat.dynamicMethod1()).toEqual(1);
			expect(cat.dynamicMethod2()).toEqual(2);
			expect(cat.dynamicMethod3()).toEqual(3);
		});
	});

	describe("the THIS keyword", function(){
		var cat;

		beforeEach(function(){
			cat = new BDD.Cat();
			window.kilos = 0;
		});

		it("works as expected in other languages", function(){
			cat.feed();
			cat.feed();

			expect(cat.kilos).toEqual(30);
		});

		it("works different on dettached functions", function(){
			window.kilos = 10;
			var feed = cat.feed;

			feed();

			expect(window.kilos).toEqual(11);
			expect(cat.kilos).toEqual(154);
		});

		it("can be bound explicitly with CALL and APPLY", function(){
			var feed = cat.feed;

			feed.apply(cat);

			expect(cat.kilos).toEqual(20);
		});

		it("can be bound in modern browsers with BIND", function(){
			var feed = cat.feed;
			var bound = feed.bind(cat);

			bound();

			expect(cat.kilos).toEqual(12);
		});

		it("works different when function is attached to other object", function(){
			var dog = new BDD.Dog();
			dog.kilos = 10;
			dog.feed = cat.feed;

			dog.feed();
			expect(dog.kilos).toEqual(511);
			expect(cat.kilos).toEqual(14);
		});

		it("can be handled using the SELF trick", function(){
			var energy = 200;
			var lion = new BDD.Lion(energy);

			lion.hunt();

			expect(lion.energy).toEqual(4);
		});

		it("interprest the THIS when the function is executed", function(){
			var energy = 200;
			var lion = new BDD.Lion();

			lion.hunt = function(){
				this.energy = 4000;
			};
			lion.hunt();

			expect(lion.energy).toEqual(1200);
		});
	});

	describe("event driven development", function(){
		// PLEASE READ THIS POST. It contains the theory:
		// http://www.carlosble.com/2013/02/event-oriented-programming-with-javascript/

		it("uses the DOM level 0 traditional model (one2one)", function(){
			var lion = new BDD.Lion();
			var called = false;
			// subscribes to the event:
			lion.onHunting = function(){ called = true;};

			lion.hunt();

			expect(called).toBe(true);
		});

		it("implements the observer pattern (one2many)", function(){
			function Publisher(){
				var observers = []
				this.addObserver = function(observerCallback){
					observers.push(observerCallback);
				};
				this.informAllObservers = function(){
					for(var i = 0; i<observers.length; i++){
						observers[i]();
					}
				};
			}

			var publisher = new Publisher();
			var observer1WasCalled = false;
			var observer1 = function(){ observer1WasCalled = true;};
			var observer2WasCalled = false;
			var observer2 = function(){ observer2WasCalled = true;};
			publisher.addObserver(observer1);
			publisher.addObserver(observer2);

			publisher.informAllObservers();

			expect(observer1WasCalled).toBeTruthy();
			expect(observer2WasCalled).toBeTruthy();
		});

		it("implements the pub/sub pattern (many2many)", function(){
			var eventBus = new BDD.EventBus();
			var eventWasFired = false;
			var handler = function(eventName, eventArgs){
				eventWasFired = true;
				expect(eventArgs.someNumber).toBe(10);
			}
			eventBus.addSubscriber(handler, "someEvent");

			eventBus.emit("someEvent", {someNumber: 10});

			expect(eventWasFired).toBeTruthy();
		});
	});
});

describe("the test doubles", function(){
	var lion;
	beforeEach(function(){
		lion = new BDD.Lion();
	});

	it("spies on methods", function(){
		spyOn(lion, "onHunting");

		lion.hunt();

		expect(lion.onHunting).toHaveBeenCalled();
	});

	it("spies and stubs out the method", function(){
		var lion = new BDD.Lion();
		spyOn(lion, "onHunting").andCallFake(function(arg1){
			expect(arg1).toEqual('whatever');
		});

		lion.hunt();

		expect(lion.onHunting).toHaveBeenCalled();
	});

	it("stubs out a method", function(){
		var energy = 100
		var friend = new BDD.Lion(energy);
		friend.isPurring = function(){ // stub
			return true;
		};

		lion.playWithFriend(friend);

		expect(lion.energy).toEqual(115);
	});

	it('uses both, an actual object and a test spy', function(){
		var max = new BDD.Cat();
		max.isPurring = function(){ // this is a test stub
			return false;
		};
		var tarita = new BDD.Cat();

		function Environment(cat1, cat2){
			this.isQuitted = function(){
			   return cat1.isPurring() && cat2.isPurring();
		    };
		};
		var environment = new Environment(max, tarita);

		expect(environment.isQuitted()).toBe(false);
	});
});

// This exercise is not necessary to attend the tutorial, it's an bonus
// for those who want to practice more TDD in JavaScript
// ******** The Decorator pattern Kata *******************
/*
describe("the decorator pattern using a wrapper", function(){
    function Decorator(innerInstance){
        this.initialize = function(){

        };
    }

    function Original(collaboratorInstance){
        this.work = function(){
            this.onWorking();
            collaboratorInstance.whatever();
        };

        this.onWorking = function(){};
    }

    function Collaborator(){
        this.whatever = function(){};
    }

    it("wraps the original instance exposing its methods", function(){
        var collaborator = new Collaborator();
        spyOn(collaborator, "whatever");
        var original = new Original(collaborator);
        var decorator = new Decorator(original);
        decorator.initialize();
        decorator.work();

        expect(collaborator.whatever).toHaveBeenCalled();
    });

    it("wraps the original instance exposing its methods", function(){
        var collaborator = new Collaborator();
        var original = new Original(collaborator);
        var decorator = new Decorator(original);
        spyOn(decorator, "onWorking");
        decorator.initialize();

        original.work();

        expect(decorator.onWorking).toHaveBeenCalled();
    });
});
*/
