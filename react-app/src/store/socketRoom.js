const GET_SOCKET_ROOM = 'socketRoom/GET_SOCKET_ROOM'
const SET_SOCKET_ROOM = 'socketRoom/SET_SOCKET_ROOM'
const CLEAR_SOCKET_ROOM = 'socketRoom/CLEAR_SOCKET_ROOM'


const getSocketRoomAction = () =>({
    type:GET_SOCKET_ROOM,
    // payload: room
})

const setSocketRoomAction = (room) =>({
    type:SET_SOCKET_ROOM,
    payload: room
})

const clearSocketAction = () =>({
    type:CLEAR_SOCKET_ROOM,
})

export const getSocketRoom = () => async dispatch =>{
    dispatch(getSocketRoomAction())
}

export const setSocketRoom = (currRoom) => async dispatch =>{
    dispatch(setSocketRoomAction(currRoom))
}

export default function socketRoomReducer(state = {}, action){
    let newState = {}

    switch(action.type){
        case GET_SOCKET_ROOM:
            // newState = {}
            newState = {...state}
            return newState
        case SET_SOCKET_ROOM:
            // newState = {}
            newState ={...action.payload}
            return newState
        case CLEAR_SOCKET_ROOM:
            newState = {}
            return newState
        default:
            return state
    }
}
