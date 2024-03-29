# Vert Finance Frontend

## Welcome
Hi, thanks for taking a look at the Vert Finance Frontend repository. Vert Finance is a web-based decentralized application that lets you convert almost any cryptocurrency to fiat in your bank account. It's currently built to support only cryptocurrency to the Nigerian Naira conversions on BNB Smart Chain. Check out [this piece](https://nonseodion.medium.com/architecture-of-a-fiat-to-cryptocurrency-exchange-c65a6c233a2c) to find out more about Vert Finance.

This is the Smart Contract Repo. You can also have a look at the frontend and backend repos.

### [Backend](https://github.com/nonseodion/vert-backend)

### [Smart Contract](https://github.com/nonseodion/vert-router)

## Architecture

![Frame 7](https://github.com/nonseodion/vert-ui/assets/38128301/15e399bf-2af8-47c4-a02a-464c25aa8b97)

From the diagram above, a user selects the token he wants to exchange and enters the amount. He can enter the amount directly in Naira or as the token amount. The exchange rate for any token he picks is fetched from Pancakeswap and the latest USD/NGN rate is fetched from the backend. These are used to generate the adjacent input on the Converter UI. On the next page, he is prompted to enter his account number and bank name. His account name is resolved using the backend. After he confirms the transaction a blockchain transaction is initiated that swaps his token to a stablecoin and sends it to Vert Finance Address. The frontend waits for 7 block confirmations before instructing the backend to send Naira to the user's account. Depending on the validity of the swap transaction and the status of the bank transaction, the backend sends a transaction successful feedback or error to the frontend which is shown to the user.

## Tools & Libraries

The frontend was built using Reactjs, [WAGMI](https://book.getfoundry.sh/), [socket.io](https://socket.io), [Typescript](https://www.typescriptlang.org), Uniswap's [redux-multicall](https://github.com/Uniswap/redux-multicall) and [Jotai](https://jotai.org/). 

### Jotai
  Jotai is a state management library like Redux that makes it easy to manage the state easily without much setup, unlike Redux. It uses hooks and can separate each part of the state instead of having a global store. It's used to manage tokens, exchange and balances state. 

### Redux-Multicall
Uniswap's Redux-Multicall allows you to make multiple read calls to the blockchain. It can handle a very large number of calls, unlike other common multicall libraries. It is used to fetch user balances of multiple tokens at the same time from the blockchain.

### WAGMI 
Wagmi is a Web3 library that provides react hooks to help perform common Web3 calls like fetching token balances and calling contracts.

## Contributing or Using the code

A good place to start from if you want to use the code or contribute is to set it up locally and walk your way from the pages folder to whatever function or method you need.

## How to Setup Locally

1. Open your terminal and clone the github repo to your local machine with `git clone https://github.com/nonseodion/vert-ui.git`.
2. Change the current directory of the terminal to vert-ui with `cd vert-ui`.
3. Make sure you have yarn installed and then install all the dependencies with `yarn`.
4. Add a .env file and set the  `REACT_APP_BACKEND_URL` variable to the Vert backend url. Check the setup section of the Vert backend to set it up.
5. Run `yarn start` to start the Vert UI locally on your machine.
