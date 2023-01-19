import './MessageComponent.css'
import { useState, useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import MessageOptionComponent from './MessageOptionComponent/MessageOptionComponent'
import MessageDeleteModal from './MessageDeleteModal'
import { Modal } from '../../../context/Modal'
import { editChMessage } from '../../../store/channelMessage'
import { getMessageId } from '../../../store/focusChMessage'
import formatDate from './formatDate'
const MessageComponent = ({message, channelId, preview, showEdit}) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    //!instead of using a use state, maybe do a useSelector with a redux store.
    const [showEditMessage, setShowEditMessage] = useState(showEdit);
    const dispatch = useDispatch();
    //!issue with not being insync with the message channels data for
    //! editing message. need to look into this.
    //! i think the dispatch for getting the messages is happening too late
    //! so when this renders the use state data is stale.
    //! i think use state is saving the previous state from the last message maybe?
    const [editMessage, setEditMessage] = useState('');
    // console.log(editMessage, message.body);

    useEffect(() =>{
        setShowEditMessage(false);
    },[showEdit])

    const mouseLeave = (e) => {
        if(!preview){
            setShowMenu(false)

        }
        // console.log('mouse left falsE');

    }
    const mouseEnter = (e) =>{
        if(!preview){
            setShowMenu(true)

        }
        // dispatch(getMessageId(message.message_id))
        // console.log('mouse enter TRUEEEEEE');
    }

    const updateEdit = (e) =>{
        setEditMessage(e.target.value)
    }

    const handleCancel = (e) =>{
        setShowEditMessage(false)
        setEditMessage('');
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
            <div className={preview ? 'prev-message-bundle-container' : "message-bundle-container"} onMouseLeave={mouseLeave} onMouseOver = {mouseEnter}>
                <div className="user-pic-container">

                    <img src={message.sender_icon} className='user-pic'/>

                </div>

                <div className={preview ? 'prev-message-bundle' : "message-bundle"}>
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
                                    <MessageOptionComponent setShowEditMessage={setShowEditMessage} setShowDeleteModal={setShowDeleteModal} message={message}/>
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
                        <div className={preview? 'prev-msg-body':'msg-body'}>
                            {showEditMessage ?
                                (
                                    <>
                                        <div className='edit-msg-input-container'>
                                            <form onSubmit={handleUpdate} style={{width: '100%'}}>
                                                <input type='text' onChange={updateEdit} value={editMessage ? editMessage : message.body} className='edit-msg-input'/>

                                            </form>
                                            <button onClick={handleCancel} className='edit-msg-cancel-btn' id='cancel-button'>Cancel</button>
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
                    <MessageDeleteModal setShowDeleteModal={setShowDeleteModal} message={message}/>
                </Modal>

                </>

            }

        </>
    )

}

export default MessageComponent
