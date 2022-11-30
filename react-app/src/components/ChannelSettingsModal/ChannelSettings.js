import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RiDeleteBin5Fill} from "react-icons/ri";
import './ChannelSettings.css'

const ChannelSettings = ({channel, setShowSettingModal}) =>{
    const [name,setName] = useState('')
    const [inputtedName, setInputtedName] = useState(false)

    const [description, setDescription] = useState('')
    const [inputtedDesc, setInputtedDesc] = useState(false)

    const updateName = e =>{
        setName(e.target.value)
        setInputtedName(true)
    }
    const updateDescription = e =>{
        setDescription(e.target.value)
        setInputtedDesc(true)
    }

    const handleSave = e => {

    }

    return(
        <>
            <div className="edit-channel-container">
                <div className="edit-channel-caption">
                    Edit Channel
                    <div>
                    <button className="ch-del ch-edit">
                            <RiDeleteBin5Fill />
                        </button>
                    </div>
                </div>
                <div className="edit-channel-form-container">

                    <div className="ch-name-ipnut-container">
                        <label className="input-labels">Name</label>
                        <input type='text' value={inputtedName ? name : channel.name} onChange={updateName} className='edit-text'/>
                    </div>

                    <div className="ch-desc-input-container">
                        <label className="input-labels">Description</label>
                        <input type='text' value={inputtedName ? description : channel.description} onChange={updateName} className='edit-text'/>
                    </div>


                </div>
                    <div className="buttons-container">
                        <button type='submit' className='ch-save ch-edit'>
                            Save
                        </button>
                        <button className='ch-cancel ch-edit'>
                            Cancel
                        </button>

                    </div>

            </div>
        </>
    )
}

export default ChannelSettings
