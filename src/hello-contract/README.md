# A simple contract application built with node.js #


## Steps ## 

1. install web3: npm install ethereum/web3.js
2. run private Ethereum blockchain: http://www.digitalatomindustry.com/install-run-private-ethereum-blockchain/
3. 


## Sources ##

1. http://digitalatomindustry.com/connect-nodejs-app-ethereum-blockchain-using-web3-js-library/	
2. https://www.wolfe.id.au/2014/02/01/getting-a-new-node-project-started-with-npm/
3. https://hackernoon.com/heres-how-i-built-a-private-blockchain-network-and-you-can-too-62ca7db556c0


## Commands ##

1. start node console: node
2. run dev ethereum network:  geth --dev --rpc --ipcpath ~/Library/Ethereum/geth.ipc --datadir path/to/data console
3. run private blockchain with:
	1. geth --nodiscover --datadir data --networkid 123 init genesis.json 
	2. geth --identity "myNode" --datadir path/to/data --networkid 123 --nodiscover --maxpeers 0 --rpc --rpcapi 'web3,eth,admin,personal,shh,debug' --rpcaddr '127.0.0.1' --rpcport 8545 --rpccorsdomain '*' console
4. run javascript file: node index.js

