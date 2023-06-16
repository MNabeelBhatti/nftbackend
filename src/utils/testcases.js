const Marketplace = artifacts.require('Marketplace');

contract('Marketplace', (accounts) => {
  let marketplace;

  beforeEach(async () => {
    marketplace = await Marketplace.new();
  });

  it('should mint a new NFT', async () => {
    const name = 'MyNFT';
    const tokenURI = 'https://example.com/token';
    const price = 100;

    await marketplace.mintNFT(name, tokenURI, price);
    const totalTokensMinted = await marketplace.getNumberOfTokensMinted();

    assert.equal(totalTokensMinted, 1, 'Total number of tokens minted should be 1');

    const tokenOwner = await marketplace.getTokenOwner(1);
    assert.equal(tokenOwner, accounts[0], 'Token owner should be the contract deployer');

    const tokenURIResult = await marketplace.getTokenMetaData(1);
    assert.equal(tokenURIResult, tokenURI, 'Token URI should match the provided URI');

    const totalTokensOwned = await marketplace.getTotalNumberOfTokensOwnedByAnAddress(accounts[0]);
    assert.equal(totalTokensOwned, 1, 'Total number of tokens owned by deployer should be 1');

    const tokenExists = await marketplace.getTokenExists(1);
    assert.equal(tokenExists, true, 'Token should exist');
  });

  it('should allow buying and selling NFTs', async () => {
    const seller = accounts[0];
    const buyer = accounts[1];
    const name = 'MyNFT';
    const tokenURI = 'https://example.com/token';
    const price = 100;

    await marketplace.mintNFT(name, tokenURI, price);
    const tokenId = 1;

    await marketplace.toggleForSale(tokenId);
    const nftIdsForSale = await marketplace.getNFTIds(seller);

    assert.equal(nftIdsForSale.length, 1, 'Seller should have 1 NFT for sale');

    await marketplace.buyToken(tokenId, { from: buyer, value: price });

    const newTokenOwner = await marketplace.getTokenOwner(tokenId);
    assert.equal(newTokenOwner, buyer, 'Token should be owned by the buyer');

    const totalTokensOwnedByBuyer = await marketplace.getTotalNumberOfTokensOwnedByAnAddress(buyer);
    assert.equal(totalTokensOwnedByBuyer, 1, 'Total number of tokens owned by the buyer should be 1');

    const totalTokensOwnedBySeller = await marketplace.getTotalNumberOfTokensOwnedByAnAddress(seller);
    assert.equal(totalTokensOwnedBySeller, 0, 'Total number of tokens owned by the seller should be 0');
  });

  it('should change the price of an NFT', async () => {
    const name = 'MyNFT';
    const tokenURI = 'https://example.com/token';
    const price = 100;
    const newPrice = 200;

    await marketplace.mintNFT(name, tokenURI, price);
    const tokenId = 1;

    await marketplace.changeTokenPrice(tokenId, newPrice);

    const nft = await marketplace.allNFTs(tokenId);
    assert.equal(nft.price, newPrice, 'Token price should be updated to the new price');
  });

  it('should list and unlist an NFT', async () => {
    const name = 'MyNFT';
    const tokenURI = 'https://example.com/token';
    const price = 100;

    await marketplace.mintNFT(name, tokenURI, price);
    const tokenId = 1;

    await marketplace.listNFT(tokenId);
    let nft = await marketplace.allNFTs(tokenId);
    assert.equal(nft.forSale, true, 'Token should be listed for sale');

    await marketplace.toggleForSale(tokenId);
    nft = await marketplace.allNFTs(tokenId);
    assert.equal(nft.forSale, false, 'Token should be unlisted from sale');
  });

  it('should change platform fees by the admin', async () => {
    const admin = accounts[0];
    const newFees = 5;

    await marketplace.changeplatformFees(newFees, { from: admin });
    const platformFees = await marketplace.platform_fees();

    assert.equal(platformFees, newFees, 'Platform fees should be updated to the new fees');
  });
});
