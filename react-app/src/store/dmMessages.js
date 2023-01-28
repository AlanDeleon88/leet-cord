const GET_DM_MSG = 'dmMessages/GET_DM_MSG'
const SET_DM_MSG = 'dmMessages/SET_DM_MSG'
const DELETE_DM_MSG = 'dmMessages/DELETE_DM_MSG'

const getDmMsgAction = (messages) => ({
    type:GET_DM_MSG,
    payload: messages
})

const setDmMsgAction = (message) => ({
    type:SET_DM_MSG,
    payload: message
})

const deleteDmMsgAction = (id) => ({
    type: DELETE_DM_MSG,
    payload: id

})

export const getDmMsg = (dmId) => async dispatch => {
    // console.log('IN THUNK', dmId);
    const response = await fetch(`/api/dm/${dmId}/messages`)

    if(response.ok){
        const data = await response.json()
        dispatch(getDmMsgAction(data.direct_messages))
        return data.direct_messages
    }
    else if (response.status < 500){
        const data = await response.json()
        return data
    }
}

export const postDmMsg = (dmId, message) => async dispatch =>{
    const response = await fetch(`/api/dm/${dmId}`,{
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
        const data = await response.json()
        dispatch(setDmMsgAction(data))
        return data
    }
    else if(response.status < 500){
        const data = await response.json()
        return data
    }

}

export const deleteDmMessage = (id) => async (dispatch) =>{
    const response = await fetch(`/api/direct_messages/${id}`,{
        method : 'DELETE',
        headers:{
            'Content-Type' : 'application/json'
        },

    })
    if(response.ok){
        const data = await response.json()
        dispatch(deleteDmMsgAction(data.id))
        return null
    }
    else if(response.status < 500){
        const data = await response.json()
        return data
    }
}

export const editDmMessage = (message) => async dispatch =>{
    const response = await fetch(`/api/direct_messages/${message.id}`,{
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
        dispatch(setDmMsgAction(data))
        return null
    }
    else if (response.status < 500){
        const data = response.json();
        return data
    }
}



export default function directMessageReducer(state = {}, action){
    let newState = {}
    switch(action.type){
        case GET_DM_MSG:
            action.payload.forEach(dm => {
                newState[dm.message_id] = dm
            })
            return newState
        case SET_DM_MSG:

            newState = {...state}
            newState[action.payload.id] = action.payload
            return newState

        case DELETE_DM_MSG:
            newState = {...state}
            delete newState[action.payload]
            return newState;

        default:
            return state
    }
}
