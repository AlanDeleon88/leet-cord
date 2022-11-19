const GET_CHANNEL = 'channels/GET_CHANNEL'


const getChannelAction = (channel) => ({
    type: GET_CHANNEL,
    payload: channel
})

export const getChannel = (channelId) => async (dispatch) =>{
    console.log('IN THUNK', channelId);
    const response = await fetch(`/api/channels/${channelId}`)

    if(response.ok){
        const data = await response.json()
        console.log('IN THUNK!!!');
        dispatch(getChannelAction(data))
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
