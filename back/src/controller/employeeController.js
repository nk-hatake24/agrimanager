const Employee = require("../model/employeeModel");
const jwt = require("jsonwebtoken");
const bcrypt =require('bcrypt')

// ****************Register an employee*****************************
const employeeRegister = async (req, res) => {
  try {
    // Validation des données reçues
    const {
      name_employee,
      email,
      password,
      function_employee,
      salary,
      address,
    } = req.body;
    if (!name_employee || !email || !password) {
      return res.status(400).json({ message: "Données manquantes" });
    }
    //  find wether another user existe
    const existingUser = await Employee.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Création d'un nouvel utilisateurs
    const user = new Employee({
      name_employee,
      function_employee,
      salary,
      address,
      email,
      password,
    });
    await user.save();

    // Envoi d'une réponse succès
    return res
      .status(201)
      .json({ message: "user saved successfully", data: user });
  } catch (error) {
    // Gestion des erreurs
    console.error(error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// *********************** search all the employee ***********************
const searchAllEmployee = async (req, res) => {
  try {
    const employees = await Employee.find({}, { password: 0 });
    return res
      .status(200)
      .json({ message: "all the employee search", data: employees });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ************************* search on employee ***************************
const searchOneEmployee = async (req, res) => {
  try {
    const employees = await Employee.findOne({ email }, { password: 0 });
    return res
      .status(200)
      .json({ message: "all the employee search", data: employees });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//***************************employee update******************************* */

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  console.log("Request to update employee", id, updateData);

  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { _id: id },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedEmployee) {
      return res.status(404).json({
        message: "Employee not found. To modify an employee, they must exist.",
      });
    }
    res.status(200).json({
      message: "The employee information has been updated",
      data: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(400).json({ message: error.message });
    console.log(error)
  }
};

// *********************delete an employee****************************
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await Employee.findOneAndDelete(
      {_id:id});
    if (!deletedEmployee) {
      return res
        .status(404)
        .json({
          message:
            "Employee not found! can not delete an employee that does not exist",
        });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ***************************login an employee**************************
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the employee exists
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Compare the hashed passwords
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a token (if using JWT)
    const token = jwt.sign({
      id: employee._id,
      function_employee: employee.function_employee,
    }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });

    res.status(200).json({
      message: "Logged in successfully",
      token,
      employee: {
        id: employee._id,
        name: employee.name_employee,
        function: employee.function_employee,
        email: employee.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message,});
  }
};

const ech = (req, res)=>{
  res.json({message: 'ok'})
}

module.exports = {
  employeeRegister,
  searchAllEmployee,
  searchOneEmployee,
  updateEmployee,
  deleteEmployee,
  login,
  ech
};
