import './DmPage.css'
import placeHolder from './discordDM_placeholder_img.png'

const DmPage = () =>{

    return(
        <>
            <div className="dm-page-main-container">
                <img src={placeHolder}/>
                <div className='dm-page-placeholder-prompt'>
                    Friend's List coming soon!
                </div>
            </div>

        </>
    )
}

export default DmPage
