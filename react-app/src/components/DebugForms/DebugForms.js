import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getServers } from '../../store/servers';
//! DEBUG FORMS FOR SERVERS
const DebugForms = () =>{
    const [serverName, setServerName] = useState('')
    const [serverDesc, setServerDesc] = useState('')
    const [serverIcon, setServerIcon] = useState('')
    const [editServerName, setEditServerName] = useState('')
    const [editServerDesc, setEditServerDesc] = useState('')
    const [editServerIcon, setEditServerIcon] = useState('')
    const [serverId, setServerId] = useState(0)
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

    const updateEditServerName = (e) => {
        setEditServerName(e.target.value)
    }

    const updateEditServerDesc = (e) => {
        setEditServerDesc(e.target.value)
    }

    const updateEditServerIcon = (e) => {
        setEditServerIcon(e.target.value)
    }

    const updateServerId = (e) =>{
        setServerId(e.target.value)
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
            dispatch(getServers())
            setServerName('')
            setServerDesc('')
            setServerIcon('')
        }
    }

    const handleServerNameEdit = async (e) =>{
        e.preventDefault();
        const response = await fetch(`/api/servers/${serverId}/name`,{
            method : 'PUT',
            headers:{
                'Content-Type' : 'application/json'
            },
                body: JSON.stringify({
                    name : editServerName,
            })
        })

        if(response.ok){
            let data = await response.json()
            //!temp way to update servers on the server list
            dispatch(getServers())
            console.log(data);
            setEditServerName('')
        }
    }

    const handleServerDescriptionEdit = async (e) =>{
        e.preventDefault();
        const response = await fetch(`/api/servers/${serverId}/desc`,{
            method : 'PUT',
            headers:{
                'Content-Type' : 'application/json'
            },
                body: JSON.stringify({
                    description : editServerDesc,
            })
        })

        if(response.ok){
            let data = await response.json()
            //!temp way to update servers on the server list
            dispatch(getServers())
            console.log(data);
            setEditServerDesc('')
        }
    }

    const handleServerIconEdit = async (e) =>{
        e.preventDefault();
        const response = await fetch(`/api/servers/${serverId}/server_icon`,{
            method : 'PUT',
            headers:{
                'Content-Type' : 'application/json'
            },
                body: JSON.stringify({
                    server_icon : editServerIcon,
            })
        })

        if(response.ok){
            let data = await response.json()
            //!temp way to update servers on the server list
            dispatch(getServers())
            console.log(data);
            setEditServerIcon('')
        }
    }




    return(
        <>
            <div>
                <h3> New Server</h3>
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
            <div>
                <h2>Edit existing server</h2>
                <h3>Edit ServerName</h3>
                <form onSubmit={handleServerNameEdit}>
                    <label>server ID</label>
                    <input name='serverId' type='number' value={serverId} onChange={updateServerId}/>
                    <label>server name</label>
                    <input name='serverName' type='text' value={editServerName} onChange={updateEditServerName}/>
                    <button type='submit'>Submit</button>
                </form>

                <h3>Edit Server description</h3>
                <form onSubmit={handleServerDescriptionEdit}>
                    <label>serverId</label>
                    <input name='serverId' type='number' value={serverId} onChange={updateServerId}/>
                    <label>server description</label>
                    <input name='serverDescription' type='text' value={editServerDesc} onChange={updateEditServerDesc}/>
                    <button type='submit'>Submit</button>
                </form>

                <h3>Edit Server Icon</h3>
                <form onSubmit={handleServerIconEdit}>
                    <label>serverId</label>
                    <input name='serverId' type='number' value={serverId} onChange={updateServerId}/>
                    <label>server icon</label>
                    <input name='serverIcon' type='text' value={editServerIcon} onChange={updateEditServerIcon}/>
                    <button type='submit'>Submit</button>
                </form>
            </div>


        </>
    )

}

export default DebugForms
