import './MessageComponent.css'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
const MessageComponent = ({message}) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editMessage, setEditMessage] = useState(false);
    const user = useSelector(state => state.session.user);

    //! look into mouseover event to see if i can get option menu to show up.
    //! may need to look into how to set showmenu to false

    const mouseLeave = (e) =>{
        setShowMenu(false)
        // console.log('mouse left falsE');
    }

    const mouseEnter = (e) =>{
        setShowMenu(true)
        // console.log('mouse enter TRUEEEEEE');
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

                                {message.updated_at}


                    {
                    true &&
                    <>
                        {message.my_message &&
                            <>
                                <div className='msg-option-container'>
                                    test
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
                            {message.body}
                        </div>


                    </div>

                </div>


            </div>

        </>
    )

}

export default MessageComponent
