import Web3 from 'web3';
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const contractABI =await import(new URL(join(__dirname, "./Marketplace.json"), import.meta.url));

console.log(contractABI);

// const jsonData = fs.readFileSync(filePath, 'utf-8');
// const contractABI = JSON.parse(jsonData);

// const fileUrl = new URL(join(__dirname, "./Marketplace.json"), import.meta.url);
// const contractABI = JSON.parse(await readFileSync(fileUrl, 'utf8'));

// Connect to an Ethereum provider
const web3 = new Web3(
  'https://ropsten.infura.io/v3/dd88f8080b84475483fd37d0216cae35'
);
 // Replace with the actual path to the contract ABI JSON file
// Contract address on the Ethereum network
const contractAddress = '0x42E768B540985a5410b4A716Ad3819509cf69A71'; // Replace with the actual contract address
// Create a contract instance
const marketplaceContract = new web3.eth.Contract(contractABI, contractAddress);

const getNftTokens = async (address) => {
  // Get the balance of NFTs for the given address.
  const balance = await marketplaceContract.methods.balanceOf(address).call();

  let tokens = [];

  // Loop through each NFT and get its data.
  for (let i = 0; i < balance; i++) {
    let tokenId = await marketplaceContract.methods
      .tokenOfOwnerByIndex(address, i)
      .call();
    let tokenURI = await marketplaceContract.methods.tokenURI(tokenId).call();
    tokens.push({ tokenId, tokenURI });
  }

  // Send the NFTs as a response.
  return tokens;
};

export { getNftTokens };

