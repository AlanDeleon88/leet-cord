import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RiDeleteBin5Fill} from "react-icons/ri";
import checkStr from "./checkStr";
import './ChannelSettings.css'
import { editChannel } from "../../store/focusServer";
import DeleteChannelModal from "../DeleteChannelModal";
import { getChannel } from "../../store/channel";

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
        //? maybe i might make this whole check a modular and have it return an object...
        if((!checkStr(name) && !checkStr(description)) && (inputtedName && inputtedDesc)){ //*checks to see if inputs are just empty spaces.
            let errors = []
            errors.push('name and description cannot be empty')
            setErrors(errors)

        }
        else if(!checkStr(name) && inputtedName){ //*checks to see if only name is empty spaces
            let errors = []
            errors.push('name field cannot be empty')
            setErrors(errors)
        }
        else if(inputtedName || inputtedDesc){ //*checks to see if an input has been made to either input.
            let formatName;
            let formatDesc;
            if(name){ //* formats string to be ready to send to back end.
                formatName = name.split(' ').join('-')
            }
            else{
                // setName(channel.name)
                formatName = channel.name.split(' ').join('-')
            }
            if(description){ //* formats string to be ready to send to back end.
                formatDesc = description.split(' ').join('-')

            }
            else if(inputtedDesc && !description){ //* checks to see if any changes have been made to previous setting.
                formatDesc = description
            }
            else if(!inputtedDesc && !description){ //*if no changes has been made and no input has been made, it will send default data to backend.
                // setDescription(channel.description)
                formatDesc = channel.description.split(' ').join('-')
            }

            let updateChannel = {
                id: channel.channel_id,
                name: formatName,
                description: formatDesc
            }
            // console.log('TEST TO SEE DESC--------------------------------',updateChannel);
            const data = await dispatch(editChannel(updateChannel, serverId))
            if(data){
                let errors = []
                errors.push(data.error)
                setErrors(errors)
                // console.log(data.error);
            }
            else{
                setShowSettingModal(false)
                window.alert('settings saved')
                dispatch(getChannel(channel.channel_id))
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
                    <div className="ch-del ch-edit" >
                            <DeleteChannelModal serverId={serverId} channel={channel} setShowSettingModal={setShowSettingModal}/>
                        </div>
                    </div>
                </div>
                <div className="edit-channel-form-container">
                        {errors.map((error, ind) => (
                            <div key={ind} className='error'>{error}</div>
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
