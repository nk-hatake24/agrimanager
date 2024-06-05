import React, { useState, useEffect } from "react";
import Dashboard from "../layouts/Dashboard";
import Modals from "../layouts/Modals";
import { FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { transactions, resources, employees } from "../mock/Mocks1"; // Assumez que vous avez un mock de transactions, resources, et employees similaire à suppliers
import { CiSearch } from "react-icons/ci";
import { HiPencil } from "react-icons/hi2";
import { Transaction } from "./Transaction";

export const DetailTransaction = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openListItem, setOpenListItem] = useState(false);
  const [deleteItemModal, setDeleteItemModal] = useState(false);
  const [modifyItemModal, setModifyItemModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedModifyTransaction, setModifyTransaction] = useState({
    date: "",
    quantity_resource: "",
    total_price: "",
    resource: "",
    employee: "",
  });
  const [TransactionList, setTransactionList] = useState(transactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [ResourceList, setResourceList] = useState(resources);
  const [EmployeeList, setEmployeeList] = useState(employees);

  const onTransactionClick = (transaction) => {
    setOpenListItem(true);
    setSelectedTransaction(transaction);
  };

  const onDeleteClick = (transaction) => {
    setDeleteItemModal(true);
    setSelectedTransaction(transaction);
  };

  const onFinalDeleteClick = (transactionId) => {
    setDeleteItemModal(false);
    deleteTransaction(transactionId);
  };

  const deleteTransaction = (transactionId) => {
    setDeleteItemModal(false);
    setTransactionList(
      TransactionList.filter((transaction) => transaction.id !== transactionId)
    );
  };

  const onModifyTransaction = (transaction) => {
    setModifyItemModal(true);
    setSelectedTransaction(transaction);
  };

  const handleSaveChanges = () => {
    const updatedTransactions = TransactionList.map((transaction) =>
      transaction.id === selectedModifyTransaction.id
        ? selectedModifyTransaction
        : transaction
    );
    setTransactionList(updatedTransactions);
    setModifyItemModal(false);
  };

  const handleModify = (e) => {
    const { name, value } = e.target;
    setModifyTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTransactions = TransactionList.filter((transaction) =>
    transaction.resource.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Transaction>
      <div className="p-2 md:p-8">
        {/* Modal pour ajouter une transaction */}
        <Modals open={openAdd} onClose={() => setOpenAdd(false)}>
          <div className="flex flex-col gap-2 min-w-80">
            <h1 className="text-2xl mt-2">Ajouter une transaction</h1>
            <label htmlFor="date">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              className="p-2 text-gray-900"
              onChange={(e) =>
                setModifyTransaction((prevState) => ({
                  ...prevState,
                  date: e.target.value,
                }))
              }
            />
            <label htmlFor="quantity_resource">
              Quantité <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="quantity_resource"
              className="p-2 text-gray-900"
              onChange={(e) =>
                setModifyTransaction((prevState) => ({
                  ...prevState,
                  quantity_resource: e.target.value,
                }))
              }
              placeholder="Quantité"
            />
            <label htmlFor="total_price">
              Prix Total <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="total_price"
              className="p-2 text-gray-900"
              onChange={(e) =>
                setModifyTransaction((prevState) => ({
                  ...prevState,
                  total_price: e.target.value,
                }))
              }
              placeholder="Prix Total"
            />
            <label htmlFor="resource">
              Ressource <span className="text-red-500">*</span>
            </label>
            <select
              name="resource"
              className="p-2 text-gray-900"
              onChange={(e) =>
                setModifyTransaction((prevState) => ({
                  ...prevState,
                  resource: e.target.value,
                }))
              }
            >
              <option value="">Sélectionner une ressource</option>
              {ResourceList.map((resource) => (
                <option key={resource.id} value={resource.id}>
                  {resource.name_resource}
                </option>
              ))}
            </select>
            <label htmlFor="employee">
              Employé <span className="text-red-500">*</span>
            </label>
            <select
              name="employee"
              className="p-2 text-gray-900"
              onChange={(e) =>
                setModifyTransaction((prevState) => ({
                  ...prevState,
                  employee: e.target.value,
                }))
              }
            >
              <option value="">Sélectionner un employé</option>
              {EmployeeList.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name_employee}
                </option>
              ))}
            </select>

            <div className="flex flex-row justify-between">
              <button
                className="bg-green-400 hover:bg-green-600 p-1"
                onClick={() => {
                  setTransactionList([
                    ...TransactionList,
                    { ...selectedModifyTransaction, id: Date.now() },
                  ]);
                  setOpenAdd(false);
                }}
              >
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
          {selectedTransaction && (
            <div className="m-8 text-center flex gap-4 flex-col capitalize">
              <h2 className="text-2xl pb-2 ">
                Transaction: {selectedTransaction.date}
              </h2>
              <p>Quantité: {selectedTransaction.quantity_resource}</p>
              <p>Prix Total: {selectedTransaction.total_price}</p>
              <p>Ressource: {selectedTransaction.resource}</p>
              <p>Employé: {selectedTransaction.employee}</p>
            </div>
          )}
        </Modals>

        <Modals
          open={deleteItemModal}
          onClose={() => {
            setDeleteItemModal(false);
          }}
        >
          {selectedTransaction && (
            <div className="flex flex-col gap-4 justify-center items-center">
              <FaTrashAlt size={50} className="text-red-600" />
              <p className="text-2xl">Supprimer</p>
              <p className="text-xl">{selectedTransaction.date}</p>
              <div className="flex flex-row gap-10 justify-between">
                <button
                  onClick={() => onFinalDeleteClick(selectedTransaction.id)}
                  className="p-1 bg-red-400 hover:bg-red-600"
                >
                  Supprimer
                </button>
                <button
                  onClick={() => setDeleteItemModal(false)}
                  className="p-1 bg-orange-400 hover:bg-orange-600"
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
          {selectedModifyTransaction && (
            <div className="flex flex-col gap-2 min-w-80">
              <h1 className="text-2xl mt-2">Modifier une transaction</h1>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                className="p-2 text-gray-900"
                onChange={handleModify}
                value={selectedModifyTransaction.date}
              />
              <label htmlFor="quantity_resource">Quantité</label>
              <input
                type="number"
                name="quantity_resource"
                className="p-2 text-gray-900"
                onChange={handleModify}
                value={selectedModifyTransaction.quantity_resource}
              />
              <label htmlFor="total_price">Prix Total</label>
              <input
                type="number"
                name="total_price"
                className="p-2 text-gray-900"
                onChange={handleModify}
                value={selectedModifyTransaction.total_price}
              />
              <label htmlFor="resource">Ressource</label>
              <select
                name="resource"
                className="p-2 text-gray-900"
                onChange={handleModify}
                value={selectedModifyTransaction.resource}
              >
                <option value="">Sélectionner une ressource</option>
                {ResourceList.map((resource) => (
                  <option key={resource.id} value={resource.id}>
                    {resource.name_resource}
                  </option>
                ))}
              </select>
              <label htmlFor="employee">Employé</label>
              <select
                name="employee"
                className="p-2 text-gray-900"
                onChange={handleModify}
                value={selectedModifyTransaction.employee}
              >
                <option value="">Sélectionner un employé</option>
                {EmployeeList.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name_employee}
                  </option>
                ))}
              </select>
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
          <div className="flex justify-between pb-3 text-gray-700 dark:text-text-50 flew-row ">
            <div
              onClick={() => setOpenAdd(true)}
              className="flex justify-center gap-2"
            >
              <span className="p-1 bg-green-400  hover:bg-green-600 cursor-pointer">
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
              <p className="w-1/4 justify-center flex"> Date</p>
              <p className="w-1/4 justify-center flex">Quantité</p>
              <p className="hidden w-1/4 justify-center md:flex">Prix Total</p>
              <p className="w-1/4 justify-center flex"> détail / supprimer</p>
            </div>
            <div className="flex flex-col overflow-y-scroll overflow-x-clip px-8 md:px-0 pb-3  hal  max-w-full">
              {filteredTransactions.map((transaction) => (
                <div
                  className="flex flex-row justify-between border-y-1 py-2"
                  key={transaction.id}
                >
                  <p className="w-1/4 justify-center flex">
                    {transaction.date}
                  </p>
                  <p className="w-1/4 justify-center flex">
                    {transaction.quantity_resource}
                  </p>
                  <p className="hidden w-1/4 justify-center md:flex">
                    {transaction.total_price}
                  </p>
                  <div className="w-1/4 justify-center flex flew-row gap-4">
                    <div
                      className="p-1  bg-orange-400 hover:bg-orange-600 hover:cursor-pointer text-gray-100 "
                      onClick={() => {
                        onTransactionClick(transaction);
                      }}
                    >
                      <FaEye />
                    </div>

                    <div
                      className="p-1  bg-yellow-400 hover:bg-yellow-600 hover:cursor-pointer text-gray-100 "
                      onClick={() => {
                        onModifyTransaction(transaction);
                      }}
                    >
                      <HiPencil />
                    </div>

                    <div
                      onClick={() => onDeleteClick(transaction)}
                      className="p-1 bg-red-400 hover:cursor-pointer hover:bg-red-600 text-gray-100"
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
    </Transaction>
  );
};
