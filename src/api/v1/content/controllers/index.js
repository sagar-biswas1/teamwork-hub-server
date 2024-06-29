const findAll = require('./findAll')
const create = require('./create')
const findByID= require('./findSingleItem')
const updateItem= require("./updateItem")
const removeItem= require("./removeItem")

module.exports ={
    findAll,
    create,
    findByID,
    updateItem,
    removeItem
}
