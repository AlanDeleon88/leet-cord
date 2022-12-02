import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteChannel from "./DeleteChannel";
import { RiDeleteBin5Fill} from "react-icons/ri";



const DeleteChannelModal = ({serverId, channel}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>

        <button className="del-channel-button" onClick={() => setShowModal(!showModal)}>
            <RiDeleteBin5Fill />
        </button>


      {showModal && (
        <Modal onClose={() =>
          {

            setShowModal(false)


          }
          }>
          <DeleteChannel onClose={() => setShowModal(false)} setShowModal={setShowModal} serverId={serverId} channel={channel}/>
        </Modal>
      )}
    </>
  );
};

export default DeleteChannelModal;
