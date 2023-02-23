const { Sequelize, DataTypes } = require('sequelize');
const { ModuleResolutionKind } = require('typescript');

const conf = {
  host: 'localhost',
  dialect: 'mysql'
}

const seq = new Sequelize('munch', 'root', '123456', conf)


seq.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
})

//model design
//State
const State = seq.define('state', {
  name: DataTypes.STRING,
  short_name: DataTypes.STRING,
  is_deleted: DataTypes.BOOLEAN,
  deletedat: DataTypes.DATE
}, { tableName: 'tab_states' });

//City
const City = seq.define('city', {
  name: DataTypes.STRING,
  zipcode: DataTypes.STRING,
  is_deleted: DataTypes.BOOLEAN,
  deletedat: DataTypes.DATE
}, { tableName: 'tab_cities' });



//tag type
const Tagtype = seq.define('tagtype', {
  name: DataTypes.STRING,
  tagclass: DataTypes.STRING,
  is_deleted: DataTypes.BOOLEAN,
  deletedat: DataTypes.DATE
}, { tableName: 'tab_tag_types' });

//tag
const Tag = seq.define('tag', {
  name: DataTypes.STRING,
  is_deleted: DataTypes.BOOLEAN,
  deletedat: DataTypes.DATE
}, { tableName: 'tab_tags' });

//resturant
const Resturant = seq.define('resturant', {
  name: DataTypes.STRING,
  address: DataTypes.STRING,
  is_deleted: DataTypes.BOOLEAN,
  deletedat: DataTypes.DATE,
  description: DataTypes.TEXT
}, { tableName: 'tab_resturants' });




//items
const Item = seq.define('item', {
  name: DataTypes.STRING,
  price: DataTypes.DOUBLE,
  is_deleted: DataTypes.BOOLEAN,
  description: DataTypes.TEXT
}, { tableName: 'tab_items' });


//1:N
State.hasMany(City);
City.belongsTo(State);
Tagtype.hasMany(Tag);
Tag.belongsTo(Tagtype);
City.hasMany(Resturant);
Resturant.belongsTo(City);
Resturant.hasMany(Item);
Item.belongsTo(Resturant);

//N:M
Resturant.belongsToMany(Tag, { through: 'ref_resturant_tag' });
Tag.belongsToMany(Resturant, { through: 'ref_resturant_tag' });

Item.belongsToMany(Tag, { through: 'ref_item_tag' });
Tag.belongsToMany(Item, { through: 'ref_item_tag' });


State.sync({ alter: true })
City.sync({ alter: true })
Tagtype.sync({ alter: true })
Tag.sync({ alter: true })
//resturant_tag.sync({ alter: true })
Item.sync({ alter: true })
Resturant.sync({ alter: true })
seq.sync()