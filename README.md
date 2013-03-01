This is the skeleton project for the [BDD workshop for RIAs development with JavaScript](https://bitbucket.org/carlosble/bddjsworkshop) by [Carlos Ble](https://bitbucket.org/carlosble).

For more information about the workshop visit http://www.carlosble.com/2013/01/workshop-bdd-for-ria-with-javascript/


Installation instructions:

  - Install node.js: http://nodejs.org/

  - Install express: npm install express

  - Install jade: npm install jade

  - Install chai: npm install chai

  - Install jasmine-node: npm install jasmine-node

  - Install CoffeeScript: sudo npm install -g coffee-script (sudo only for linux users)

  - Compile: build.sh

  - Install CasperJs: for instructions see http://casperjs.org/ (PhantomJs needs to be installed first)


-------------------------------------------------------------


Getting ready for the workshop: (exercises to do before attending)

  - Run the tests in the browser: google-chrome ./introTestRunners/runInBrowser.html

  - Run the tests in the command-line: ./introTestRunners/runWithNode.sh

  - You will see all the tests failing. You have to make them pass, and understand why they do it.

  - Don't worry about jsTestDriver, we will see that during the workshop

  - Try to delete part of the tests or the production code and then try to make them pass again


-------------------------------------------------------------

During the workshop - Starting the application and its tests:

  - Make sure port 3000 is free for the server to run (other servers might be running already)

  - Start the server: node server.js

  - Check that the application is working: google-chrome http://localhost:3000  (make sure you can read, "app started")

  - How to run ACCEPTANCE TESTS: google-chrome http://localhost:3000/test/acceptanceTestRunner.html

  - How to run UNIT TESTS: google-chrome ./appTestRunners/runUnit.html

  - How to run FINE-GRAINED INTEGRATION TESTS: google-chrome ./appTestRunners/runIntegrationTests.html


