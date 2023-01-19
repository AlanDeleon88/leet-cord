import { useState } from "react"
import './MessageInputComponent.css'
import { useDispatch,useSelector } from "react-redux"
import { postNewMessage } from "../../../store/channelMessage"
import {BsPlusLg} from 'react-icons/bs'
import {MdOutlineCancel} from 'react-icons/md'
const MessageInputComponent = ({channelId}) =>{
    const [body, setBody] = useState('')
    const [img, setImg] = useState('')
    const [imgName, setImgName] = useState('')
    const channel = useSelector(state => state.channel)
    const dispatch = useDispatch()

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
            dispatch(postNewMessage(channelId, newMsg))
            setImg('')
            setImgName('')

        }
    }

    return(
        <>
            {channelId &&
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

                            <input  type='text' className="message-input-box" value={body} onChange={updateBody} placeholder={`Message # ${channel.name}`}/>

                    </form>
                </div>

                </>

            }


        </>
    )


}


export default MessageInputComponent
