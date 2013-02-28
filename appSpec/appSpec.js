describe("the programmatic interface", function(){
	it("asks the task service to start a task", function(){
          var app = BDD.Factory.createApp();

          spyOn(app.taskService, "startTask");

          app.startTask();

          expect(app.taskService.startTask).toHaveBeenCalled();
    });
});
