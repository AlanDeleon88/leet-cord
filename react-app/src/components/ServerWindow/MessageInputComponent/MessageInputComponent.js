import { useState } from "react"
import './MessageInputComponent.css'
import { useDispatch } from "react-redux"
import { postNewMessage } from "../../../store/channelMessage"
const MessageInputComponent = ({channelId}) =>{
    const [body, setBody] = useState('')
    const [img, setImg] = useState('')
    const dispatch = useDispatch()

    const updateBody = (e) =>{
        setBody(e.target.value)
    }

    const submitMessage = (e) =>{
        e.preventDefault();
        setBody('')
        let newMsg = {
            'body' : body,
            'img' : img
        }
        // console.log('TESTING POST MSG', newMsg);
        if(!newMsg.body && !newMsg.img){
            //NOP
        }
        else{
            dispatch(postNewMessage(channelId, newMsg))

        }
    }

    return(
        <>

                <form onSubmit={submitMessage} className='msg-form-container'>
                    <div className="input-wrapper">
                        <input  type='text' className="message-input-box" value={body} onChange={updateBody}/>
                    </div>
                </form>


        </>
    )


}


export default MessageInputComponent
