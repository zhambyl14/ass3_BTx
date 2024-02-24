// https://eth-goerli.g.alchemy.com/v2/FM8KUMU2NbVjrcxYCxmmWs394ySbfoxN
// require('@nomicfoundation/hardhat-toolbox')
require('@nomiclabs/hardhat-waffle')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url:
        'https://eth-goerli.g.alchemy.com/v2/FM8KUMU2NbVjrcxYCxmmWs394ySbfoxN',
      accounts: [
        '6b8643cf33b8611136b88865207c4355e9579eb24d763092fdd423fca0fd7e30',
      ],
    },
  },
}
