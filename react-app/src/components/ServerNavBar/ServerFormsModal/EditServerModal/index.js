import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditServerForm from "./EditServerModal";



const EditServerModal = ({server}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>

        <div onClick={() => setShowModal(!showModal)}>
            Edit
        </div>


      {showModal && (
        <Modal onClose={() =>
          {

            setShowModal(false)


          }
          }>
          <EditServerForm onClose={() => setShowModal(false)} setShowModal={setShowModal} server={server}/>
        </Modal>
      )}
    </>
  );
};

export default EditServerModal;
