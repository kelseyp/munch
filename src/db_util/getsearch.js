const model_city = require('./dbo.js')


(async () => {
    var cities = await model_city.findAll({
        where: {
            name: 'Camarillo'
        }
    });
    console.log('find ${items.length} cities:');
    for (let p of cities) {
        console.log(JSON.stringify(p));
    }
  })()
  