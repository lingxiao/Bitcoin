/**
	@file: app_vote.js
	@author: Xiao Ling <lingxiao@seas.upenn.edu>
	@date: 1/7/2018
	@Note: web application that interacts with ethereum
*/

const Web3       = require("web3");
const path       = require("path");
const pr         = require("../prelude");
const express    = require("express");
const bodyParser = require("body-parser");

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
            -> at this point we can do a simple voting.js connection
                -> build one where we just vote for Obama

            -> we just have to know how various part of the thing interacts
                -> there are two processes going on here, the node.js process
                    and the pipe into the ethereum blockchain process



        4. make a express boiler plate app and migrate to it
        5. integrate it into a bootstrap template for presentation sake
        6. Think about how it could be integrated into a mobile phone
*/
// launch app
var app = express()

app.use(bodyParser.urlencoded({ extended: false }));

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

// note we can chain callbacks
}, function(req, res){

    console.log("hello world from /hello route")

});

// now serve a page with fields in it, and using post to listen for events
app.get("/form", (req, res) => res.sendFile(template_dir + "/post.html"));

// this will get the information into the backend
app.post("/submit-student-data", function(req, res){
    var name = req.body.firstName + " " + req.body.lastName;
    res.send(name + " submitted successfully!")
});


// now we want to interact with the xxx.html so that events are heard in the back

// look for pub-sub primitives, not callback stuff in documentation

// run the server
app.listen(3000, () => console.log("web app listening on port 3000"));


