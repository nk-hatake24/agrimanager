import React, { useState } from "react";
import Dashboard from "../layouts/Dashboard";

export const Todo = () => {
  // Initialiser les éléments avec un état de sélection
  const initialElements = [
    { id: 1, name: "todo", checked: false },
    { id: 2, name: "todo 2", checked: false },
  ];

  const [elements, setElements] = useState(initialElements);

  // Gérer le changement de checkbox
  const handleCheckboxChange = (id) => {
    setElements(
      elements.map((element) =>
        element.id === id ? { ...element, checked: !element.checked } : element
      )
    );
  };

  return (
    <Dashboard>
      <div className="flex h-full w-full gap-10 ">
        {/* Div 1: To do */}
        <div className="md:w-1/2 shadow shadow-gray-200 p-2 dark:shadow-gray-700">
          <div className="header justify-start p-6 text-sm dark:text-gray-500 text-gray-400">
            To do
          </div>
          <div className="h-full w-full border p-2 flex flex-col gap-2">
            {elements
              .filter((element) => !element.checked)
              .map((element) => (
                <div
                  key={element.id}
                  className="todo-item bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 flex gap-2"
                >
                  <input
                    type="checkbox"
                    name="todo-list"
                    className="bg-gray-100"
                    checked={element.checked}
                    onChange={() => handleCheckboxChange(element.id)}
                  />
                  <p className="todo-list">{element.name}</p>
                </div>
              ))}
          </div>
        </div>

        {/* Div 2: Completed */}
        <div className="md:w-1/2 shadow shadow-gray-200 p-6 dark:shadow-gray-700">
          <div className="header justify-start p-2 text-sm dark:text-gray-500 text-gray-400">
            Completed
          </div>
          <div className="h-full w-full border p-2 flex flex-col gap-2">
            {elements
              .filter((element) => element.checked)
              .map((element) => (
                <div
                  key={element.id}
                  className="todo-item bg-red-100 dark:bg-gray-800 hover:bg-red-200 dark:hover:bg-gray-600 flex gap-2"
                >
                  <input
                    type="checkbox"
                    name="todo-list"
                    className="bg-gray-100"
                    checked={element.checked}
                    onChange={() => handleCheckboxChange(element.id)}
                  />
                  <p className="todo-list">{element.name}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Todo;
