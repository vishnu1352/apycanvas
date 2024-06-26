import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import sendRequestFunc from "../../../utils/sendRequestFunc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASEURL } from "../../../utils/URL";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const ViewInventory = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate()

  const getAllItems = async () => {
    toast("Getting all items...");
    const response = await sendRequestFunc(`${BASEURL}/getAllItems`, "GET");
    if (response.statusCode === 200) {
      setItems(response.allItems);
    }
  };

  const redirectToEdit = (id)=>{
    navigate('/editinventory',{state:{id:id}})
  }
  const deleteItem =async(id)=>{
    toast.info("Deleting...")
    const response = await sendRequestFunc(`${BASEURL}/deleteItem/${id}`,'POST',{})
    if(response.statusCode === 200){
        getAllItems();
    }
  }


  useEffect(() => {
    getAllItems();
  }, []);
  return (
    <>
    <ToastContainer position="top-right" autoClose={1500} />
      <div className="p-3">
        <div>
          <Button onClick={()=>navigate('/addinventory')} className="fs-12"  >
            <MdOutlineKeyboardBackspace />
          </Button>
          
        </div>
        {items.map((item) => {
          return (
            <div className="d-flex justify-content-between align-items-center p-3 border border-light rounded my-3 shadow" >
              <div>
                <img src={item.imageUrl} alt="" style={{ width: "60px" }} />
              </div>
              <div>
                <p className="m-0">{item.price}</p>
              </div>
              <div>{item.type}</div>
              <div>
                <Dropdown size="sm" style={{"background":"none","border":"none"}}>
                  <Dropdown.Toggle >
                   
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>redirectToEdit(item._id)}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={()=>deleteItem(item._id)}>
                      Delete
                    </Dropdown.Item>
                    
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ViewInventory;
