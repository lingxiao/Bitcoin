/**
    @file: app_pingEther.js
    @author: Xiao Ling <lingxiao@seas.upenn.edu>
    @date: 1/7/2018
    @Note: web application that interacts with ethereum, pings blockchain and returns data

    set up server using express

    problem: right now there is a package setup problem... may behoove
    me to slow down and do it right once again?

    problem: right now the stuff is very confusing, maybe set up a new 
    minimal application? but then you get all this shit ... 
    what if I installed it here.. get it working here. and then transfer over?
    
    strategy:

        1. serve simple html    -> done

        2. serve more complex html and do some event listeners  -> done
            -> need a plug in the html
            -> need to serve the html, and attach listeners to each plug

        3. connect Voting.js to this somehow, make sure the ether-blockchain is updating
            -> at this point we can do a simple simpleStorage.js   -> not done
            -> build one where we just display the current user's account, and it should go up as coins are mined -> done

            -> we just have to know how various part of the thing interacts -> done
                -> there are two processes going on here, the node.js process
                    and the pipe into the ethereum blockchain process

        3. need to know the canonical way to factorize the code into differnt files -
*/ 
import * as Web3     from 'web3'     ; 
import * as express  from 'express'  ;
import * as socketIO from 'socket.io';
import * as http      from 'http'    ;
const pr = require("../lib/prelude") ;

const CLIENT_PATH = '/Users/lingxiao/Documents/Projects/Bitcoin/src/hello-contract/client';

var app    = express();
var server = http.Server(app);
var io     = socketIO(server);
var web3   = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8546'));

app.get('/', (req,res) => {
    res.send("HOME!")
});

// subscriber to first process
app.get('/index-1', (req,res) => {
    res.sendFile(CLIENT_PATH + '/index-1.html');
});

// subscriber to second process
app.get('/index-2', (req,res) => {
    res.sendFile(CLIENT_PATH + '/index-2.html');
});

app.get('/transfer-fund', (req, res) => {
    /**
        on load, unlock account and transfer fund
    */
    web3.eth.getAccounts().then(accounts => { transfer_funds(accounts) });
    res.send("transfering fund ... ")
});

/**
    @Use: Given list of user accounts of lenght at least two, transfer
          ether from user-1 to user-2. where user-1 is coinbase
    @Input: accounts :: [String]
*/
function transfer_funds(accounts){

    var sender   = accounts[0];
    var receiver = accounts[1];

    web3.eth.personal.unlockAccount(sender  , 'password-1');
    web3.eth.personal.unlockAccount(receiver, 'password-2');

    web3.eth.sendTransaction({from: sender, to: receiver, value: 500000});

    console.log("****** sent ether from " + sender + " to " + receiver + " **********");
}


// a dummy process that is meant to dummy what's on the backend
setInterval(() => {

    var msg = `Random message from backend with signature ${Math.floor(Math.random()*100)}`
    io.emit('message-2', msg)
    console.log("emitted message: "+ msg)
}, 5000);


// web3 account
web3.eth.getAccounts().then(accounts => {
    display_account(accounts)
});


function display_account(accounts){

    var user_0 = accounts[0];
    var user_1 = accounts[1];

    web3.eth.subscribe('newBlockHeaders', (err, ret) => {

        if (err) { 
            
            console.log("error: ", err)

        } else {

            /**
                todo: get rid of this nested callback
            */ 
            web3.eth.getBalance(user_0).then(bal_0 => {

                web3.eth.getBalance(user_1).then(bal_1 => {

                    /**
                        todo: make this a JSON
                    */
                    var msg1 = 'Balance for user ' + user_0 + ' is ' + bal_0
                    var msg2 = 'Balance for user ' + user_1 + ' is ' + bal_1
                    var msg  = msg1 + '\n\n' + msg2
                    io.emit('message-1', msg)
                    console.log('emitted message: ', msg)

                })

            })

        }

    })
}

// use this instead of app.listen
server.listen(3000, () => { console.log("listening on 3000") });
