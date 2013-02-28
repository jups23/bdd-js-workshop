describe("the widgets", function(){
	var container;

	beforeEach(function(){
		container = $('<div>', {id: 'theTestContainer'});
		container.appendTo($('body'));
	});

	afterEach(function(){
		container.remove();
	})

	describe("the MessageWidget", function(){
		var widget, msg, elementId;
		beforeEach(function(){
			elementId = 'someElementId';
			widget = new BDD.Widgets.Message(elementId, container);
			msg = "this is a test for the widget, bla bla bla";
		});

		it("is rendered inside the container", function(){
			widget.show();

			expect(container.html()).toContain(elementId);
		});

		it("does not need a DOM element to render a message in the page", function(){
			widget.show(msg);

			expect(container.html()).toContain(msg);
		});

		it("use the existing DOM element if any", function(){
			var newId = 'someRandomElement';
			var element = $('<div>', {id: newId});
			element.appendTo(container);
			expect(container.html()).toContain(newId);
			expect(container.html()).toContain('div');

			widget = new BDD.Widgets.Message(newId, container);
			widget.show(msg);

			expect(element.html()).toContain(msg);
		});

		it("uses the same DOM element to render all the messages", function(){
			var msg2 = "anotherGreatMessage bli bli bli";
			
			widget.show(msg);
			widget.show(msg2);

			expect($('body').html()).not.toContain(msg);
			expect($('body').html()).toContain(msg2);
		});	
	});
});