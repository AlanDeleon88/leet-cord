import './MessageComponent.css'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import MessageOptionComponent from './MessageOptionComponent/MessageOptionComponent'
import MessageDeleteModal from './MessageDeleteModal'
import { Modal } from '../../../context/Modal'
import { editChMessage } from '../../../store/channelMessage'
import formatDate from './formatDate'
const MessageComponent = ({message}) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditMessage, setShowEditMessage] = useState(false);
    const dispatch = useDispatch();
    const [editMessage, setEditMessage] = useState(message.body);

    const mouseLeave = (e) => {

        setShowMenu(false)
        // console.log('mouse left falsE');

    }
    const mouseEnter = (e) =>{
        setShowMenu(true)
        // console.log('mouse enter TRUEEEEEE');
    }

    const updateEdit = (e) =>{
        setEditMessage(e.target.value)
    }

    const handleCancel = (e) =>{
        setShowEditMessage(false)
    }

    const handleUpdate = async e =>{
        e.preventDefault();
        let editedMessage = {
            id:message.message_id,
            body: editMessage
        }
         console.log(editedMessage);
        if(!editedMessage.body){
            //? open up delete modal to confirm delete
        }
        else{

            const data = await dispatch(editChMessage(editedMessage))
            if(data){
                //!error handle here
            }
            else{
                setShowEditMessage(false);
            }
        }

    }

    return(
        <>
            <div className="message-bundle-container" onMouseLeave={mouseLeave} onMouseOver = {mouseEnter}>
                <div className="user-pic-container">

                    <img src={message.sender_icon} className='user-pic'/>

                </div>

                <div className="message-bundle">
                    <div className="username-bundle-container">
                        <div className="username-container">
                            {message.sender_username}

                        </div>
                        <div className="date-container">
                            <div className='msg-date'>

                                {message.updated_at}
                            </div>


                    {
                    showMenu &&
                    <>
                        {message.my_message &&
                            <>
                                <div className='msg-option-container'>
                                    <MessageOptionComponent setShowEditMessage={setShowEditMessage} setShowDeleteModal={setShowDeleteModal}/>
                                </div>
                            </>

                        }

                    </>
                }
                        </div>
                    </div>
                    <div className="message-body-container">
                        {message.img &&
                            <div className='mgs-img-container'>
                                <img src={message.img} className='msg-img'/>
                            </div>
                        }
                        <div className='msg-body'>
                            {showEditMessage ?
                                (
                                    <>
                                        <div className='edit-msg-input-container'>
                                            <form onSubmit={handleUpdate}>
                                                <input type='text' onChange={updateEdit} value={editMessage}/>

                                            </form>
                                            <button onClick={handleCancel}>Cancel</button>
                                        </div>
                                    </>
                                )
                                :
                                (
                                    <>
                                         {message.body}
                                    </>
                                )

                            }

                        </div>


                    </div>

                </div>


            </div>
            {showDeleteModal &&
                <>
                <Modal onClose={() =>{
                setShowDeleteModal(false)
                }}>
                    <MessageDeleteModal />
                </Modal>

                </>

            }

        </>
    )

}

export default MessageComponent
