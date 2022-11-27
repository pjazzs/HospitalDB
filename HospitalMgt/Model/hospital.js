const mongoose = require("mongoose")

const pattientSchema = new mongoose.Schema ({
  firstName: {
    type: String,
    trim: true,
    require: [true, "first Name filed is empty"],
  },

  lastName: {
    type: String,
    trim: true,
    require: [true, "last Name filed is empty"],
  },

  cardNo: {
    type: Number,
    trim: true,
    require: [true, "Enter card number"],
    maxlenth: [4, "should not exceed four digits"]
  },

  docAssigned: {
    type: String,
    require: [true, "Doctors name is needed"]
  },

  nurseAssigned: {
    type: String,
    require: [true, "Nurse name is needed"]
  },

  reportOfDc: {
    type: String,
    require: [true, "Enter doc report"]
  },

  diagonize: {
    type: String,
    require: [true, "Enter your health challeng"]
  },

  nextOfKin: {
    type: String,
    require: [true, "Enter next of kin"]
  },

  contactOfNextOfKin: {
    type: Number,
    require: [true, "Enter next of kin contact"]
  }
},{timestamps: true})



    

const Patients = mongoose.model("Patients", pattientSchema )

module.exports = Patients 





