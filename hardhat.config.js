// hardhat.config.js
const { infuraProjectId, mnemonic } = require('./secrets.json');

require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers')
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {

  networks: { 
    goerli: {
      url: `https://goerli.infura.io/v3/${infuraProjectId}`,
      accounts: {mnemonic: mnemonic}
    },
  },

  solidity: "0.8.9"
};