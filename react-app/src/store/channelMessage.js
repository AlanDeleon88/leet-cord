const GET_CH_MSG = 'channelMessage/GET_CH_MSG'

const getChannelMsgAction = (messages) =>({
    type:GET_CH_MSG,
    payload:messages
})

export const getChannelMessages = (id) => async (dispatch) =>{
    const response = await fetch(`/api/channels/${id}`)
    if(response.ok){
        const data = await response.json()

        const messages = data.server_messages;

        console.log(messages);

        dispatch(getChannelMsgAction(messages))


        return null
    }
    else{
        const data = await response.json()

        return data
    }
}

export default function channelMessageReducer(state = {}, action){
    let newState;
    switch(action.type){
        case GET_CH_MSG:
            newState = {}
            // newState= {...action.payload}
            action.payload.forEach(el =>{
                newState[el.message_id] = el
            })
            return newState
        default:
            return state
    }
}
