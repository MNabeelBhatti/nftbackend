
const Web3 = require('web3');
// Connect to an Ethereum provider
const web3 = new Web3('https://ropsten.infura.io/v3/dd88f8080b84475483fd37d0216cae35');


const contractABI = require('./path/to/Marketplace.json'); // Replace with the actual path to the contract ABI JSON file
// Contract address on the Ethereum network
const contractAddress = '0x42E768B540985a5410b4A716Ad3819509cf69A71'; // Replace with the actual contract address
// Create a contract instance
const marketplaceContract = new web3.eth.Contract(contractABI, contractAddress);

const totalTokensMinted = await marketplaceContract.methods.getNumberOfTokensMinted().call();
console.log('Total tokens minted:', totalTokensMinted);


const name = 'My NFT';
const tokenURI = 'https://example.com/nft';
const price = web3.utils.toWei('1', 'ether');


// Mint the NFT
await marketplaceContract.methods.mintNFT(name, tokenURI, price).send({ from: 'YOUR_WALLET_ADDRESS', gas: 5000000 });


const tokenId = 1;
// Buy the token
await marketplaceContract.methods.buyToken(tokenId).send({ from: 'YOUR_WALLET_ADDRESS', value: price, gas: 5000000 });

export {
  totalTokensMinted,
}