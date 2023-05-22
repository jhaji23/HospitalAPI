const express = require("express");
const passport = require("passport");
const {
  registerDoctor,
  registerPatient,
  createReport,
  allReports,
  allSpecificReports,
  login,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/doctors/register", registerDoctor);
router.post("/login", login);
router.post(
  "/patients/register",
  passport.authenticate("jwt", { session: false }),
  registerPatient
);
router.post(
  "/patients/:id/create_report",
  passport.authenticate("jwt", { session: false }),
  createReport
);
router.get("/patients/:id/all_reports", allReports);
router.get("/patients/all_specific_reports/:status", allSpecificReports);

module.exports = router;
