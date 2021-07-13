var ES = require('../elasticSearch/connect.js');

function getByPrice(city, type, postcode){

  switch(type) {
    case "detached": type = 'D'
    break;
    case "semi-detached": type = 'S'
    break;
    case "flat": type = 'F'
    break;
    case "bungalow": type = 'O'
    break;
    case "terraced": type = 'T'
    break;
    default: type="undefined"
  }
  const promise = new Promise((resolve, reject) => {
    ES.search({
      index: city,
      type: 'property_sales',
      body: {
        sort : [
           { date : {"order" : "asc"}},
         ],
           size: 10000,
         query: {
           bool: {
           must: [
           { match: { postcode: postcode}},
            { match: { type: type}}
          ],
         },
         }
      }
    },(error, response, status)=> {
        if (error){
          console.log("search error: "+error);
          reject(error);
        }
        else {
          data = [];

          response.hits.hits.forEach(hit=>{
            let sale = {
              date: hit._source.date,
              price : hit._source.price,
              postal_code: hit._source.postal_code,
              type: hit._source.type
            }
            data.push(sale);
            resolve(data);
          });
        }
    });
  });

  return promise; // promise
}

module.exports = getByPrice;
