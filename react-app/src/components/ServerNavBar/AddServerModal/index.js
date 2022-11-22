import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import AddServerForm from "./AddServerForm";
import { AiOutlinePlusSquare } from "react-icons/ai";
import {FaPlus} from 'react-icons/fa'


const AddServerModal = ({type, server}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <FaPlus
        className="icon-buttons side-step"
        onClick={() => setShowModal(!showModal)}
      />

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddServerForm onClose={() => setShowModal(false)} setShowModal={setShowModal} type={type} server={server}/>
        </Modal>
      )}
    </>
  );
};

export default AddServerModal;
