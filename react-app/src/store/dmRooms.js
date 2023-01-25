const GET_DM_ROOMS = 'dmRooms/GET_DM_ROOMS'
const SET_DM_ROOM = 'dmRooms/SET_DM_ROOM'
const DELETE_DM_ROOM = 'dmRooms/DELETE_DM_ROOM'

const getUserDmRoomsAction = (dmRooms) => ({
    type: GET_DM_ROOMS,
    payload: dmRooms
})

const setUserDmRoomAction = (dmRoom) => ({
    type: SET_DM_ROOM,
    payload: dmRoom
})

const deleteUserDmRoomAction = (id) => ({
    type: DELETE_DM_ROOM,
    payload: id
})

export const getUserDmRooms = (userId) => async dispatch =>{
    const response = await fetch(`/api/users/${userId}/dm`)

    if(response.ok){
        const data = await response.json()
        dispatch(getUserDmRoomsAction(data.dms))
        return null;
    }
    else if(response.status < 500) {
        const data = await response.json()
        return data
    }
}

export const addUserDmRoom = (userId) => async dispatch =>{
    const response = await fetch(`/api/users/${userId}/dm`, {
        method : 'POST',
        headers: {
            "Content-Type": "application/json",
          },
    })
    if(response.ok){
        const data = await response.json()
        dispatch(setUserDmRoomAction(data))
        return data
    }
    else if (response.status < 500){
        const data = await response.json()
        return data
    }
}

export const deleteUserDmRoom = (dmId) => async dispatch =>{
    const response = await fetch(`/api/dm/${dmId}`,{
        method : 'DELETE',
        headers: {
            "Content-Type": "application/json",
          },

    })
    if(response.ok){
        const data = await response.json()
        dispatch(deleteUserDmRoomAction(data.dm_id))
        return null
    }
    else if(response.status < 500) {
        const data = await response.json()
        return data
    }
}

export default function dmRoomsReducer(state = {}, action){
    let newState = {}
    switch(action.type){
        case GET_DM_ROOMS:
            let dmArr = action.payload;
            dmArr.forEach(dmRoom =>{
                newState[dmRoom.dm_id] = dmRoom
            })
            return newState;
        case SET_DM_ROOM:
            newState = {...state}
            newState[action.payload.dm_id] = action.payload;
            return newState

        case DELETE_DM_ROOM:
            newState = {...state}
            delete newState[action.payload]
            return newState

        default:
            return state;
    }
}
