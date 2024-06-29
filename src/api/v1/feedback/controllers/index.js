const findFeedbacksContentId = require('./find')
const create = require('./create')
const findByID= require('./findById')
const updateByID= require("./update")
const removeFeedbackByID= require("./delete")

module.exports ={
    findFeedbacksContentId,
    create,
    findByID,
    updateByID,
    removeFeedbackByID
}
