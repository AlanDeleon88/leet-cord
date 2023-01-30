import { useState } from "react"
import './MessageInputComponent.css'
import { useDispatch,useSelector } from "react-redux"
import { postNewMessage } from "../../../store/channelMessage"
import {BsPlusLg} from 'react-icons/bs'
import {MdOutlineCancel} from 'react-icons/md'
import { postDmMsg } from "../../../store/dmMessages"
import { getChannel } from "../../../store/channel"
import { getMessageId } from "../../../store/focusChMessage"
const MessageInputComponent = ({channelId, dmId, socket, currRoom}) =>{
    const [body, setBody] = useState('')
    const [img, setImg] = useState('')
    const [imgName, setImgName] = useState('')
    const channel = useSelector(state => state.channel)
    const dmRoom = useSelector(state=>state.focusDm)
    const dispatch = useDispatch()
    // console.log(socket);

    const updateBody = (e) =>{
        setBody(e.target.value)
    }

    const handleImg = async e =>{
        const image = e.target.files[0]
        console.log(image);

        const formData = new FormData()

        if(image){

            formData.append('image', image)

            const res = await fetch('/api/img/upload', {
                method:'POST',
                body: formData
            })

            if(res.ok){
                const img_url = await res.json();
                setImg(img_url.url)
                setImgName(image.name)
            }
            else if(res.status < 500){
                const error = []
                error.push('File not uploaded, an error occured')
                window.alert(error[0])
            }

        }

    }

    const deleteImg = e =>{
        setImg('')
        setImgName('')
    }

    const submitMessage = (e) =>{
        e.preventDefault();
        setBody('')
        let newMsg = {
            'body' : body,
            'img' : img
        }
        // console.log('TESTING POST MSG', newMsg);
        if(!newMsg.body.trim() && !newMsg.img.trim()){
            //NOP
        }
        else{
            if(channelId){
                dispatch(postNewMessage(channelId, newMsg)).then(newMessage =>{
                    if(newMessage.id){
                        // console.log(currRoom);
                        // console.log(newMessage);
                        // console.log(socket);
                        // console.log(socket);
                        socket.send({newMessage, room: currRoom })
                        // socket.emit('chat', newMessage)
                        dispatch(getMessageId(newMessage.id))
                        // dispatch(getChannel(channelId))
                    }
                })

            }
            else if(dmId){
                //! dispatch for posting dm message here.

                dispatch(postDmMsg(dmId, newMsg)).then(newMessage =>{
                    if(newMessage.id){
                        // console.log(socket);
                        socket.send({newMessage, room: currRoom })
                    }
                })
            }
            setImg('')
            setImgName('')

        }
    }

    return(
        <>

                <>
                    {img &&
                    <div className="demo-img-container">
                        <div className="img-cancel-bundle">
                            <img src={img} className='msg-img-prev'/>
                            <button className="cancel-img-button" onClick={deleteImg}>
                                <MdOutlineCancel />
                            </button>
                        </div>
                        <div className="img-name">
                            {imgName}
                        </div>

                    </div>}
                <div className="input-wrapper">

                    <div className="msg-img-button-container">
                        <button className="msg-img-button"
                                onClick={() =>{
                                    document.getElementById('msg-img-file').click()
                                }}
                                >
                                <BsPlusLg />
                        </button>

                    </div>
                    <input type= 'file' accept="image/*" style={{display: 'none'}} id='msg-img-file' onChange={handleImg} onClick={(e) => e.target.value = null}/>
                    <form onSubmit={submitMessage} className='msg-form-container'>

                            <input  type='text' className="message-input-box" value={body} onChange={updateBody} placeholder={dmId ? `Message @${dmRoom.other_user.username}` : `Message # ${channel.name}`}/>

                    </form>
                </div>

                </>




        </>
    )


}


export default MessageInputComponent
