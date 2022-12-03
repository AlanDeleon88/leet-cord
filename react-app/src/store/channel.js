const GET_CHANNEL = 'channels/GET_CHANNEL'


const getChannelAction = (channel) => ({
    type: GET_CHANNEL,
    payload: channel
})


export const getChannel = (channelId) => async (dispatch) =>{
    const response = await fetch(`/api/channels/${channelId}`)

    if(response.ok){
        const data = await response.json()

        dispatch(getChannelAction(data))
        return null
    }
    else{
        const data = await response.json()

        return data
    }
}



export default function channelReducer(state = {}, action){
    let newState;

    switch(action.type){
        case GET_CHANNEL:
            newState = {}
            newState = {...action.payload}
            return newState
        default:
            return state
    }
}
