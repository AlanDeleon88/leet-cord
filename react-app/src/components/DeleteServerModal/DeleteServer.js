import { useDispatch,useSelector } from "react-redux"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { deleteServer } from "../../store/servers"


const DeleteServer = ({id, setShowDeleteModal}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)

    const handleYes = e =>{
        e.preventDefault()

        //!dispatch to delete server
        dispatch(deleteServer(id))

        //! redirect to user page
        history.push(`/${user.username}/dm`)
    }

    const handleNo = e =>{
        e.preventDefault()

        setShowDeleteModal(false)
    }

    return(
        <>
            <div className="delete-server-window">

                <div className="delete-server-caption">
                    Are you sure you want to delete this server?
                </div>


                <div className="button-container">
                    <button className ='delete-yes delbutton' onClick={handleYes}>
                        Yes
                    </button>
                    <button className = 'delete-no delbutton' onClick={handleNo}>
                        No
                    </button>

                </div>

            </div>

        </>
    )
}

export default DeleteServer
