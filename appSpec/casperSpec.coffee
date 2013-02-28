casper = require('casper')
browser = casper.create()
myAccount = "http://localhost:3000"

browser.start myAccount

browser.then -> 
    this.test.assertTextExists('Hello')

browser.thenEvaluate ->
    BDD.startTask('testing')

browser.wait(1000)

browser.thenEvaluate ->
	BDD.stopCurrentTask()

browser.then ->
	this.test.assertTextExists(2)
	this.test.assertTextExists('testing')

browser.run ->
    this.exit()
