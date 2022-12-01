import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RiDeleteBin5Fill} from "react-icons/ri";
import checkStr from "./checkStr";
import './ChannelSettings.css'
import { editChannel } from "../../store/focusServer";

const ChannelSettings = ({channel, setShowSettingModal, serverId}) =>{
    const [name,setName] = useState('')
    const [inputtedName, setInputtedName] = useState(false)

    const [description, setDescription] = useState('')
    const [inputtedDesc, setInputtedDesc] = useState(false)

    const [errors, setErrors] = useState([])

    const dispatch = useDispatch();

    const updateName = e =>{
        setName(e.target.value)
        setInputtedName(true)
    }
    const updateDescription = e =>{
        setDescription(e.target.value)
        setInputtedDesc(true)
    }

    const handleDelete = e =>{

    }

    const handleSave = async e => {
        //! at this point, might refactor backend channel edit to multiple endpoints.. kind of a pain to keep track of all this.

        if((!checkStr(name) && !checkStr(description)) && (inputtedName && inputtedDesc)){
            let errors = []
            errors.push('name and description cannot be empty')
            setErrors(errors)

        }
        else if(!checkStr(name) && inputtedName){
            let errors = []
            errors.push('name field cannot be empty')
            setErrors(errors)
        }
        else if(inputtedName || inputtedDesc){
            let formatName;
            let formatDesc;
            if(name){
                formatName = name.split(' ').join('-')
            }
            else{
                // setName(channel.name)
                formatName = channel.name.split(' ').join('-')
            }
            if(description){
                formatDesc = description.split(' ').join('-')

            }
            else{
                // setDescription(channel.description)
                formatDesc = channel.description.split(' ').join('-')
            }

            let updateChannel = {
                id: channel.channel_id,
                name: formatName,
                description: formatDesc
            }
            const data = await dispatch(editChannel(updateChannel, serverId))
            if(data){
                let errors = []
                errors.push(data.error)
                setErrors(errors)
                // console.log(data.error);
            }
            else{
                window.alert('settings saved')
            }

            // console.log(channel);
        }
        else{
            setShowSettingModal(false)
        }


    }

    return(
        <>
            <div className="edit-channel-container">
                <div className="edit-channel-caption">
                    Edit Channel
                    <div>
                    <button className="ch-del ch-edit" onClick={handleDelete}>
                            <RiDeleteBin5Fill />
                        </button>
                    </div>
                </div>
                <div className="edit-channel-form-container">
                        {errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                         ))}
                    <div className="ch-name-ipnut-container">
                        <label className="input-labels">Name</label>
                        <input type='text' value={inputtedName ? name : channel.name} onChange={updateName} className='edit-text'/>
                    </div>

                    <div className="ch-desc-input-container">
                        <label className="input-labels">Description</label>
                        <input type='text' value={inputtedDesc ? description : channel.description} onChange={updateDescription} className='edit-text'/>
                    </div>


                </div>
                    <div className="buttons-container">
                        <button onClick={handleSave} className='ch-save ch-edit'>
                            Save
                        </button>
                        <button className='ch-cancel ch-edit' onClick = {() =>{ setShowSettingModal(false)}}>
                            Cancel
                        </button>

                    </div>

            </div>
        </>
    )
}

export default ChannelSettings
