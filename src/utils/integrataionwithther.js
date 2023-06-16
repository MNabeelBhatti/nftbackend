const ethers = require('ethers');
const contractAbi = [
  // Add the ABI of your ERC721 contract here
];

// Connect to the Ethereum network using Infura
const provider = new ethers.providers.InfuraProvider('ropsten', '<YOUR_INFURA_PROJECT_ID>');

// Set up the signer with your private key
const privateKey = '<YOUR_PRIVATE_KEY>';
const wallet = new ethers.Wallet(privateKey, provider);

// Create a contract instance
const contractAddress = '<YOUR_CONTRACT_ADDRESS>';
const contract = new ethers.Contract(contractAddress, contractAbi, wallet);

// Mint a new NFT
async function mintNFT(name, tokenURI, price) {
  const tx = await contract.mintNFT(name, tokenURI, price);
  await tx.wait();
  console.log('NFT minted successfully!');
}

// Buy an NFT
async function buyToken(tokenId) {
  const tx = await contract.buyToken(tokenId, { value: ethers.utils.parseEther('0.1') });
  await tx.wait();
  console.log('NFT purchased successfully!');
}

// Change the price of an NFT
async function changeTokenPrice(tokenId, newPrice) {
  const tx = await contract.changeTokenPrice(tokenId, newPrice);
  await tx.wait();
  console.log('NFT price changed successfully!');
}

// Toggle the sale status of an NFT
async function toggleForSale(tokenId) {
  const tx = await contract.toggleForSale(tokenId);
  await tx.wait();
  console.log('NFT sale status toggled successfully!');
}

// Get the owner of an NFT
async function getTokenOwner(tokenId) {
  const owner = await contract.getTokenOwner(tokenId);
  console.log('NFT owner:', owner);
}

// Get the metadata of an NFT
async function getTokenMetaData(tokenId) {
  const metadata = await contract.getTokenMetaData(tokenId);
  console.log('NFT metadata:', metadata);
}

// Get the total number of tokens minted
async function getNumberOfTokensMinted() {
  const count = await contract.getNumberOfTokensMinted();
  console.log('Total tokens minted:', count.toString());
}

// Get the total number of tokens owned by an address
async function getTotalNumberOfTokensOwnedByAnAddress(address) {
  const count = await contract.getTotalNumberOfTokensOwnedByAnAddress(address);
  console.log('Total tokens owned by', address, ':', count.toString());
}

// Check if an NFT exists
async function getTokenExists(tokenId) {
  const exists = await contract.getTokenExists(tokenId);
  console.log('NFT exists:', exists);
}

// Change the platform fees (onlyAdmin function)
async function changePlatformFees(fees) {
  const tx = await contract.changeplatformFees(fees);
  await tx.wait();
  console.log('Platform fees changed successfully!');
}

// Example usage
mintNFT('MyNFT', 'https://example.com/tokenURI', ethers.utils.parseEther('1'));
buyToken(1);
changeTokenPrice(1, ethers.utils.parseEther('2'));
toggleForSale(1);
getTokenOwner(1);
getTokenMetaData(1);
getNumberOfTokensMinted();
getTotalNumberOfTokensOwnedByAnAddress('<YOUR_ADDRESS>');
getTokenExists(1);
changePlatformFees(4);
