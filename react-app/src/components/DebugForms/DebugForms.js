import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getServers } from '../../store/servers';

const DebugForms = () =>{
    const [serverName, setServerName] = useState('')
    const [serverDesc, setServerDesc] = useState('')
    const [serverIcon, setServerIcon] = useState('')
    const dispatch = useDispatch();

    const updateServerName = (e) =>{
        setServerName(e.target.value)
    }

    const updateServerDesc = (e) =>{
        setServerDesc(e.target.value)
    }

    const updateServerIcon = (e) => {
        setServerIcon(e.target.value)
    }

    const handleServerSubmit = async (e) =>{
        e.preventDefault();
        let server = {
            name : serverName,
            description: serverDesc,
            server_icon : serverIcon
        }
        console.log('HERE!!!');
        //TODO create thunk action for adding a new post. OR just do a fetch here..
        const response = await fetch('/api/servers/', {
            method : 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
                body: JSON.stringify({
                    name : serverName,
                    description : serverDesc,
                    server_icon : serverIcon

            })

        })

        if(response.ok){
            let data = await response.json()
            //!temp way to update servers on the server list
            dispatch(getServers())
            console.log(data);
        }


    }

    return(
        <>
            <div>
                <form onSubmit={handleServerSubmit}>
                    <label>server name</label>
                    <input name='serverName' type='text' value={serverName} onChange={updateServerName}/>
                    <label>server description</label>
                    <input name='serverDescription' type='text' value={serverDesc} onChange={updateServerDesc}/>
                    <label>server icon</label>
                    <input name='serverIcon' type='text' value={serverIcon} onChange={updateServerIcon}/>
                    <button type='submit'>Submit</button>
                </form>
            </div>

            
        </>
    )

}

export default DebugForms
