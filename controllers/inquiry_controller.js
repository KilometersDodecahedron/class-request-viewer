// tells it how to structure
const db = require("../models")
const express = require("express")
const router = express.Router()

module.exports = {
  getAllInquiries: function (req, res) {
    db.Inquiry.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  postInquiries: function (req, res) {
    db.Inquiry.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  updateInquiries: function (req, res) {
    db.Inquiry.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  deleteInquiries: function (req, res) {
    db.Inquiry.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
}
