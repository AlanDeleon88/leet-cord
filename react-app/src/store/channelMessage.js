const GET_CH_MSG = 'channelMessage/GET_CH_MSG'
const ADD_CH_MSG = 'channelMessage/ADD_CH_MSG'
const EDIT_CH_MSG = 'channelMessage/EDIT_CH_MSG'

const getChannelMsgAction = (messages) =>({
    type:GET_CH_MSG,
    payload:messages
})

const addMessageAction = (message) =>({
    type: ADD_CH_MSG,
    payload: message
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

export const postNewMessage = (id, message) => async dispatch =>{
    const response = await fetch(`/api/channels/${id}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            body: message.body,
            img: message.img
          }),

    })

    if(response.ok){
        const data = await response.json();

        dispatch(addMessageAction(data))

        return null

    }
    else if (response.status < 500){
       const data = response.json();
        return data
    }

}

export const editChMessage = (message) => async dispatch =>{
    const response = await fetch(`/api/server_messages/${message.id}`,{
        method : 'PUT',
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            body: message.body,
          }),
    })

    if(response.ok){
        const data = await response.json();
        dispatch(addMessageAction(data))
        return null
    }
    else if (response.status < 500){
        const data = response.json();
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

        case ADD_CH_MSG:
            newState = {...state}
            newState[action.payload.id] = action.payload
            //! this is added to keep the data inline with the query from channel message, IE channel message has message_id
            //! for the message, while the message model just has ID.
            newState[action.payload.id]['message_id'] = action.payload.id

            return newState
        default:
            return state
    }
}
