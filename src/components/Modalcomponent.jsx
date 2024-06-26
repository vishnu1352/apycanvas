import React from 'react'
import Modal from "react-bootstrap/Modal";

const Modalcomponent = ({show,onHide,classname,children}) => {
  return (
    <Modal backdrop="static"
    keyboard={false} show={show} onHide={onHide} className={classname}>
       
        <Modal.Body>{children}</Modal.Body>
      
    </Modal>
  )
}

export default Modalcomponent