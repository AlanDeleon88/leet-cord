import { useState } from "react"
import './MessageOptionComponent.css'
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Fill} from "react-icons/ri";


const MessageOptionComponent = ({message, setShowEditMessage, setShowDeleteModal}) =>{
    const handleEdit = () =>{
        setShowEditMessage(true)
    }

    const handleDelete = () =>{
        setShowDeleteModal(true)
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
