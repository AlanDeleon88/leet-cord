import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ImageUploadComponent from "./ImageUploadComponent"
import './ServerForm.css'
import { useHistory } from "react-router-dom"
import { addUserServer } from "../../../store/servers"
import { getIdServer } from "../../../store/focusServer"
import { getChannel } from "../../../store/channel"
import { getChannelMessages } from "../../../store/channelMessage"

//MdAddAPhoto

const ServerForm = ({setShowModal, setShowMenu, setActiveClass}) =>{
    const [name, setName] = useState('')
    const user = useSelector(state => state.session.user)
    const [description, setDescription] = useState('')
    const [server_icon, setServerIcon] = useState('')
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch();
    const history = useHistory();


    const handleSubmit = async (e) =>{
        e.preventDefault();
        const newServer = {
            name: name,
            description: description,
            server_icon: server_icon
        }
        if(user){
            return await dispatch(addUserServer(newServer)).then((res) =>{
                if(res.id){
                    // console.log(errors);
                    setShowModal(false);
                    setActiveClass(false);
                    // dispatch(getIdServer(res.id))
                    // dispatch(getChannel(res.channels[0].channel_id))
                    dispatch(getChannelMessages(res.channels[0].channel_id))
                    // console.log('DEBUG PLACE1===============================', res.channels[0].channel_id);
                    history.push(`/server/${res.id}/channel/${res.channels[0].channel_id}`)

                }
                else{

                    setErrors(res);


                }

            })
        }


    }

    const updateName = (e) =>{
        setName(e.target.value)
    }

    const updateDescription = (e) =>{
        setDescription(e.target.value)
    }

    return(
        <>
            <div className="add-server-container">
                <div className="form-header">

                             Customize your server

                </div>
                <div>
                        {errors.map((error, ind) => (
                                <div key={ind} className='error'>{error}</div>
                         ))}
                        </div>

                <div className="upload-img-container">
                    <ImageUploadComponent setServerIcon={setServerIcon}/>

                </div>

                <div className="server-form-container">
                    <form onSubmit={handleSubmit} className='server-form'>
                        <label> Server Name</label>

                        <input
                            type='text'
                            className="server-name-input"
                            placeholder="Server name"
                            value={name}
                            onChange={updateName}

                            />

                        <label>Server Description</label>
                        <input
                            type='text'
                            className="server-description-input"
                            placeholder="Server description"
                            value={description}
                            onChange={updateDescription}

                        />
                    </form>


                </div>
                        <div className='server-form-buttons'>
                            <button onClick={handleSubmit} type="submit" className="server-submit-button serv-button">Create Server</button>
                            <button className="server-back-button serv-button" type='button' onClick={() =>{
                                setShowModal(false);
                                setActiveClass(false);
                                // setShowMenu(false);
                            }}> Back</button>

                        </div>

            </div>


        </>
    )

}

export default ServerForm
