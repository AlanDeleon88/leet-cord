const GET_EXPLORE_SREVER = 'exploreServer/GET_EXPLORE_SERVER'

const getExploreServerAction = (servers) =>({
    type: GET_EXPLORE_SREVER,
    payload: servers
})

export const getExploreServer = () => async dispatch =>{
    const response = await fetch('/api/servers/')

    if(response.ok){
        const data = await response.json()
        dispatch(getExploreServerAction(data.servers))
        return null
    }
    else if(response.status < 500){
        const data = await response.json()
        return data
    }
}

export function exploreServerReducer(state = {}, action){
    let newState = {}
    switch(action.type){
        case GET_EXPLORE_SREVER:
            action.payload.forEach(server =>{
                newState[server.id] = server
            })
            return newState

        default :
        return state
    }
}
