import { useHistory } from "react-router-dom"
import { getIdServer } from "./focusServer"
import { getChannel } from "./channel"

const GET_SERVERS = 'servers/GET_SERVERS'
const ADD_SERVER = 'servers/ADD_SERVERS'
const DELETE_SERVER = 'servers/DELETE_SERVER'

const get_server_action = (servers) => ({
    type: GET_SERVERS,
    payload : servers
})

const add_server_action = (server) => ({
    type : ADD_SERVER,
    payload : server
})

const delete_server_action = (id) => ({
    type: DELETE_SERVER,
    payload: id
})

export const getServers = () => async (dispatch) => {
    const response = await fetch('/api/servers/')

    if(response.ok){
        const data = await response.json()
        // console.log('in thunk ---------------------------', data);
        dispatch(get_server_action(data.servers))

    }
}

export const getUserServers = (id) => async (dispatch) =>{
    const response = await fetch(`/api/users/${id}/servers`)

    if(response.ok){
        const data = await response.json()
        dispatch(get_server_action(data.servers))

    }
}


export const addUserServer = (server) => async (dispatch) =>{

    const response = await fetch('/api/servers/',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: server.name,
            description: server.description,
            server_icon: server.server_icon
          }),
    })
    if(response.ok){
        const data = await response.json()
        // console.log('TESTING HERE!!!!!!');
        dispatch(getIdServer(data.id))
        dispatch(getChannel(data.channels[0].channel_id))

        dispatch(add_server_action(data))
        return data
        //! dispatch here..
    }
    else if(response.status < 500){
        const data = await response.json()
        if(data.errors){
            return data.errors
        }
    }
}

export const joinServer = (id) => async (dispatch) =>{
    const response = await fetch(`/api/server_members/${id}`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },

    })
    if(response.ok){
        const data = await response.json()
        dispatch(getIdServer(data.id))
        dispatch(getChannel(data.channels[0].channel_id))

        dispatch(add_server_action(data))
        return data
    }
    else if(response.status < 500){
        const data = await response.json()
        if(data.errors) return data.errors
    }
}

export const deleteServer = (id) => async (dispatch) =>{
    const response = await fetch(`/api/servers/${id}`,{
        method : 'DELETE'
    })

    if(response.ok){
        const data = await response.json()

        dispatch(delete_server_action(id))
        //!thunk should update store as well.
        // dispatch(get_server_action(data.servers))

        return null;
    }
    else if (response.status < 500) {
        const data = await response.json()
        return data
    }


}

export default function serverReducer(state = {}, action) {
    let newState;
    switch(action.type){
        case GET_SERVERS:
            newState = {};
            action.payload.forEach(server =>{
                newState[server.id] = server
            })

            return newState

        case ADD_SERVER:
            newState = {...state}
            // console.log('MORE TESTING CLOGSSS');
            newState[action.payload.id] = action.payload
            return newState;
        case DELETE_SERVER:
            newState = {...state}
            delete newState[action.payload]
            return newState;
        default:
            return state;
    }
}
