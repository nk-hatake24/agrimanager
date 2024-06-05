import React, { useState } from "react";
import Dashboard from "../layouts/Dashboard";
import Modals from "../layouts/Modals";
import { FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { employees } from "../mock/Mocks1";
import { CiSearch } from "react-icons/ci";
import { HiPencil } from "react-icons/hi2";

export const Employee = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openListItem, setOpenListItem] = useState(false);
  const [deleteItemModal, setDeleteItemModal] = useState(false);
  const [modifyItemModal, setModifyItemModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedModifyEmployee, setModifyEmployee] = useState({
    name_employee: "",
    email: "",
    salary: "",
    address: "",
    function_employee: ""});
  const [EmployeeList, setProductList] = useState(employees);
  const [searchTerm, setSearchTerm] = useState("");
  // const [onSelectedDelete, setOnSelectedDelete] = useState(null);
  const [role, setRole] = useState("employee");

  const onProductClick = (employee) => {
    {
      setOpenListItem(true);
    }
    setSelectedEmployee(employee);
  };

  const onDeleteClick = (employee) => {
    setDeleteItemModal(true);
    // setOnSelectedDelete(employee);
    setSelectedEmployee(employee);
  };
  const onFinalDeleteClick = (employee) => {
    setDeleteItemModal(false);
    deleteEmployee(employee);
  };

  const deleteEmployee = (employeeId) => {
    setDeleteItemModal(false);
    setProductList(
      EmployeeList.filter((employee) => employee.id_user !== employeeId)
    );
  };  

  const onModifyEmployee = (employee) => {
    setModifyItemModal(true);
    setSelectedEmployee(employee);
  };

  const handleSaveChanges = () => {
    const updatedEmployees = EmployeeList.map((employee) =>
      employee.id_user === selectedModifyEmployee.id_user
        ? selectedModifyEmployee
        : employee
    );
    setEmployeeList(updatedEmployees);
    setModifyItemModal(false);
  };


  const handleModify = (e) => {
    const { name, value } = e.target;
    setModifyEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = EmployeeList.filter((employee) =>
    employee.name_employee.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <Dashboard>
      <div className="p-2 md:p-8">
        {/* ***************************modal pour ajouter un entree**************** */}
        <Modals open={openAdd} onClose={() => setOpenAdd(false)}>
          <div className="flex flex-col gap-2 min-w-80">
            <h1 className="text-2xl mt-2">Ajouter une entree</h1>
            <label htmlFor="nomemployee">
              Nom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="p-2 text-gray-900"
              placeholder="john doe"
            />
            <label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="p-2 text-gray-900"
              placeholder="johndoe@gmail.com"
            />
            <label htmlFor="role">
              Role: <span className="text-red-500">*</span>{" "}
            </label>
            <select
              className="text-gray-800 p-2"
              id="role"
              value={role}
              onChange={handleChange}
            >
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
            <label htmlFor="salary">
              Salaire(cfa) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="p-2 text-gray-900"
              placeholder="30000"
            />
            <label htmlFor="addresse">
              Addresse<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="p-2 text-gray-900"
              placeholder="lafe 2 bafoussam"
            />

            <div className="flex flex-row justify-between">
              <button className="bg-green-400 hover:bg-green-600 p-1">
                Ajouter
              </button>
              <button
                className="bg-red-400 hover:bg-red-600 p-1"
                onClick={() => setOpenAdd(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </Modals>

        <Modals
          open={openListItem}
          onClose={() => {
            setOpenListItem(false);
          }}
        >
          {selectedEmployee && (
            <div className="m-8 text-center flex gap-4 flex-col capitalize">
              <h2 className="text-2xl pb-2 ">
                {" "}
                {selectedEmployee.name_employee}
              </h2>
              <p>Nom: {selectedEmployee.name_employee}</p>
              <p>Fonction: {selectedEmployee.function_employee}</p>
              <p>Email: {selectedEmployee.email}</p>
              <p>Addresse: {selectedEmployee.address}</p>
              <p>Salaire:{selectedEmployee.salary}</p>
            </div>
          )}
        </Modals>

        <Modals
          open={deleteItemModal}
          onClose={() => {
            setDeleteItemModal(false);
          }}
        >
          {selectedEmployee && (
            <div className="flex flex-col gap-4  justify-center items-center">
              <FaTrashAlt size={50} className="text-red-600" />
              <p className="text-2xl">Supprimer</p>
              <p className="text-xl">{selectedEmployee.id_user}</p>
              <p className="text-xl">{selectedEmployee.name_employee}</p>

              <div className="flex flex-row gap-10 justify-between">
                <button
                  onClick={() => onFinalDeleteClick(selectedEmployee.id_user)}
                  className="p-1 bg-red-400 hover:bg-red-600"
                >
                  Supprimer
                </button>
                <button
                  onClick={() => setDeleteItemModal(false)}
                  className="p-1  bg-orange-400 hover:bg-orange-600"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </Modals>

        <Modals
          open={modifyItemModal}
          onClose={() => setModifyItemModal(false)}
        >
          {selectedModifyEmployee && (
            <div className="flex flex-col gap-2 min-w-80">
              <h1 className="text-2xl mt-2">Modifier une entrée</h1>
              <label htmlFor="name_employee">Nom</label>
              <input
                type="text"
                name="name_employee"
                className="p-2 text-gray-900"
                onChange={handleModify}
                placeholder="john doe"
                value={selectedModifyEmployee.name_employee}
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="p-2 text-gray-900"
                onChange={handleModify}
                placeholder="johndoe@gmail.com"
                value={selectedModifyEmployee.email}
              />
              <label htmlFor="role">Role:</label>
              <select
                className="text-gray-800 p-2"
                name="function_employee"
                value={selectedModifyEmployee.function_employee}
                onChange={handleModify}
              >
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
              </select>
              <label htmlFor="salary">Salaire (cfa)</label>
              <input
                type="text"
                name="salary"
                className="p-2 text-gray-900"
                onChange={handleModify}
                placeholder="30000"
                value={selectedModifyEmployee.salary}
              />
              <label htmlFor="address">Addresse</label>
              <input
                type="text"
                name="address"
                className="p-2 text-gray-900"
                onChange={handleModify}
                placeholder="lafe 2 bafoussam"
                value={selectedModifyEmployee.address}
              />
              <div className="flex flex-row justify-between">
                <button
                  className="bg-green-400 hover:bg-green-600 p-1"
                  onClick={handleSaveChanges}
                >
                  Sauvegarder
                </button>
                <button
                  className="bg-red-400 hover:bg-red-600 p-1"
                  onClick={() => setModifyItemModal(false)}
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </Modals>

        <div className="h-screen">
          <div className="flex justify-between pb-3  flew-row ">
            <div
              onClick={() => setOpenAdd(true)}
              className="flex justify-center gap-2"
            >
              <span className="p-1 bg-green-0  hover:bg-green-600 cursor-pointer">
                <FaPlus />
              </span>
              Ajouter
            </div>

            <div className=" flex flex-row items-center  px-1 gap-1 rounded bg-white dark:bg-gray-600">
              <CiSearch className="dark:text-gray-50 " />
              <input
                type="text"
                placeholder="search"
                className="p-1 outline-0 dark:text-gray-50 dark:bg-gray-600"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className=" overflow-clip">
            <div className="flex flex-row justify-between w py-2 bg-gray-200 dark:bg-gray-700">
              <p className="w-1/4 justify-center flex"> Employé</p>
              <p className="w-1/4 justify-center flex">Fonction</p>
              <p className="hidden w-1/4 justify-center md:flex">
                Salaire (CFA){" "}
              </p>
              <p className="w-1/4 justify-center flex"> detail / supprimer</p>
            </div>
            <div className="flex flex-col overflow-y-scroll overflow-x-clip pb-3 p hal px-8 md:px-0 max-w-full">
              {filteredEmployees.map((index) => (
                <div
                  className="flex flex-row justify-between border-y-1 py-2"
                  key={index.id_user}
                >
                  <p className="w-1/4 justify-center flex">
                    {index.name_employee}
                  </p>
                  <p className="w-1/4 justify-center flex">
                    {index.function_employee}
                  </p>
                  <p className="hidden w-1/4 justify-center md:flex">
                    {index.salary}
                  </p>
                  <div className="w-1/4 justify-center flex flew-row gap-4">
                    <div
                      className="p-1  bg-orange-0 hover:bg-orange-600 hover:cursor-pointer "
                      onClick={() => {
                        onProductClick(index);
                      }}
                    >
                      <FaEye />
                    </div>

                    <div
                      className="p-1  bg-yellow-0 hover:bg-yellow-600 hover:cursor-pointer "
                      onClick={() => {
                        onModifyEmployee(index);
                      }}
                    >
                      <HiPencil />
                    </div>

                    <div
                      onClick={() => onDeleteClick(index)}
                      className="p-1 bg-red-0 hover:cursor-pointer hover:bg-red-600 "
                    >
                      <FaTrashAlt />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};
