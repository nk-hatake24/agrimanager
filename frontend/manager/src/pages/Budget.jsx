import React, { useState } from "react";
import Dashboard from "../layouts/Dashboard";
import Modals from "../layouts/Modals";
import { FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { budgets } from "../mock/Mocks1"; // Mock data for budgets
import { CiSearch } from "react-icons/ci";
import { HiPencil } from "react-icons/hi2";

export const Budget = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openListItem, setOpenListItem] = useState(false);
  const [deleteItemModal, setDeleteItemModal] = useState(false);
  const [modifyItemModal, setModifyItemModal] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedModifyBudget, setModifyBudget] = useState({
    previsions: "",
    real_budget: "",
    period: "",
  });
  const [BudgetList, setBudgetList] = useState(budgets);
  const [searchTerm, setSearchTerm] = useState("");

  const onBudgetClick = (budget) => {
    setOpenListItem(true);
    setSelectedBudget(budget);
  };

  const onDeleteClick = (budget) => {
    setDeleteItemModal(true);
    setSelectedBudget(budget);
  };

  const onFinalDeleteClick = (budgetId) => {
    setDeleteItemModal(false);
    deleteBudget(budgetId);
  };

  const deleteBudget = (budgetId) => {
    setDeleteItemModal(false);
    setBudgetList(BudgetList.filter((budget) => budget.id !== budgetId));
  };

  const onModifyBudget = (budget) => {
    setModifyItemModal(true);
    setSelectedBudget(budget);
  };

  const handleSaveChanges = () => {
    const updatedBudgets = BudgetList.map((budget) =>
      budget.id === selectedModifyBudget.id ? selectedModifyBudget : budget
    );
    setBudgetList(updatedBudgets);
    setModifyItemModal(false);
  };

  const handleModify = (e) => {
    const { name, value } = e.target;
    setModifyBudget((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBudgets = BudgetList.filter((budget) =>
    budget.period.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dashboard>
      <div className="p-2 md:p-8">
        {/* ***************************modal pour ajouter un entree**************** */}
        <Modals open={openAdd} onClose={() => setOpenAdd(false)}>
          <div className="flex flex-col gap-2 min-w-80">
            <h1 className="text-2xl mt-2">Ajouter un budget</h1>
            <label htmlFor="previsions">
              Prévisions <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="previsions"
              className="p-2 text-gray-900"
              placeholder="1000000"
              onChange={handleModify}
            />
            <label htmlFor="real_budget">
              Budget réel <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="real_budget"
              className="p-2 text-gray-900"
              placeholder="950000"
              onChange={handleModify}
            />
            <label htmlFor="period">
              Période <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="period"
              className="p-2 text-gray-900"
              placeholder="Janvier 2024"
              onChange={handleModify}
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
          {selectedBudget && (
            <div className="m-8 text-center flex gap-4 flex-col capitalize">
              <h2 className="text-2xl pb-2 ">{selectedBudget.period}</h2>
              <p>Prévisions: {selectedBudget.previsions}</p>
              <p>Budget réel: {selectedBudget.real_budget}</p>
              <p>Période: {selectedBudget.period}</p>
            </div>
          )}
        </Modals>

        <Modals
          open={deleteItemModal}
          onClose={() => {
            setDeleteItemModal(false);
          }}
        >
          {selectedBudget && (
            <div className="flex flex-col gap-4  justify-center items-center">
              <FaTrashAlt size={50} className="text-red-600" />
              <p className="text-2xl">Supprimer</p>
              <p className="text-xl">{selectedBudget.period}</p>
              <p className="text-xl">{selectedBudget.previsions}</p>
              <p className="text-xl">{selectedBudget.real_budget}</p>
              <div className="flex flex-row gap-10 justify-between">
                <button
                  onClick={() => onFinalDeleteClick(selectedBudget.id)}
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
          {selectedModifyBudget && (
            <div className="flex flex-col gap-2 min-w-80">
              <h1 className="text-2xl mt-2">Modifier le budget</h1>
              <label htmlFor="previsions">Prévisions</label>
              <input
                type="number"
                name="previsions"
                className="p-2 text-gray-900"
                onChange={handleModify}
                value={selectedModifyBudget.previsions}
              />
              <label htmlFor="real_budget">Budget réel</label>
              <input
                type="number"
                name="real_budget"
                className="p-2 text-gray-900"
                onChange={handleModify}
                value={selectedModifyBudget.real_budget}
              />
              <label htmlFor="period">Période</label>
              <input
                type="text"
                name="period"
                className="p-2 text-gray-900"
                onChange={handleModify}
                value={selectedModifyBudget.period}
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
          <div className="flex justify-between pb-3  flex-row">
            <div
              onClick={() => setOpenAdd(true)}
              className="flex justify-center gap-2"
            >
              <span className="p-1 bg-green-400  hover:bg-green-600 cursor-pointer">
                <FaPlus />
              </span>
              Ajouter
            </div>

            <div className="flex flex-row items-center  px-1 gap-1 rounded bg-white dark:bg-gray-600">
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
          <div className="overflow-clip">
            <div className="flex flex-row justify-between py-2 bg-gray-200 dark:bg-gray-700">
              <p className="w-1/4 justify-center flex">Période</p>
              <p className="w-1/4 justify-center flex">Prévisions</p>
              <p className="hidden w-1/4 justify-center md:flex">Budget réel</p>
              <p className="w-1/4 justify-center flex">Détail / Supprimer</p>
            </div>
            <div className="flex flex-col overflow-y-scroll overflow-x-clip pb-3 max-w-full">
              {filteredBudgets.map((budget) => (
                <div
                  className="flex flex-row justify-between border-y-1 py-2"
                  key={budget.id}
                >
                  <p className="w-1/4 justify-center flex">{budget.period}</p>
                  <p className="w-1/4 justify-center flex">
                    {budget.previsions}
                  </p>
                  <p className="hidden w-1/4 justify-center md:flex">
                    {budget.real_budget}
                  </p>
                  <div className="w-1/4 justify-center flex flex-row gap-4">
                    <div
                      className="p-1 bg-orange-400 hover:bg-orange-600 hover:cursor-pointer text-gray-100"
                      onClick={() => {
                        onBudgetClick(budget);
                      }}
                    >
                      <FaEye />
                    </div>

                    <div
                      className="p-1 bg-yellow-400 hover:bg-yellow-600 hover:cursor-pointer text-gray-100"
                      onClick={() => {
                        onModifyBudget(budget);
                      }}
                    >
                      <HiPencil />
                    </div>

                    <div
                      onClick={() => onDeleteClick(budget)}
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
    </Dashboard>
  );
};
