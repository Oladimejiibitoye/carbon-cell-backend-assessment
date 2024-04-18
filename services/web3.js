const {Web3} = require('web3');
const {ETHEREUM_NODE_URL} = require("../environment/config");
// Create a web3 instance with the Ethereum node URL
const web3 = new Web3(ETHEREUM_NODE_URL);

class Web3Service {
  constructor(web3){
    this.web3 = web3;
  }
  async fetchBalanceService(address) {
    try {
      // Get the balance in wei
      const balanceWei = await this.web3.eth.getBalance(address);

      // Convert the balance from wei to Ether
      const balanceEther = this.web3.utils.fromWei(balanceWei, 'ether');

       return `${balanceEther} Ether`
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
    
  }

 
}

module.exports = new Web3Service(web3)