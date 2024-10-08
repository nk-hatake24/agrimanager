import React, { useState, useEffect } from "react";
import axios from "axios";
import Modals from "../layouts/Modals";
import { FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { HiPencil } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { fetchResources } from "../features/resource/resourceSlice";
import { fetchSuppliers } from "../features/supplier/supplierSlice";
import { fetchTransactions } from "../features/transaction/transactionSlice";
import PdfGenerator from "../components/PdfGenerator";
import { Transaction } from "./Transaction";
import Spinner from "../components/Spinnner";

export const DetailTransaction = () => {
  const currentUser = localStorage.getItem("id");
  const [openAdd, setOpenAdd] = useState(false);
  const [openListItem, setOpenListItem] = useState(false);
  const [deleteItemModal, setDeleteItemModal] = useState(false);
  const [modifyItemModal, setModifyItemModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [selectedModifyTransaction, setModifyTransaction] = useState({
    _id: "",
    date: "",
    quantity_resource: "",
    total_price: "",
    resource: "",
    employee: currentUser,
  });
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    quantity_resource: "",
    total_price: "",
    resource: "",
    employee: currentUser,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const transactionList = useSelector((state) => state.transaction.list);
  const transactionStatus = useSelector((state) => state.transaction.status);
  const transactionError = useSelector((state) => state.transaction.error);

  const resourceList = useSelector((state) => state.resource.list);
  const resourceStatus = useSelector((state) => state.resource.status);
  const resourceError = useSelector((state) => state.resource.error);

  const supplierList = useSelector((state) => state.supplier.list);
  const supplierStatus = useSelector((state) => state.supplier.status);
  const supplierError = useSelector((state) => state.supplier.error);



  useEffect(() => {
    if (transactionStatus === "idle") {
      dispatch(fetchTransactions());
    }
    if (resourceStatus === "idle") {
      dispatch(fetchResources());
    }
    if (supplierStatus === "idle") {
      dispatch(fetchSuppliers());
    }
  }, [transactionStatus, resourceStatus, supplierStatus, dispatch]);

  useEffect(() => {
    if (transactionStatus === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }

    if (transactionStatus === "failed") {
      setError(transactionStatus);
    }
  }, [transactionStatus]);

  const onTransactionClick = (transaction) => {
    setOpenListItem(true);
    setSelectedTransaction(transaction);
  };

  const onDeleteClick = (transaction) => {
    setDeleteItemModal(true);
    setSelectedTransaction(transaction);
  };


  const onFinalDeleteClick = async (transactionId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found, please login again.");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:3500/api/transaction/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchTransactions());
      setDeleteItemModal(false);
    } catch (error) {
      console.error(
        "Error deleting transaction:",
        error.response ? error.response.data : error.message
      );
      alert(error.response ? error.response.data.message : error.message);
    }
  };

  const onModifyTransaction = (transaction) => {
    setModifyItemModal(true);
    setModifyTransaction(transaction);
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found, please login again.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:3500/api/transaction/${selectedModifyTransaction._id}`,
        selectedModifyTransaction,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchTransactions());
      setModifyItemModal(false);
    } catch (error) {
      console.error("Error updating transaction:", error);
      alert(error.response ? error.response.data.message : error.message);
    }
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({
      ...newTransaction,
      [name]: value,
    });
  };

  const handleAddTransaction = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found, please login again.");
      return;
    }
  

    try {
      await axios.post(
        "http://localhost:3500/api/transaction",
        newTransaction,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchTransactions());
      setOpenAdd(false);
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert(error.response ? error.response.data.message : error.message);
    }
  };

  const filteredTransactions = transactionList.filter((transaction) =>
    transaction.resource.name_resource
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <Transaction>
      {loading && <Spinner />}
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
              onChange={handleInputChange}
              value={newTransaction.date}
            />
            <label htmlFor="quantity_resource">
              Quantité <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="quantity_resource"
              className="p-2 text-gray-900"
              onChange={handleInputChange}
              value={newTransaction.quantity_resource}
              placeholder="Quantité"
            />
            <label htmlFor="resource">
              Ressource <span className="text-red-500">*</span>
            </label>
            <select
              name="resource"
              className="p-2 text-gray-900"
              onChange={handleInputChange}
              value={newTransaction.resource}
            >
              <option value="">Sélectionner une ressource</option>
              {resourceList.map((resource) => (
                <option key={resource._id} value={resource._id}>
                  {resource.name_resource}
                </option>
              ))}
            </select>
            {/* <label htmlFor="employee">
              fournisseur <span className="text-red-500">*</span>
            </label> */}
            {/* <select
              name="employee"
              className="p-2 text-gray-900"
              onChange={handleInputChange}
              value={newTransaction.employee}
            >
              <option value="">Sélectionner un fournisseur</option>
              {supplierList.map((supplier) => (
                <option key={supplier._id} value={supplier._id}>
                  {supplier.name_supplier}
                </option>
              ))}
            </select> */}

            <div className="flex flex-row justify-between">
              <button
                className="bg-green-400 hover:bg-green-600 p-1"
                onClick={handleAddTransaction}
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
              <p>Ressource: {selectedTransaction.resource.name_resource}</p>
              <p>Employé: {selectedTransaction.employee.name_employee}</p>
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
                  onClick={() => onFinalDeleteClick(selectedTransaction._id)}
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

              <label htmlFor="resource">Ressource</label>
              <select
                name="resource"
                className="p-2 text-gray-900"
                onChange={handleModify}
                value={selectedModifyTransaction.resource}
              >
                <option value="">Sélectionner une ressource</option>
                {resourceList.map((resource) => (
                  <option key={resource._id} value={resource._id}>
                    {resource.name_resource}
                  </option>
                ))}
              </select>
              {/* <label htmlFor="employee">Employé</label> */}
              {/* <select
                name="employee"
                className="p-2 text-gray-900"
                onChange={handleModify}
                value={selectedModifyTransaction.employee}
              >
                <option value="">Sélectionner un employé</option>
                {supplierList.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.name_employee}
                  </option>
                ))}
              </select> */}
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

        <div className="min-h-screen">
          <div className="bold text-center text-xl mb-3">
            Transaction Achats
          </div>

          <div className="flex items-center justify-between pb-3 text-gray-700 dark:text-text-50 flew-row ">
            <div
              onClick={() => setOpenAdd(true)}
              className="flex p-2 lg:p-3 items-centere cursor-pointer text-gray-50 bg-blue-500 hover:bg-blue-700 align-center  justify-center gap-2"
            >
              <span className="">
                <FaPlus />
              </span>
              Ajouter
            </div>

            <div className="flex gap-5 dark:text-gray-50">
              <div>
                <PdfGenerator transactions={filteredTransactions} />
              </div>
            </div>

            <div className=" hidden md:flex items-center  px-1 gap-1 rounded bg-white dark:bg-gray-600">
              <CiSearch className="dark:text-gray-50 " />
              <input
                type="text"
                placeholder="search"
                className="p-1  outline-0 dark:text-gray-50 dark:bg-gray-600"
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
            <div className="flex flex-col  overflow-x-clip px-8 md:px-0 pb-3  hal  max-w-full">
              {filteredTransactions.map((transaction) => (
                <div
                  className="flex flex-row text-gray-800 dark:text-gray-50 justify-between border-y-1 py-2"
                  key={transaction._id}
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
                      className="p-1  hover:bg-orange-600 hover:cursor-pointer "
                      onClick={() => {
                        onTransactionClick(transaction);
                      }}
                    >
                      <FaEye />
                    </div>

                    <div
                      className="p-1 hover:bg-yellow-600 hover:cursor-pointer  "
                      onClick={() => {
                        onModifyTransaction(transaction);
                      }}
                    >
                      <HiPencil />
                    </div>

                    <div
                      onClick={() => onDeleteClick(transaction)}
                      className="p-1 hover:cursor-pointer hover:bg-red-600 "
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
