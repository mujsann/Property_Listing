var ES = require('../elasticSearch/connect.js');

const getByPostal = (city, postal_code, size)=>{

  const promise = new Promise((resolve, reject) => {
    ES.search({
      index: city,
      type: 'property_sales',
      body: {
           size,
         query: {
           bool: {
           must:
            { match: { postal_code: postal_code}}
         },
         }
      }
    },(err, response, status)=>{
        if (err){
          reject(error);
        }
        else {
          data = [];
          response.hits.hits.forEach((hit)=>{
            let type = {
              postal_code: hit._source.postal_code,
              type: hit._source.type
            }
            data.push(type);
            resolve(data);
          });
        }
    });
  });

  return promise; // promise
}

module.exports = getByPostal;
