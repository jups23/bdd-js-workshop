var BDD = BDD || {};

(function(BDD, undefined){

	// Private objects:

	function Cat(){
		this.kilos = 1;
		this.feed = function(){
			this.kilos++;
		};

		this.isPurring = function(){
			return true;
		};
	}

	////////////////////////////////

	function Lion(energy){
		Cat.call(this); // inheritance

		this.energy = energy || 100;
		var self = this;

		var run = function(){ // private method
			self.energy -= 10;
		};
		var attack = function(){ // private method
			self.energy -= 5;
		};
		this.playWithFriend = function(friend){
			if (friend.isPurring())
				self.energy += 10;
		};
		this.hunt = function(){ // public method
			run();
			attack();
			this.onHunting(); // fire event
		};
		this.onHunting = function(){ /* event */ }
	}	

	////////////////////////////////

	function EventBus(){
	  var subscribersInfo = [];

	  this.addSubscriber = function(callback){
	      var eventNames = [].slice.call(arguments).slice(1);
	      subscribersInfo.push({
	        subscriber: callback, eventNames: eventNames});
	  };

	  this.emit = function(eventName, eventArgs){
	      for(var i = 0, len = subscribersInfo.length; i < len; i++){
	          var info = subscribersInfo[i];
	          for (var j = 0, lenj = info.eventNames.length; j < lenj; j++){
	              if (info.eventNames[j] == eventName)
	                  info.subscriber(eventName, eventArgs);
	          }
	      }
	  };
	}

	/////////////////////////////////

	function Account(balance){
		this.initialBalance = balance;
	}
	Account.prototype.balance = function(){
		return this.initialBalance;
	};


	/////////////////////////////////

	// Making objects public:

	BDD.Cat = Cat;
	BDD.Lion = Lion;
	BDD.EventBus = EventBus;
	BDD.Account = Account;

}(BDD));

// to be used with Node:
if (typeof(exports) != 'undefined')
   exports.BDD = BDD;
