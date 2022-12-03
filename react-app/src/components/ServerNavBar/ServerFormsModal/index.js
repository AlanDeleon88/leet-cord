import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import ServerForm from "./ServerForm";
import { AiOutlinePlusSquare } from "react-icons/ai";
import {FaPlus} from 'react-icons/fa'


const ServerFormsModal = ({server, setActiveClass}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>

        <FaPlus
        className="icon-buttons side-step"
        onClick={() =>{

          setShowModal(!showModal)
          setActiveClass(true)

        }




        }/>

      {showModal && (
        <Modal onClose={() =>
          {

            setShowModal(false)
            setActiveClass(false)


          }
          }>
          <ServerForm onClose={() => setShowModal(false)} setShowModal={setShowModal} server={server} setActiveClass={setActiveClass}/>
        </Modal>
      )}
    </>
  );
};

export default ServerFormsModal;
