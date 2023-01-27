const GET_CH_MSG = 'channelMessage/GET_CH_MSG'
const ADD_CH_MSG = 'channelMessage/ADD_CH_MSG'
const DELETE_CH_MSG = 'channelMessage/DELETE_CH_MSG'
const CLEAR_CH_MSG = 'channelMessage/CLEAR_CH_MSG'

const getChannelMsgAction = (messages) =>({
    type:GET_CH_MSG,
    payload:messages
})

const addMessageAction = (message) =>({
    type: ADD_CH_MSG,
    payload: message
})

const deleteChMsgAction = (id) => ({
    type:DELETE_CH_MSG,
    payload: id
})

const clearChMsgAction =() =>({
    type:CLEAR_CH_MSG
})

export const getChannelMessages = (id) => async (dispatch) =>{
    const response = await fetch(`/api/channels/${id}`)
    // console.log('TEST THUINKK-------------------------------------',id);

    if(response.ok){
        const data = await response.json()

        const messages = data.server_messages;

        // console.log(messages);

        dispatch(getChannelMsgAction(messages))


        return messages
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

        return data

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

export const deleteChMessage = (id) => async dispatch =>{
    const response = await fetch(`/api/server_messages/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type' : 'application/json'
        },

    })

    if(response.ok){
        const data = await response.json()
        dispatch(deleteChMsgAction(id))
        return null
    }
    else if (response.status < 500){
        const data = await response.json()
        return data
    }
}

export const clearChMessages = () => async dispatch =>{
    dispatch(clearChMsgAction())
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
        case DELETE_CH_MSG:
            newState = {...state}
            delete newState[action.payload]
            return newState
        case CLEAR_CH_MSG:
            newState = {}
            return newState

        default:
            return state
    }
}
