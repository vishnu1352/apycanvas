import React, { useEffect, useRef, useState } from "react";
import { MdCurrencyRupee, MdFilterListAlt } from "react-icons/md";
import Popup from "./Popup";
import Header from "./Header";
import Modalcomponent from "./Modalcomponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "react-bootstrap";
import { ItemsFromApi } from "../utils/ItemsFromApi";
import "./Items.scss";
import { APPTITLE } from "../utils/URL";
import { useNavigate } from "react-router-dom";

const Items = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [itemForModal, setItemForModal] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [showSno, setShowSno] = useState(false);
  const [sortedItemsList, setSortedItemsList] = useState([]);
  const [originalItemsList, setOriginalItemsList] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedSortByType, setSelectedSortByType] = useState([]);
  const uniqueItemTypesRef = useRef([]);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const toggleFilterModal = () => {
    setShowFilterModal((prev) => !prev);
  };

  

  const filteredItems = sortedItemsList.filter((item) => {
    if (
      selectedLetters.length === 0 ||
      selectedLetters.includes(item.letter.toUpperCase())
    ) {
      return item;
    }
    return false;
  });

  const getAllItems = async () => {
    const myPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await ItemsFromApi();
        if (response) {
          setOriginalItemsList(response.reverse());

          // Set unique item types
          uniqueItemTypesRef.current = [
            ...new Set(response.map((item) => item.type)),
          ];
          resolve();
        } else {
          reject();
        }
      } catch (error) {
        console.error("Error fetching items:", error);
        reject(error);
      }
    });

    toast.promise(myPromise, {
      pending: "Loading Items",
      success: "Items Loaded",
      error: "Error Occured",
    });
  };

  useEffect(() => {
    getAllItems();
  }, []);

  useEffect(() => {
    const itemsFilteredByType = originalItemsList.filter(
      (item) =>
        selectedSortByType.length === 0 ||
        selectedSortByType.includes(item.type)
    );
    setSortedItemsList(itemsFilteredByType);
  }, [selectedSortByType, originalItemsList]);

  const sortBy = (sortby) => {
    const sorted = [...sortedItemsList].sort((a, b) => {
      if (sortby === "hl") {
        return b.price - a.price; // High to Low
      }
      if (sortby === "lh") {
        return a.price - b.price; // Low to High
      }
      return 0;
    });
    setSortedItemsList(sorted);
    setSelectedSort(sortby);
  };

  const filterByType = (type) => {
    setSelectedSortByType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleItemClick = (item) => {
    setItemForModal(item);
    toggleModal();
  };

  return (
    <>
      <Header>
      <p className="m-0 p-3 text-center fs-18" onDoubleClick={()=>navigate("/login")}>{APPTITLE}</p>
        <p
          className="menuicon m-0 p-3"
          onClick={toggleFilterModal}
          style={{ cursor: "pointer" }}
        >
          <MdFilterListAlt />
        </p>
      </Header>
      <ToastContainer position="top-right" autoClose={1000} />
      <div className="itemsdiv my-4">
        {filteredItems && filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div
              className="itemcontainer"
              
              key={item._id} // Use a unique identifier
            >
              <div>
                <img src={item.imageUrl} alt="keychain" className="image" />
              </div>
              <div className="mt-2 fs-12 fw-500 px-3">{item.itemName}</div>
              <div className="px-3 d-flex justify-content-between align-items-end mb-2">
                <div>
                  
                  <div className="price">
                    <div>
                      <span><MdCurrencyRupee /> {item.price}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="selectbtn fs-10 px-2 py-1 rounded" onClick={() => handleItemClick(item, index + 1)}>Select</span>
                </div>
              </div>
              {showSno && (
                <div className="fs-10 d-flex justify-content-center">
                  {index + 1}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <img
              src="https://lh3.googleusercontent.com/pw/AP1GczO63fbtt-z8KWCPO2kXnKjhuiKKJbUPXtcC5Mq3VTOjp8XqnJPBsGBgoitFubiL5RQcpcDIrJl7H5vFVlvNl1TFOZzEqlhURmaou0sX7dUv7E8xufCD=s250-p-k"
              alt="No Results Found"
            />
          </div>
        )}

        {showModal && (
          <Popup
            toggle={showModal}
            toggleModal={toggleModal}
            data={itemForModal}
          />
        )}
        {showFilterModal && (
          <Modalcomponent show={showFilterModal} onHide={toggleFilterModal}>
            <p className="fs-18">
              <b
                onClick={() => {
                  setShowSno((prev) => !prev);
                  setShowFilterModal((prev) => !prev);
                }}
              >
                Sort By Price
              </b>
            </p>
            <div className="d-flex gap-2 border-bottom-1">
              <div
                onClick={() => sortBy("hl")}
                className={
                  selectedSort === "hl"
                    ? "sort-selected fs-12"
                    : "sort-disabled fs-12"
                }
              >
                High to low
              </div>
              <div
                onClick={() => sortBy("lh")}
                className={
                  selectedSort === "lh"
                    ? "sort-selected fs-12"
                    : "sort-disabled fs-12"
                }
              >
                Low to High
              </div>
            </div>

            

            <div className="divider my-3"></div>
            <p className="fs-18">
              <b>Filter By Type</b>
            </p>
            <div className="d-flex gap-2 flex-wrap">
              {uniqueItemTypesRef.current.map((type, index) => (
                <div
                  key={type} // Added unique key
                  onClick={() => filterByType(type)}
                  className={
                    selectedSortByType.includes(type)
                      ? "sort-selected fs-12"
                      : "sort-disabled fs-12"
                  }
                >
                  {type}
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-end">
              <Button onClick={toggleFilterModal} className="fs-12">
                Close
              </Button>
            </div>
          </Modalcomponent>
        )}
      </div>
    </>
  );
};

export default Items;
