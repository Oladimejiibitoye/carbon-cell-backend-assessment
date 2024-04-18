const { BadRequestError} = require("../helpers/errors");
const DataRetrivalRepository = require("../repository/data-retrival");


class DataRetrivalService {
  constructor(DataRetrivalRepository){
    this.DataRetrivalRepository = DataRetrivalRepository;
  }


  async dataRetrivalService(query){
    const {category, page, size} = query;
    const data = await this.DataRetrivalRepository.retriveDataFromPublicAPI()
    return this.filterAndPaginateByCategory(data, category, size, page)
  }

  async filterAndPaginateByCategory(data, category, size, page) {

    const pageSize =  parseInt(size) || 0
    const pageNumber = parseInt(page) || 10

    if(!category){
      return data
    }
    // Filter the data by category
    const filteredData = await Promise.all(data.entries.map(item => item.Category.toLowerCase() === category.toLowerCase()));
    console.log(filteredData)
    const filteredDataWithoutNull = await filteredData.filter(item => item !== null)
    // Calculate pagination
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredDataWithoutNull.slice(startIndex, endIndex);

    return {count: paginatedData.length, entries: paginatedData};
  }
}

module.exports = new DataRetrivalService(DataRetrivalRepository)