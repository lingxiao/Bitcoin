/**
	@file app.js
	@author Xiao Ling <lingxiao@seas.upenn.edu>
	@date 1/3/2018
	@Note: this hangs when running console with node app.js
*/

const Web3    = require("web3");
const pr      = require("../prelude");
const path    = require("path")
const express = require("express");

var web3 = new Web3();

/**
    set up server using express

    problem: right now there is a package setup problem... may behoove
    me to slow down and do it right once again?

    problem: right now the stuff is very confusing, maybe set up a new 
    minimal application? but then you get all this shit ... 
    what if I installed it here.. get it working here. and then transfer over?
    
    strategy:
        1. serve simple html
        2. serve more complex html and do some event listeners

*/

// launch app
var app = express()

app.use(express.static("voting"))

// URL map to resource
app.get("/"        , (req, res) => res.send("hello world!!!"));
app.get("/about"   , (req, res) => res.send("hello from about page"));
app.get("/contact" , (req, res) => res.send("contact me at mememe@me.com"));

// now we want to serve an xxx.html 
app.get("/hello"  , function(req, res){

    // using absolute file path, need to get relative file path somehow
    res.sendFile("/Users/lingxiao/Documents/Projects/Bitcoin/src/hello-ether/hello-contract/backend/hello.html");

})

// now serve a page with a button on it, and think about how to get events back



// now we want to interact with the xxx.html so that events are heard in the back

// look for pub-sub primitives, not callback stuff in documentation

// run the server
app.listen(3000, () => console.log("web app listening on port 3000"));




