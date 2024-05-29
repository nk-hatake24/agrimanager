import React from 'react'
import Dashboard from '../layouts/Dashboard'

export const Employee = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openListItem, setOpenListItem] = useState(false);
    const [deleteItemModal, setDeleteItemModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productList, setProductList] = useState(produits);
    const [onSelectedDelete, setOnSelectedDelete] = useState(null);
  
    const onProductClick = (produit) => {
      {
        setOpenListItem(true);
      }
      setSelectedProduct(produit);
    };
  
    const onDeleteClick = (produit) => {
      setDeleteItemModal(true);
      setOnSelectedDelete(produit);
    };
    const onFinalDeleteClick = (produit) => {
      setDeleteItemModal(false);
      deleteProduct(produit);
    };
  
    const deleteProduct = (productId) => {
      setDeleteItemModal(false);
      setProductList(productList.filter((produit) => produit.id !== productId));
    };
  
  return (
    <Dashboard>
        
      {/* ***************************modal pour ajouter un entree**************** */}
      <Modals open={openAdd} onClose={() => setOpenAdd(false)}>
        <div className="flex flex-col gap-2 min-w-80">
          <h1 className="text-2xl mt-2">Ajouter une entree</h1>
          <label htmlFor="nomProduit">
            Le nom de produit <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="p-2 text-gray-900"
            required
            placeholder="crypress"
          />
          <label htmlFor="id_chauffeur">
            Id du chauffeur <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="p-2 text-gray-900"
            required
            placeholder="CH025"
          />
          <label htmlFor="nom_chauffeur">
            Nom du chauffeur <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="p-2 text-gray-900"
            required
            placeholder="Durant"
          />
          <label htmlFor="volume_entree">
            Volume sortir <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="p-2 text-gray-900"
            required
            placeholder="52"
          />
          <label htmlFor="heure_d'arriver">
            Heure de debart <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className="p-2 text-gray-900"
            required
            placeholder="8:00"
          />
          <label htmlFor="type_essence">
            Type d'essence <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="p-2 text-gray-900"
            required
            placeholder="chain"
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
        {selectedProduct && (
          <div className="m-8 text-center flex gap-4 flex-col capitalize">
            <h2 className="text-2xl pb-2 "> {selectedProduct.nom}</h2>
            <p>id_chauffeur: {selectedProduct.id_chauffeur}</p>
            <p>nom_chauffeur: {selectedProduct.nom_chauffeur}</p>
            <p>nom_chauffeur: {selectedProduct.nom_chauffeur}</p>
            <p>type_essence: {selectedProduct.type_essence}</p>
            <p>quantite:{selectedProduct.quantite}</p>
            <p>heure depart:{selectedProduct.heure_arriver}</p>
            <p></p>
          </div>
        )}
      </Modals>
      <Modals
        open={deleteItemModal}
        onClose={() => {
          setDeleteItemModal(false);
        }}
      >
        {onSelectedDelete && (
          <div className="flex flex-col gap-4 min-h-52 min-w-52 justify-center items-center">
            <FaTrashAlt size={50} className="text-red-600" />
            <p className="text-2xl">Supprimer</p>
            <p>{onSelectedDelete.id}</p>
            <p>{onSelectedDelete.nom}</p>

            <div className="flex flex-row gap-10 justify-between">
              <button
                onClick={() => onFinalDeleteClick(onSelectedDelete.id)}
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

      <div className="flex justify-start my-5 flew-row overflow-clip">
        <div
          onClick={() => setOpenAdd(true)}
          className="flex justify-center gap-2"
        >
          <span className="p-1 bg-green-400  hover:bg-green-600 cursor-pointer">
            <FaPlus />
          </span>
          Ajouter
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-between w py-2 bg-gray-200 dark:bg-gray-700">
          <p className="w-1/4 justify-center flex">Nom Produit</p>
          <p className="w-1/4 justify-center flex">Quantite</p>
          <p className="w-1/4 justify-center flex">Heure depart</p>
          <p className="w-1/4 justify-center flex"> detail / supprimer</p>
        </div>
        <div className="flex flex-col overflow-y-scroll max-h-80 max-w-full relative pb-1 pr-1 h-96">
          {productList.map((index) => (
            <div
              className="flex flex-row justify-between border-y-1 py-2"
              key={index.id}
            >
              <p className="w-1/4 justify-center flex">{index.nom}</p>
              <p className="w-1/4 justify-center flex">{index.quantite}</p>
              <p className="w-1/4 justify-center flex">{index.heure_arriver}</p>
              <div className="w-1/4 justify-center flex flew-row gap-4">
                <div
                  className="p-1  bg-orange-400 hover:bg-orange-600 hover:cursor-pointer text-gray-100 "
                  onClick={() => {
                    onProductClick(index);
                  }}
                >
                  <FaEye />
                </div>
                <div
                  onClick={() => onDeleteClick(index)}
                  className="p-1 bg-red-400 hover:cursor-pointer hover:bg-red-600 text-gray-100"
                >
                  <FaTrashAlt />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Dashboard>
  )
}
