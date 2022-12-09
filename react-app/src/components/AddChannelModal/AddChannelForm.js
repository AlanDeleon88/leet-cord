import { useState, useSelector } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addChannel } from "../../store/focusServer"
import './AddChannelModal.css'

const AddChannelForm = ({serverId, setShowModal}) =>{
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

    const updateName = e =>{
        setName(e.target.value)
    }

    const updateDescription = e =>{
        setDescription(e.target.value)
    }

    const handleSubmit = async e =>{
        e.preventDefault();

        let newChannel = {
            name: name,
            description : description
        }

       const data = await dispatch(addChannel(serverId, newChannel));
       if (data){
        setErrors(data.errors);
        // console.log(data.errors);
       }
       else{
        setShowModal(false);
       }

    }

    const handleCancel = e =>{
        e.preventDefault();
        setShowModal(false);
    }

    return (
        <>
            <div className="channel-form-container">
                <div className="add-channel-caption">
                    Create a new chat channel
                </div>
                <form onSubmit={handleSubmit} className='channel-form'>
                     <div>
                        {errors.map((error, ind) => (
                                <div key={ind} className='error'>{error}</div>
                         ))}
                        </div>
                    <div className="channel-name input-container">
                        <input type='text'value={name} onChange={updateName} placeholder='Channel Name' className='channel-name-input'/>

                    </div>
                    <div className="channel-description input-container">
                        <input type='text' value={description} onChange={updateDescription} placeholder='Channel Description' className='channel-desc-input'/>
                    </div>

                    <div className="buttons-container">
                        <button type='submit' className="add-ch-form-button add-ch-yes">Submit</button>
                        <button onClick={handleCancel} className="add-ch-form-button add-ch-cancel">Cancel</button>
                    </div>

                </form>

            </div>
        </>
    )

}

export default AddChannelForm
