const findAll = require('./find')
const create = require('./create')
const findByID= require('./findById')
const updateByID= require("./update")
const removeContentByID= require("./delete")

module.exports ={
    findAll,
    create,
    findByID,
    updateByID,
    removeContentByID
}
