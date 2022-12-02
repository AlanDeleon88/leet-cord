import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ImageUploadComponent from "./ImageUploadComponent"
import './ServerForm.css'

import { addUserServer } from "../../../store/servers"

const ServerForm = ({setShowModal, setShowMenu, setActiveClass}) =>{
    const [name, setName] = useState('')
    const user = useSelector(state => state.session.user)
    const [description, setDescription] = useState('')
    const [server_icon, setServerIcon] = useState('')
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch();


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

                             Create a Server

                </div>

                <div className="upload-img-container">
                    <ImageUploadComponent setServerIcon={setServerIcon}/>

                </div>

                <div className="server-form-container">
                    <form onSubmit={handleSubmit} className='server-form'>
                        <label> Server Name</label>
                        <div>
                        {errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                         ))}
                        </div>
                        <input
                            type='text'
                            className="server-name-input"
                            placeholder="Server name"
                            value={name}
                            onChange={updateName}/>

                        <label>Server Description</label>
                        <input
                            type='text'
                            className="server-description-input"
                            placeholder="Server description"
                            value={description}
                            onChange={updateDescription}

                        />
                        <div className='server-form-buttons'>
                            <button className="server-back-button" type='button' onClick={() =>{
                                setShowModal(false);
                                setShowMenu(false);
                            }}> Back</button>
                            <button type="submit" className="server-submit-button" disabled={!name}>Create Server</button>

                        </div>
                    </form>


                </div>

            </div>


        </>
    )

}

export default ServerForm
