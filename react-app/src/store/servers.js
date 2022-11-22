const GET_SERVERS = 'servers/GET_SERVERS'
const ADD_SERVER = 'servers/ADD_SERVERS'

const get_server_action = (servers) => ({
    type: GET_SERVERS,
    payload : servers
})

const add_server_action = (server) => ({
    type : ADD_SERVER,
    payload : server
})

export const getServers = () => async (dispatch) => {
    const response = await fetch('/api/servers/')

    if(response.ok){
        const data = await response.json()
        console.log('in thunk ---------------------------', data);
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
        dispatch(add_server_action(data))
        return null
        //! dispatch here..
    }
    else if(response.status < 500){
        const data = await response.json()
        if(data.errors){
            return data.errors
        }
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
            newState[action.payload.id] = action.payload
            return newState;
        default:
            return state;
    }
}
