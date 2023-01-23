const GET_DM_ROOM = 'focusDm/GET_DM_ROOM'

const getDmRoomAction = (dmRoom) => ({
    type: GET_DM_ROOM,
    payload: dmRoom
})

export const getDmRoom = (id) => async dispatch =>{
    const response = await fetch(`/api/dm/${id}`)

    if(response.ok){
        const data = await response.json()
        dispatch(getDmRoomAction(data))
    }
    else if(response.status < 500){
        const data = await response.json()
        return data
    }
}

export default function focusDmRoomReducer(state={}, action){
    let newState = {}
    switch(action.type){
        case GET_DM_ROOM:
            newState = {...action.payload}
            return newState

        default:
            return state
    }

}
