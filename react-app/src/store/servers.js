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

export default function serverReducer(state = {}, action) {
    let newState;
    switch(action.type){
        case GET_SERVERS:
            newState = {};
            action.payload.forEach(server =>{
                newState[server.id] = server
            })

            return newState
        default:
            return state;
    }
}
