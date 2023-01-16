const GET_CH_MSG_ID = 'focusChMessage/GET_CH_MSG_ID';

const getChMessageIdAction = (message) => ({
    type: GET_CH_MSG_ID,
    payload: message
})

export const getMessageId = (id) => async dispatch =>{
    const response = await fetch(`/api/server_messages/${id}`)

    if(response.ok){
        const data = await response.json();
        dispatch(getChMessageIdAction(data))
        return null
    }
    else if (response.status < 500) {
        const data = await response.json();
        return data
    }
}

export default function focusChMessageReducer(state={}, action){
    let newState;
    switch(action.type){
        case GET_CH_MSG_ID:
            newState = {...action.payload}
            return newState
        default:
            return state;
    }
}
