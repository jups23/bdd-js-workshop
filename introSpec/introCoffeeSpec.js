// Generated by CoffeeScript 1.5.0
(function() {

  describe("Some basic CoffeeScript", function() {
    it("can define functions", function() {
      var add;
      add = function(arg1, arg2) {
        return arg1 + arg2;
      };
      return expect(add(1, 2)).toBe(3);
    });
    return it("can define classes", function() {
      var dog;
      dog = new BDD.Dog('black');
      return expect(dog.color).toBe('black');
    });
  });

}).call(this);
