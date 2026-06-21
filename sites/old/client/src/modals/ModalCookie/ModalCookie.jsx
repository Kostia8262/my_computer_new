import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import cookieIcon from '../../shared/assets/icons/interface/cookie.svg'
import { setGAConsent } from '../../utlis/analytics'
import './ModalCookie.css'

export const ModalCookie = () => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (!localStorage.getItem('cookie_consent')) {
            setVisible(true)
        }
    }, [])

    const accept = () => {
        localStorage.setItem('cookie_consent', 'accepted')
        setGAConsent()
        setVisible(false)
    }

    const decline = () => {
        localStorage.setItem('cookie_consent', 'declined')
        localStorage.setItem('ga_consent', 'false')
        setVisible(false)
    }

    if (!visible) return null

    return (
        <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
            <div className="cookie-banner__inner">
                <img src={cookieIcon} alt="" className="cookie-banner__icon" />

                <div className="cookie-banner__text">
                    <strong className="cookie-banner__title">Ми використовуємо Cookies</strong>
                    <p className="cookie-banner__desc">
                        Ми використовуємо cookie для аналітики та покращення роботи сайту.{' '}
                        <Link to="/cookies/">Політика cookie</Link>
                        {' · '}
                        <Link to="/privacy/">Конфіденційність</Link>
                    </p>
                </div>

                <div className="cookie-banner__actions">
                    <button className="cookie-banner__decline" onClick={decline}>
                        Відхилити
                    </button>
                    <button className="cookie-banner__accept" onClick={accept}>
                        Прийняти
                    </button>
                </div>
            </div>
        </div>
    )
}
