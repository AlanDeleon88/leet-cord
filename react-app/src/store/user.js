const SET_USER = 'users/SET_USER'




const setUser = (user) => ({
    type: SET_USER,
    payload: user
  });


  export const getUserId = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
        let data = await response.json()
        dispatch(setUser(data))
        return null

    }
  };

export default function userReducer(state = {}, action) {
    let newState;
    switch (action.type) {
      case SET_USER:
        newState = {...action.payload}
        return newState
      default:
        return state;
    }
  }
