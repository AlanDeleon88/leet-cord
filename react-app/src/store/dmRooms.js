const GET_DM_ROOMS = 'dmRooms/GET_DM_ROOMS'


const getUserDmRoomsAction = (dmRooms) => ({
    type: GET_DM_ROOMS,
    payload: dmRooms
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

export default function dmRoomsReducer(state = {}, action){
    let newState = {}
    switch(action.type){
        case GET_DM_ROOMS:
            let dmArr = action.payload;
            dmArr.forEach(dmRoom =>{
                newState[dmRoom.dm_id] = dmRoom
            })
            return newState;

        default:
            return state;
    }
}
