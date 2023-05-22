const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    unique: true,
  },
  reports: [
    {
      status: {
        type: String,
        required: true,
        enum: [
          "Negative",
          "Travelled - Quarantine",
          "Symptoms - Quarantine",
          "Positive - Admit",
        ],
      },
      date: {
        type: Date,
        require: true,
      },
    },
  ],
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    require: true,
  },
});

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
