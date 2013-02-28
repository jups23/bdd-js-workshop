var BDD = BDD || {};

(function(BDD, undefined){

	function MessageWidget(elementId, container){
		var nativeElement = null;

		var bindDOM = function(){
			var existingElement = $('#' + elementId);
			if (existingElement.length > 0)
				nativeElement = existingElement;
			else {
				nativeElement = $('<div>', {id: elementId});
				nativeElement.appendTo(container);
			}
		};

		this.show = function(text){
			if (!nativeElement)
				bindDOM();
			nativeElement.text(text);
		};
	};


	BDD.Widgets = BDD.Widgets || {};
	BDD.Widgets.Message = MessageWidget;

}(BDD));