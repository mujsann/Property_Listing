const axios = require('axios')
const ID = process.env.ID;
const KEY = process.env.KEY;

const getListing = (category, city, type, postal_code)=>{
  switch (type) {
    case "detached": type = 'house_detached'
    break;
    case "flat": type = 'flat'
    break;
    case "bungalow": type = 'house_bungalow'
    break;
    case "terraced": type = 'house_terraced'
    break;
    case "semi-detached": type = 'house_semi'
    break;
    default: type="undefined"
  }
  const url = `http://api.adzuna.com/v1/api/property/gb/search/1/?category=${category}&app_id=${ID}&app_key=${KEY}&results_per_page=1000&where=${city}&property_type=${type}`
  const url2 = `http://api.adzuna.com/v1/api/property/gb/search/1/?category=${category}&app_id=${ID}&app_key=${KEY}&results_per_page=1000&property_type=${type}&where=${postal_code}`
  
  if (postal_code){url = url2 }
  return axios.get(constructedURL).then(results => {
      return results.data;
    })
    .catch(err => console.log(err.message))
}

module.exports =  getListing
