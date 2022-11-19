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
