import img from './icons/discordSplashImg.jpg'
import lnkedIcon from './icons/linkednIcon.png'
import githubIcon from './icons/githubLogo.png'
import reactIcon from './icons/reactIcon.png'
import reduxIcon from './icons/reduxLogo.png'
import sqlAlchIcon from './icons/sqlalchemyLogo.png'
import flaskIcon from './icons/flaskLogo.png'
import './SplashPage.css'

const SplashPage = () => {


    return(
    <>
        <div className="splash-main-container">
            <div className="splash-background-img-container">
                <img src={img} className='splash-img'/>

            </div>
            <div className='splash-content-container'>
                <div className="splash-button-container">
                    <button className="splash-button">
                        Open Discord in browser
                    </button>
                </div>
                    <div className="splash-footer">
                        <div className='tech-container'>
                            <img className='tech-icon' src={reactIcon}/>
                            <img className='tech-icon redux' src={reduxIcon}/>
                            <img className='tech-icon flask' src={flaskIcon}/>
                            <img className='tech-icon sqlalchemy' src={sqlAlchIcon} />


                        </div>
                        <div className="about-links-container">
                            <div className='splash-caption'>

                                @2022 Discord-clone by Alan Deleon

                            </div>

                        </div>
                        <div className="about-icons-container">
                            <a href='https://www.linkedin.com/in/alan-de-leon-b54621212/' className='lnked-anchor'>
                                <img src={lnkedIcon} className='about-icon'/>
                            </a>
                            <a href='https://github.com/AlanDeleon88'>
                                <img src={githubIcon} className='about-icon'/>
                            </a>

                        </div>

            </div>

            </div>
            </div>





    </>
    )


}

export default SplashPage
