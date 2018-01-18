\## source: http://www.digitalatomindustry.com/install-run-private-ethereum-blockchain/

# How to install and run a private Ethereum Blockchain
How to install and run an ethereum blockchain in virtualbox
In this tutorial we’re going to cover how to install and run a private Ethereum blockchain on Ubuntu ( Lubuntu 17.04 64-bit) executed in Virtualbox.

ethereum
Software required

VirtualBox
Lubuntu 17.04 64-bit
Ethereum ( Official repository on github )
We suggest you to install the Ethereum Blockchain in a clean environment in order to avoid conflicts with other softwares installed. In this tutorial we’re going to use a Lubuntu v17.04 to run and install Ethereum. It’s necessary to use 64-bit version to avoid memory problems ( with 32-bit version we encountered an out of memory error).

PART 1 –  INSTALL GETH

Let’s start. From terminal type:

sudo apt-get install software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install ethereum
If everything has worked out, at this point we have the Ethereum client installed in the operating system.

PART 2 – SET UP THE PRIVATE BLOCKCHAIN

The connections between nodes are accepted only if peers have the same protocol version and network ID. As first thing we need to create the genesis.json that will be the initial block for the our private blockchain.

{
    "config": {
        "chainId": 777,
        "homesteadBlock": 0,
        "eip155Block": 0,
        "eip158Block": 0
    },
    "difficulty": "131072",
    "gasLimit": "2100000",
    "alloc": {}
}

 	
 	
If you are using Raspberry Pi, you must convert the difficulty and gasLimit to hexadecimal format. (“0x…..”)

We can use different value of “difficulty” to increase or decrease the velocity of mining. Setting a low value will increase the mining speed.
Once the genesis.json has been created we have to initialize the blockchain. To do this we’re going to launch the following command from terminal:

```
geth --nodiscover --datadir <your_path>/myPrivateChain --networkid 123 init <your_path>/genesis.json
```


Flags:

–nodiscover makes the node not discoverable from the network.
 –datadir flag sets the blockchain’s folder.
–networkid sets the network identifier.

Commands

init bootstrap and initialize a new genesis block
After the blockchain has been initialized we can connecting to the console by using the command:

```
geth --identity "node" --nodiscover --maxpeers 0 --datadir /Users/lingxiao/Documents/Projects/Bitcoin/src/ether-2/data --networkid 123 console

```

[my addition to open a port for node.js process]

if we want to expose a port for other process (ie node.js) to read from, do:

```
geth --identity "myNode" --datadir data --networkid 123 --nodiscover --maxpeers 0 --rpc --rpcapi 'web3,eth,admin,personal,shh,debug' --rpcaddr '127.0.0.1' --rpcport 8545 --rpccorsdomain '*' console
```

if we want to expose a websocket instead of http connection:

```
 geth --identity "node" --nodiscover --maxpeers 0 --datadir /Users/lingxiao/Documents/Projects/Bitcoin/src/ether-2/data --wsapi db,eth,net,web3,personal,web3  --networkid 123 --ws --wsport 8546 --wsorigins "*"  console
 ```

note we have to specify ```wspai``` so that we can access the accounts from ```node.js```

[end my addition to open a port for node.js process]


At this point we are connected to the Ethereum console. To test if our blockchain works properly, we can try to create two different accounts and execute a transaction between them so that 1 ether will be transferred from account_0 to account_1. Follow the instructions:

personal.newAccount("password").
Create the first account by setting the password “password”. The output of this command will be the address of the first account.

personal.newAccount("password").
Create the second account by setting the password “password”. The output of this command will be the address of the second account.

 eth.getBalance(eth.accounts[0]).
Get the balance in Wei of the account_0.

eth.getBalance(eth.accounts[1]).
Get the balance in Wei of the account_1.

miner.setEtherbase(eth.accounts[0]).
This will set the account_0 as the default account where revenues from mining will be stored.

miner.start(1).
With this command the node will start to mining ether. Wait a few minutes to create new blocks and earn some ethers. You can type again the command 3 to view the balance.

personal.unlockAccount(eth.accounts[0],"password").
Unlock the account to permit the transaction.

eth.sendTransaction({from:eth.accounts[0],to:eth.accounts[1],value:web3.toWei(1,"ether")}).
Execute the transaction to transfer 1 ether from account_0 to account_1. To visualize the updated balance you must wait that a new block containing the transactions is created and accepted by the blockchain.

web3.fromWei(eth.getBalance(eth.accounts[1]),"ether").
Display the balance of the account_1 in ether.

miner.stop().
Stop mining.

Congrats! You have just created a private Ethereum blockchain and executed a transaction.

Did you find this tutorial useful?

Give us your feedback!

 

Support us by donating    

1QBTurJGgYgFYwnJUmV7j4TwDyaPJgbRJA

 1+
14/08/2017
DAIndustry	
Contact us
 	
Licenza Creative Commons
Creative Commons License.

Go to Top
We use cookies to ensure that we give you the best experience on our website. If you continue to use this site we will assume that you are happy with it.Ok