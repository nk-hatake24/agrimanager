import React, { useState } from "react";
import Dashboard from "../layouts/Dashboard";
import Modals from "../layouts/Modals";
import { FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { suppliers } from "../mock/Mocks1"; // Assumez que vous avez un mock de suppliers similaire à employees
import { CiSearch } from "react-icons/ci";
import { HiPencil } from "react-icons/hi2";
import Resource from "./Resource";

export const Supplier = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openListItem, setOpenListItem] = useState(false);
  const [deleteItemModal, setDeleteItemModal] = useState(false);
  const [modifyItemModal, setModifyItemModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedModifySupplier, setModifySupplier] = useState({
    name_supplier: "",
    phone_supplier: "",
    email_supplier: "",
    address_supplier: "",
  });
  const [SupplierList, setSupplierList] = useState(suppliers);
  const [searchTerm, setSearchTerm] = useState("");

  const onSupplierClick = (supplier) => {
    setOpenListItem(true);
    setSelectedSupplier(supplier);
  };

  const onDeleteClick = (supplier) => {
    setDeleteItemModal(true);
    setSelectedSupplier(supplier);
  };

  const onFinalDeleteClick = (supplierId) => {
    setDeleteItemModal(false);
    deleteSupplier(supplierId);
  };

  const deleteSupplier = (supplierId) => {
    setDeleteItemModal(false);
    setSupplierList(
      SupplierList.filter((supplier) => supplier.id !== supplierId)
    );
  };

  const onModifySupplier = (supplier) => {
    setModifyItemModal(true);
    setSelectedSupplier(supplier);
  };

  const handleSaveChanges = () => {
    const updatedSuppliers = SupplierList.map((supplier) =>
      supplier.id === selectedModifySupplier.id
        ? selectedModifySupplier
        : supplier
    );
    setSupplierList(updatedSuppliers);
    setModifyItemModal(false);
  };

  const handleModify = (e) => {
    const { name, value } = e.target;
    setModifySupplier((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSuppliers = SupplierList.filter((supplier) =>
    supplier.name_supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Resource>
      <div className="p-2 md:p-8">
        {/* Modal pour ajouter un fournisseur */}
        <Modals open={openAdd} onClose={() => setOpenAdd(false)}>
          <div className="flex flex-col gap-2 min-w-80">
            <h1 className="text-2xl mt-2">Ajouter un fournisseur</h1>
            <label htmlFor="name_supplier">
              Nom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name_supplier"
              className="p-2 text-gray-900"
              onChange={(e) =>
                setModifySupplier((prevState) => ({
                  ...prevState,
                  name_supplier: e.target.value,
                }))
              }
              placeholder="Nom du fournisseur"
            />
            <label htmlFor="phone_supplier">
              Téléphone <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phone_supplier"
              className="p-2 text-gray-900"
              onChange={(e) =>
                setModifySupplier((prevState) => ({
                  ...prevState,
                  phone_supplier: e.target.value,
                }))
              }
              placeholder="Numéro de téléphone"
            />
            <label htmlFor="email_supplier">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email_supplier"
              className="p-2 text-gray-900"
              onChange={(e) =>
                setModifySupplier((prevState) => ({
                  ...prevState,
                  email_supplier: e.target.value,
                }))
              }
              placeholder="Email du fournisseur"
            />
            <label htmlFor="address_supplier">
              Adresse <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address_supplier"
              className="p-2 text-gray-900"
              onChange={(e) =>
                setModifySupplier((prevState) => ({
                  ...prevState,
                  address_supplier: e.target.value,
                }))
              }
              placeholder="Adresse du fournisseur"
            />

            <div className="flex flex-row justify-between">
              <button
                className="bg-green-400 hover:bg-green-600 p-1"
                onClick={() => {
                  setSupplierList([
                    ...SupplierList,
                    { ...selectedModifySupplier, id: Date.now() },
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
          {selectedSupplier && (
            <div className="m-8 text-center flex gap-4 flex-col capitalize">
              <h2 className="text-2xl pb-2 ">
                Nom: {selectedSupplier.name_supplier}
              </h2>
              <p>Téléphone: {selectedSupplier.phone_supplier}</p>
              <p>Email: {selectedSupplier.email_supplier}</p>
              <p>Adresse: {selectedSupplier.address_supplier}</p>
            </div>
          )}
        </Modals>

        <Modals
          open={deleteItemModal}
          onClose={() => {
            setDeleteItemModal(false);
          }}
        >
          {selectedSupplier && (
            <div className="flex flex-col gap-4 justify-center items-center">
              <FaTrashAlt size={50} className="text-red-600" />
              <p className="text-2xl">Supprimer</p>
              <p className="text-xl">{selectedSupplier.name_supplier}</p>
              <div className="flex flex-row gap-10 justify-between">
                <button
                  onClick={() => onFinalDeleteClick(selectedSupplier.id)}
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
          {selectedModifySupplier && (
            <div className="flex flex-col gap-2 min-w-80">
              <h1 className="text-2xl mt-2">Modifier un fournisseur</h1>
              <label htmlFor="name_supplier">Nom</label>
              <input
                type="text"
                name="name_supplier"
                className="p-2 text-gray-900"
                onChange={handleModify}
                placeholder="Nom du fournisseur"
                value={selectedModifySupplier.name_supplier}
              />
              <label htmlFor="phone_supplier">Téléphone</label>
              <input
                type="text"
                name="phone_supplier"
                className="p-2 text-gray-900"
                onChange={handleModify}
                placeholder="Numéro de téléphone"
                value={selectedModifySupplier.phone_supplier}
              />
              <label htmlFor="email_supplier">Email</label>
              <input
                type="email"
                name="email_supplier"
                className="p-2 text-gray-900"
                onChange={handleModify}
                placeholder="Email du fournisseur"
                value={selectedModifySupplier.email_supplier}
              />
              <label htmlFor="address_supplier">Adresse</label>
              <input
                type="text"
                name="address_supplier"
                className="p-2 text-gray-900"
                onChange={handleModify}
                placeholder="Adresse du fournisseur"
                value={selectedModifySupplier.address_supplier}
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
          <div className="flex justify-between text-gray-800 dark:text-gray-50 pb-3  flew-row ">
            <div
              onClick={() => setOpenAdd(true)}
              className="flex justify-center gap-2 "
            >
              <span className="p-1  hover:bg-green-600 cursor-pointer">
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
              <p className="w-1/4 justify-center flex"> Nom</p>
              <p className="w-1/4 justify-center flex">Téléphone</p>
              <p className="w-1/4 justify-center flex"> détail / supprimer</p>
            </div>
            <div className="flex flex-col overflow-y-scroll px-8 md:px-0 overflow-x-clip pb-3  hal  max-w-full">
              {filteredSuppliers.map((supplier) => (
                <div
                  className="flex flex-row justify-between border-y-1 py-2"
                  key={supplier.id}
                >
                  <p className="w-1/4 justify-center flex">
                    {supplier.name_supplier}
                  </p>
                  <p className="w-1/4 justify-center flex">
                    {supplier.phone_supplier}
                  </p>
                  
                  <div className="w-1/4 justify-center flex flew-row gap-4">
                    <div
                      className="p-1 hover:bg-orange-600 hover:cursor-pointer "
                      onClick={() => {
                        onSupplierClick(supplier);
                      }}
                    >
                      <FaEye />
                    </div>

                    <div
                      className="p- hover:bg-yellow-600 hover:cursor-pointer"
                      onClick={() => {
                        onModifySupplier(supplier);
                      }}
                    >
                      <HiPencil />
                    </div>

                    <div
                      onClick={() => onDeleteClick(supplier)}
                      className="p hover:cursor-pointer hover:bg-red-600"
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
    </Resource>
  );
};
