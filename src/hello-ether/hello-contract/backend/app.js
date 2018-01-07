/**
	@file app.js
	@author Xiao Ling <lingxiao@seas.upenn.edu>
	@date 1/3/2018
	@Note: this hangs when running console with node app.js
*/

const Web3    = require("web3");
const path    = require("path");
const pr      = require("../prelude");
const express = require("express");

var web3 = new Web3();

// hard code it for now
var template_dir = "/Users/lingxiao/Documents/Projects/Bitcoin/src/hello-ether/hello-contract/frontend"

/**
    set up server using express

    problem: right now there is a package setup problem... may behoove
    me to slow down and do it right once again?

    problem: right now the stuff is very confusing, maybe set up a new 
    minimal application? but then you get all this shit ... 
    what if I installed it here.. get it working here. and then transfer over?
    
    strategy:
        1. serve simple html    -> done
        2. serve more complex html and do some event listeners 
            -> need a plug in the html
            -> need to serve the html, and attach listeners to each plug
            -> need to know the canonical way to factorize the code into differnt files

        3. connect Voting.js to this somehow, make sure the ether-blockchain is updating
        4. make a express boiler plate app and migrate to it
        5. integrate it into a bootstrap template for presentation sake
        6. Think about how it could be integrated into a mobile phone
*/
// launch app
var app = express()

app.use(express.static("voting"))

// URL map to resource
app.get("/"        , (req, res) => res.send("hello world!!!"             ));
app.get("/about"   , (req, res) => res.send("hello from about page"      ));
app.get("/contact" , (req, res) => res.send("contact me at mememe@me.com"));

// now we want to serve an xxx.html 
app.get("/hello"  , function(req, res, next){

    // using absolute file path, need to get relative file path somehow
    res.sendFile(template_dir + "/hello.html");
    next()

    // as a simple thing, should be able to redirect to a different place
    // on loading

}, function(req, res){

    console.log("hello world from /hello route")
});

// now serve a page with fields in it, and using post to listen for events






// now we want to interact with the xxx.html so that events are heard in the back

// look for pub-sub primitives, not callback stuff in documentation

// run the server
app.listen(3000, () => console.log("web app listening on port 3000"));


