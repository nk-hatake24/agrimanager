const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const employeeSchema = new mongoose.Schema(
  {
   id: {
    type: String,
    unique: [true , ' the id most be unique']
   },
    name_employee:{
      type: String,
      required: [true, 'name of the employee is required']
  },
  function_employee:{
      type: String,
      required: [true, 'the function of the employee is required'],
      enum:['employee', 'manager', 'admin']
  },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    salary: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

employeeSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10); 
  }
  next();
});

const employeeModel = mongoose.model("Employee", employeeSchema);

module.exports = employeeModel;
