import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import './LeaveServerWindow.css'
import { leaveServer } from "../../store/servers"

const LeaveServerWindow = ({server, setShowLeaveModal}) =>{
    const dispatch = useDispatch()
    const history = useHistory()

    const clickCancel = e =>{
        setShowLeaveModal(false)
    }

    const clickLeave = e =>{
        dispatch(leaveServer(server.id))
        history.push('/dm')
    }

    return(
        <>
            <div className="leave-main-container">
                <div className="leave-header-container">
                    {`Leave '${server.name}'`}
                </div>
                <div className="leave-prompt-container">
                    {`Are you sure you want to leave ${ server.name} ?`}
                </div>
                <div className="leave-buttons-container">
                    <button className="leave-buttons leave-confirm" onClick={clickLeave}>
                        Leave Server
                    </button>
                    <button className="leave-buttons leave-cancel" onClick={clickCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </>
    )
}

export default LeaveServerWindow
