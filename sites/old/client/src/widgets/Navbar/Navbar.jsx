import { useState } from 'react'
import { Link } from 'react-router-dom';

import './style.css'

import { ReactComponent as Inst } from '../../shared/assets/icons/social/inst.svg'
import { ReactComponent as Fb } from '../../shared/assets/icons/social/fb.svg'
import burger from '../../shared/assets/icons/interface/burger.svg'
import arrow from '../../shared/assets/icons/interface/arrow.svg'
import PopUp from '../Popup/PopUp';
import { Logo } from '../../shared/ui/Logo';

const Navbar = () => {
    const [isPopup, setIsPopup] = useState(false);
    const [isNavbar, setIsNavbar] = useState(false);

    const showPopup = () => {
        setIsPopup(true)
        document.documentElement.style.overflowY = 'hidden'
    }

    const closePopup = () => {
        setIsPopup(false)
        document.documentElement.style.overflowY = 'scroll'
        console.log('close popup')
    }

    const togglePopup = (e) => {
        isPopup ? closePopup(e) : showPopup()
    }

    const openNavbar = () => {
        setIsNavbar(true)
        document.documentElement.style.overflowY = 'hidden'
    }

    const closeNavbar = (e) => {
        if (e.target.id != 'course__toggler' && !e.target.classList.contains('popup__category')) {
            setIsNavbar(false)
            document.documentElement.style.overflowY = 'scroll'
        }
    }

    const toggleNavbar = (e) => {
        isNavbar ? closeNavbar(e) : openNavbar()
    }

    return (
        <nav>
            <div className="container">
                <div className="navbar">
                    <Logo />
                    <div className="navbar__numbers">
                        <a href="tel:+380954624672" className="">+38 (095) - 462 - 46 - 72</a>
                        <a href="tel:+380682522876" className="">+38 (068) - 252 - 28 - 76</a>
                    </div>
                    <div className="navbar__social">
                        <div className="navbar__social_item">
                            <a href="https://www.instagram.com/my_computer_academy_/">
                                <Inst />
                            </a>
                        </div>
                        <div className="navbar__social_item">
                            <a href="https://www.facebook.com/MyComputerAcademy.Dnipro/">
                                <Fb />
                            </a>
                        </div>
                    </div>
                    <ul className={`navbar__nav ${isNavbar ? 'active' : ''}`} onClick={closeNavbar}>
                        <li className="navbar__item"><Link to='/' className="navbar__link">ПРО АКАДЕМІЮ</Link></li>
                        <li className="navbar__item"><a href="#contacts" className="navbar__link">КОНТАКТИ</a></li>
                        <li className="navbar__item"><Link to='/posts' className="navbar__link">СТАТТІ</Link></li>
                        <li className="navbar__item"><button id='course__toggler' className="navbar__link" onClick={togglePopup} >КУРСИ <img src={arrow} alt="" className={`navbar__drop__icon ${isPopup ? 'active' : ''}`} /></button></li>
                        <PopUp isPopup={isPopup} closePopup={closePopup} />
                    </ul>
                    <button className='navbar__toggler' onClick={toggleNavbar}>
                        <img src={burger} alt="" />
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar