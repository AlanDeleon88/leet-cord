import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AddChannelForm from "./AddChannelForm";
import {BsPlusLg} from 'react-icons/bs'
import './AddChannelModal.css'


const AddChannelModal = ({serverId}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>

        <button className='add-channel-button' onClick={() => setShowModal(!showModal)}>
            <BsPlusLg />
        </button>


      {showModal && (
        <Modal onClose={() =>
          {

            setShowModal(false)


          }
          }>
          <AddChannelForm onClose={() =>  setShowModal(false)} serverId = {serverId} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
};

export default AddChannelModal;
