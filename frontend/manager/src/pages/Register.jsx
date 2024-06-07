import React, { useState } from "react";
import axios from "axios";
import LayoutGeneral from "../layouts/LayoutGeneral";
import { useNavigate } from "react-router-dom";
import NavBarTop from "../components/NavBarTop";
import Switcher from "../components/Switcher";

const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 flex flex-col items-center rounded shadow-md">
        <p>{message}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          OK
        </button>
      </div>
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [registerData, setRegisterData] = useState({
    name_employee: "",
    function_employee: "employee",
    salary: "",
    address: "",
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3500/api/employee/register",
        registerData
      );
      setModalMessage(response.data.message);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate('/login');
      }, 2000);
    } catch (error) {
      alert(error.response.data.error);
      console.error("Error:", error);
    }
  };

  return (
    <LayoutGeneral>
      {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />}
      <section className="h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900">
       <div className="absolute top-2 left-2"> <Switcher /></div>
        <div className="w-full m-5 max-w-md bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="p-6 space-y-4 sm:p-8">
            <div className="flex items-center justify-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <img
                className="w-8 h-8 mr-2"
                src="https://img.freepik.com/free-vector/hand-drawn-nerd-logo-template_23-2149199407.jpg?size=338&ext=jpg&ga=GA1.1.553209589.1715126400&semt=ais_use"
                alt="logo"
              />
              AgriManager
            </div>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              Register to an account
            </h1>
            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              <div>
                <label
                  htmlFor="name_employee"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your name
                </label>
                <input
                  type="text"
                  name="name_employee"
                  id="name_employee"
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="john doe"
                  value={registerData.name_employee}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="name@company.com"
                  value={registerData.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="321 Pine St, City D"
                  value={registerData.address}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="function_employee"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Role
                </label>
                <select
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  id="function_employee"
                  name="function_employee"
                  value={registerData.function_employee}
                  onChange={handleLoginChange}
                >
                  <option value="manager">Manager</option>
                  <option value="employee">Employee</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={registerData.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-5 py-2.5 text-sm font-medium text-black border border-gray-700 rounded-lg bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-4 dark:bg-primary-600 dark:text-white dark:border-gray-200 dark:hover:bg-primary-700"
              >
                register
              </button>
            </form>
          </div>
        </div>
      </section>
    </LayoutGeneral>
  );
};

export default Register;
