//const { Module } = require('module');
const { Sequelize, DataTypes } = require('sequelize');
//const { ModuleResolutionKind } = require('typescript');

const conf = {
  host: '54.237.150.71',
  dialect: 'mysql'
}

const seq = new Sequelize('munch_md', 'root', '123456', conf)


seq.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error: any) => {
  console.error('Unable to connect to the database:', error);
})

//items
const Item = seq.define('item', {
  name: DataTypes.STRING,
  price: DataTypes.DOUBLE,
  description: DataTypes.TEXT
}, { tableName: 'tab_items' });

export async function getDBData(): Promise<any> {

    var items = await Item.findAll();
    // eslint-disable-next-line no-template-curly-in-string
    console.log('find ${items.length} items:');
    //var jsonItems = [];
    for (let p of items) {
      console.log(JSON.stringify(p));
    }
    return items;

};