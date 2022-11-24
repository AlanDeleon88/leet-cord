import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import ServerForm from "./ServerForm";
import { AiOutlinePlusSquare } from "react-icons/ai";
import {FaPlus} from 'react-icons/fa'


const ServerFormsModal = ({server}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>

        <FaPlus
        className="icon-buttons side-step"
        onClick={() => setShowModal(!showModal)}/>

      {showModal && (
        <Modal onClose={() =>
          {

            setShowModal(false)


          }
          }>
          <ServerForm onClose={() => setShowModal(false)} setShowModal={setShowModal} server={server}/>
        </Modal>
      )}
    </>
  );
};

export default ServerFormsModal;
