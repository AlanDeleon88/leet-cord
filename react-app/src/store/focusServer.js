import { getUserServers } from "./servers"
const GET_SERVER = 'focus_server/GET_SERVER'

const getServerAction = (server) => ({
    type: GET_SERVER,
    payload: server
})

export const getIdServer = (id) => async (dispatch) => {
    const response = await fetch(`/api/servers/${id}`)

    if(response.ok){
        const data = await response.json()
        console.log('in thunk for id server!==============', data);
        dispatch(getServerAction(data))
        return data

    }
}

export const updateServerName = (server, userId) => async(dispatch) =>{
    console.log('IN THUNK------------------------', server);
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
    }
    else if(response.status < 500){
        const data = await response.json()
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




export default function focusServerReducer(state = {}, action){
    let newState;

    switch(action.type){
        case GET_SERVER:
            newState = {...action.payload}
            return newState
        default:
            return state
    }
}
