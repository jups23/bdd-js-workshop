var BDD = BDD || {};

(function(BDD, undefined){

	var createApp = function(){
            var taskService = new BDD.TaskService();
            var app = new BDD.App(taskService);
            app.messageWidget = new BDD.Widgets.Message('greeting', $('body'));
	    return app;
	}

	BDD.Factory = BDD.Factory || {};
	BDD.Factory.createApp = createApp;

}(BDD));
