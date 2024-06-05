import React, { useState } from "react";
import Dashboard from "../layouts/Dashboard";
import Modals from "../layouts/Modals";
import { FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { notes, employees } from "../mock/Mocks1"; // Assumez que vous avez un mock de notes et employees similaire à suppliers
import { CiSearch } from "react-icons/ci";
import { HiPencil } from "react-icons/hi2";

export const Note = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openListItem, setOpenListItem] = useState(false);
  const [deleteItemModal, setDeleteItemModal] = useState(false);
  const [modifyItemModal, setModifyItemModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedModifyNote, setModifyNote] = useState({
    title: "",
    description: "",
    employee: "",
  });
  const [NoteList, setNoteList] = useState(notes);
  const [searchTerm, setSearchTerm] = useState("");
  const [EmployeeList, setEmployeeList] = useState(employees);

  const onNoteClick = (note) => {
    setOpenListItem(true);
    setSelectedNote(note);
  };

  const onDeleteClick = (note) => {
    setDeleteItemModal(true);
    setSelectedNote(note);
  };

  const onFinalDeleteClick = (noteId) => {
    setDeleteItemModal(false);
    deleteNote(noteId);
  };

  const deleteNote = (noteId) => {
    setDeleteItemModal(false);
    setNoteList(
      NoteList.filter((note) => note.id !== noteId)
    );
  };

  const onModifyNote = (note) => {
    setModifyItemModal(true);
    setSelectedNote(note);
  };

  const handleSaveChanges = () => {
    const updatedNotes = NoteList.map((note) =>
      note.id === selectedModifyNote.id
        ? selectedModifyNote
        : note
    );
    setNoteList(updatedNotes);
    setModifyItemModal(false);
  };

  const handleModify = (e) => {
    const { name, value } = e.target;
    setModifyNote((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredNotes = NoteList.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dashboard>
      <div className="p-2 md:p-8">
        {/* Modal pour ajouter une note */}
        <Modals open={openAdd} onClose={() => setOpenAdd(false)}>
          <div className="flex flex-col gap-2 min-w-80">
            <h1 className="text-2xl mt-2">Ajouter une note</h1>
            <label htmlFor="title">
              Titre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              className="p-2 text-gray-900"
              onChange={(e) =>
                setModifyNote((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }))
              }
              placeholder="Titre de la note"
            />
            <label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              className="p-2 text-gray-900"
              onChange={(e) =>
                setModifyNote((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }))
              }
              placeholder="Description de la note"
            />
            <label htmlFor="employee">
              Employé <span className="text-red-500">*</span>
            </label>
            <select
              name="employee"
              className="p-2 text-gray-900"
              onChange={(e) =>
                setModifyNote((prevState) => ({
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
                  setNoteList([
                    ...NoteList,
                    { ...selectedModifyNote, id: Date.now() },
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
          {selectedNote && (
            <div className="m-8 text-center flex gap-4 flex-col capitalize">
              <h2 className="text-2xl pb-2 ">
                Titre: {selectedNote.title}
              </h2>
              <p>Description: {selectedNote.description}</p>
              <p>Employé: {selectedNote.employee}</p>
            </div>
          )}
        </Modals>

        <Modals
          open={deleteItemModal}
          onClose={() => {
            setDeleteItemModal(false);
          }}
        >
          {selectedNote && (
            <div className="flex flex-col gap-4 justify-center items-center">
              <FaTrashAlt size={50} className="text-red-600" />
              <p className="text-2xl">Supprimer</p>
              <p className="text-xl">{selectedNote.title}</p>
              <div className="flex flex-row gap-10 justify-between">
                <button
                  onClick={() => onFinalDeleteClick(selectedNote.id)}
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
          {selectedModifyNote && (
            <div className="flex flex-col gap-2 min-w-80">
              <h1 className="text-2xl mt-2">Modifier une note</h1>
              <label htmlFor="title">Titre</label>
              <input
                type="text"
                name="title"
                className="p-2 text-gray-900"
                onChange={handleModify}
                value={selectedModifyNote.title}
              />
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                className="p-2 text-gray-900"
                onChange={handleModify}
                value={selectedModifyNote.description}
              />
              <label htmlFor="employee">Employé</label>
              <select
                name="employee"
                className="p-2 text-gray-900"
                onChange={handleModify}
                value={selectedModifyNote.employee}
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
          <div className="flex justify-between pb-3  flew-row ">
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
              <p className="w-1/4 justify-center flex"> Titre</p>
              <p className="w-1/4 justify-center flex">Description</p>
              <p className="hidden w-1/4 justify-center md:flex">Employé</p>
              <p className="w-1/4 justify-center flex"> détail / supprimer</p>
            </div>
            <div className="flex flex-col overflow-y-scroll overflow-x-clip pb-3  hal  max-w-full">
              {filteredNotes.map((note) => (
                <div
                  className="flex flex-row justify-between border-y-1 py-2"
                  key={note.id}
                >
                  <p className="w-1/4 justify-center flex">
                    {note.title}
                  </p>
                  <p className="w-1/4 justify-center flex">
                    {note.description}
                  </p>
                  <p className="hidden w-1/4 justify-center md:flex">
                    {note.employee}
                  </p>
                  <div className="w-1/4 justify-center flex flew-row gap-4">
                    <div
                      className="p-1  bg-orange-400 hover:bg-orange-600 hover:cursor-pointer text-gray-100 "
                      onClick={() => {
                        onNoteClick(note);
                      }}
                    >
                      <FaEye />
                    </div>

                    <div
                      className="p-1  bg-yellow-400 hover:bg-yellow-600 hover:cursor-pointer text-gray-100 "
                      onClick={() => {
                        onModifyNote(note);
                      }}
                    >
                      <HiPencil />
                    </div>

                    <div
                      onClick={() => onDeleteClick(note)}
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
