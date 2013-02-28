var BDD = BDD || {};

(function(){

    // App classes:

    function TaskService(){
       this.startTask = function(){};
    };

    // Programmatic interface:

    function App(taskService){
       this.taskService = taskService;

       this.startTask = function(){

       };
       this.finishCurrentTask = function(){

       };
       this.startUp = function(){
           this.messageWidget.show('app started');
       };
    };

    BDD.App = App;
    BDD.TaskService = TaskService;
}(BDD));
