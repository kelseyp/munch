var Sequelize = require('sequelize');
const db_config = require('./config.js');

/*
console.log('init sequelize...');
console.log('mysql: ' + JSON.stringify(db_config));
*/
var sequelize = new Sequelize(db_config );

exports.sequelize = sequelize;

exports.defineModel = function (name, attributes) {
    var attrs = {};
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                // allowNull: false
            };
        }
    }
    attrs.version = {
        type: Sequelize.BIGINT,
        // allowNull: false
    };
    attrs.createUser = {
        type: Sequelize.STRING,
        allowNull: false
    };
    attrs.updateUser = {
        type: Sequelize.STRING,
        allowNull: false
    };
    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: true,
        paranoid: true, 
        charset: 'utf8mb4', 
        collate: 'utf8mb4_general_ci',
        hooks: {
            beforeBulkCreate: function(obj){
                obj.version = 0 ;
            },
            beforeValidate: function(obj){
                if(obj.isNewRecord){
                    console.log('first');
                    obj.version = 0 ; 
                }else{
                    console.log('not first');
                    obj.version = obj.version + 1 ;
                }
            }
        }
    });
};