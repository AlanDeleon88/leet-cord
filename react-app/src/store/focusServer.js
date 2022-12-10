import { getUserServers } from "./servers"
const GET_SERVER = 'focus_server/GET_SERVER'
const ADD_CHANNEL = 'focus_server/ADD_CHANNEL'
const EDIT_CHANNEL = 'focus_server/EDIT_CHANNEL'
const DELETE_CHANNEL = 'focus_server/DELETE_CHANNEL'

const getServerAction = (server) => ({
    type: GET_SERVER,
    payload: server
})

const addChannelAction = (channel) =>({
    type: ADD_CHANNEL,
    payload: channel
})

const editChannelAction = (channel) => ({
    type: EDIT_CHANNEL,
    payload: channel
})

const deleteChannelAction = (channelId) => ({
    type: DELETE_CHANNEL,
    payload: channelId
})


export const getIdServer = (id) => async (dispatch) => {
    const response = await fetch(`/api/servers/${id}`)

    if(response.ok){
        const data = await response.json()
        // console.log('in thunk for id server!==============', data);
        dispatch(getServerAction(data))
        return data

    }
}

export const updateServerName = (server, userId) => async(dispatch) =>{
    // console.log('IN THUNK------------------------', server);
    const response = await fetch(`/api/servers/${server.id}/name`, {
        method : 'PUT',
        headers:{
            'Content-Type' : 'application/json'
        },
            body: JSON.stringify({
                name : server.name,
        })

    })

    if(response.ok){
        const data = await response.json()
        dispatch(getServerAction(data))
        dispatch(getUserServers(userId))
        dispatch(getIdServer(server.id))
        return null
    }
    else if(response.status < 500){
        const data = await response.json()
        // console.log('ERROR HANDLE THUINKK------------------------------', data);
        return data
    }

}

export const updateServerDesc = (server, userId) => async(dispatch) =>{
    const response = await fetch(`/api/servers/${server.id}/desc`, {
        method : 'PUT',
        headers:{
            'Content-Type' : 'application/json'
        },
            body: JSON.stringify({
                description : server.description,
        })

    })

    if(response.ok){
        const data = await response.json()
        dispatch(getServerAction(data))
        dispatch(getUserServers(userId))
    }
    else if(response.status < 500){
        const data = await response.json()
        return data
    }

}

export const updateServerIcon = (server, userId) => async(dispatch) =>{
    // console.log(server);
    const response = await fetch(`/api/servers/${server.id}/server_icon`, {
        method : 'PUT',
        headers:{
            'Content-Type' : 'application/json'
        },
            body: JSON.stringify({
                server_icon : server.server_icon,
        })

    })
    if(response.ok){
        const data = await response.json()
        dispatch(getServerAction(data))
        dispatch(getUserServers(userId))
    }
    else if(response.status < 500){
        const data = await response.json()
        return data
    }
}

export const addChannel = (serverId, channel) => async (dispatch) =>{
    const response = await fetch(`/api/servers/${serverId}/channels`, {
        method : 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
            body: JSON.stringify({
                name: channel.name,
                description: channel.description
        })

    })

    if(response.ok){
        const data = await response.json()

        dispatch(addChannelAction(data))
        return null
    }
    else if (response.status < 500){
        const data = await response.json()
        // console.log(data);
        return data
    }

}

export const editChannel = (channel, serverId) => async dispatch =>{
    console.log('thunk!---------------', channel);
    const response = await fetch(`/api/channels/${channel.id}`,{
        method: 'PUT',
        headers:{
            'Content-Type' : 'application/json'
        },
            body: JSON.stringify({
                name: channel.name,
                description: channel.description
        })

    })
    if(response.ok){
        const data = await response.json();
        // dispatch(editChannelAction(data))
        dispatch(getIdServer(serverId))
        return null
    }
    else if (response.status < 500){
        const data = await response.json()
        return data
    }
}

export const deleteChannel = (channelId, serverId) => async dispatch =>{
    const response = await fetch(`/api/channels/${channelId}`, {
        method: 'DELETE',
        headers:{
            'Content-Type' : 'application/json'
        },
    })

    if(response.ok){
        const data = await response.json()
        //!maybe need to write a case for this?
        // dispatch(deleteChannelAction(data.id))
        dispatch(getIdServer(serverId))
    }
}




export default function focusServerReducer(state = {}, action){
    let newState;

    switch(action.type){
        case GET_SERVER:
            newState = {...action.payload}
            return newState
        case ADD_CHANNEL:{
            newState = {...state}
            let newChannel = {}
            newChannel['name'] = action.payload.name;
            newChannel['channel_id'] = action.payload.id;
            newChannel['description'] = action.payload.description;


            newState.channels.push(newChannel)
            return newState
        }
        default:
            return state
    }
}
