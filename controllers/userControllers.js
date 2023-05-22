const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const jwt = require("jsonwebtoken");

module.exports.registerDoctor = async (req, res, next) => {
  try {
    const doc = await Doctor.create(req.body);
    res.status(200).json({
      success: true,
      message: "doctor created successfully",
      data: { doctor: doc },
    });
  } catch (error) {
    res.statyus(500).json({
      success: false,
      message: "could not create doctor, Internal server error",
    });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    console.log(name);
    const user = await Doctor.findOne({ name });
    console.log(user);
    if (user) {
      const token = jwt.sign(user.id, "secret");
      res.status(200).json({
        success: true,
        token,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "name or password is invalid ",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

module.exports.registerPatient = async (req, res, next) => {
  try {
    req.body.doctor = "646b07e342b35344a7c769b3";
    const patient = await Patient.create(req.body);
    res.status(200).json({
      success: true,
      message: "Patient created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "could not create a patient , Internal server error",
    });
  }
};

module.exports.createReport = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);

    req.body.date = Date.now();
    patient.reports.push(req.body);
    const updatedUser = await patient.save();

    res.status(200).json({
      success: true,
      message: "Report submitted successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "could not create a report, Internal server error",
      error,
    });
  }
};

module.exports.allReports = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    res.status(200).json({
      success: true,
      reports: patient.reports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "could not fetch reports, Internal server error",
      error,
    });
  }
};

module.exports.allSpecificReports = async (req, res, next) => {
  try {
    const patient = await Patient.find({
      reports: { $elemMatch: { status: req.params.status } },
    });

    res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "could not fetch the particular reports, Internal server error",
      error,
    });
  }
};
