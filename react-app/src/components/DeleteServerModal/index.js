import React, { useState } from "react";
import { Modal } from "../../../context/Modal";




const DeleteServerModal = ({server}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>

        <div onClick={() => setShowModal(!showModal)}>
            Delete
        </div>


      {showModal && (
        <Modal onClose={() =>
          {

            setShowModal(false)


          }
          }>
          <DeleteServer onClose={() => setShowDeleteModal(false)} setShowModal={setShowDeleteModal} server={server}/>
        </Modal>
      )}
    </>
  );
};

export default DeleteServerModal;
