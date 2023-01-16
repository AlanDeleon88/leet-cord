import { useState } from "react"
import './MessageOptionComponent.css'
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Fill} from "react-icons/ri";
import { useDispatch } from "react-redux";
import { deleteChMessage } from "../../../../store/channelMessage";
// import { getMessageId } from "../../../../store/focusChMessage";


const MessageOptionComponent = ({message, setShowEditMessage, setShowDeleteModal, channelId}) =>{
    const dispatch = useDispatch();

    const handleEdit = () =>{
        setShowEditMessage(true)
        // dispatch(getMessageId(message.message_id))
    }

    const handleDelete = () =>{
        // setShowDeleteModal(true)
        dispatch(deleteChMessage(message.message_id))
        // console.log(message);
    }

    return(
        <>
            <div className= 'options-container'>
                <div className="edit-msg-button-container" onClick={handleEdit}>
                    <MdOutlineModeEditOutline />

                </div>
                <div className="delete-button-container" onClick={handleDelete}>
                    <RiDeleteBin5Fill />
                </div>
            </div>

        </>
    )

}

export default MessageOptionComponent
