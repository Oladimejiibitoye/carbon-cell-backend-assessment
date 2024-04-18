const axios = require("axios");
const {Url} = require("../helpers/constants/index")

class DataRetrivalRepository {
  constructor(Url){
    this.Url = Url;
  }
  async retriveDataFromPublicAPI() {
    try {
      const res = await axios({
        method: "get",
        url: this.Url,
      });
      return res.data;
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
    
  }

 
}

module.exports = new DataRetrivalRepository(Url)