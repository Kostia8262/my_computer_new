import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import { Logo } from '../../shared/ui/Logo'

const YEARS = new Date().getFullYear() - 1999
const yearForm = (n) => {
    const l2 = n % 100, l1 = n % 10
    if (l2 >= 11 && l2 <= 19) return 'років'
    if (l1 === 1) return 'рік'
    if (l1 >= 2 && l1 <= 4) return 'роки'
    return 'років'
}

const PAYMENT_METHODS = ['WayForPay', 'Google Pay', 'Apple Pay', 'Visa', 'Mastercard']

const LEGAL_LINKS = [
    { label: 'Конфіденційність',  href: '/privacy/' },
    { label: 'Публічна оферта',   href: '/public-offer/' },
    { label: 'Правила',           href: '/terms/' },
    { label: 'Повернення',        href: '/refund/' },
    { label: 'Cookie',            href: '/cookies/' },
]

const Footer = () => (
    <footer className="footer">
        <div className="container">
            <div className="footer__grid">

                <div className="footer__brand">
                    <Logo />
                    <p className="footer__brand-tagline">
                        Навчаємо комп'ютерним технологіям з&nbsp;1999 року
                    </p>
                    <p className="footer__brand-years">
                        {YEARS}&nbsp;{yearForm(YEARS)} поруч з учнями
                    </p>
                </div>

                <div className="footer__col">
                    <h4 className="footer__col-title">Наші сайти</h4>
                    <ul className="footer__nav">
                        <li><a href="https://mycomputer.education" target="_blank" rel="noopener" className="footer__nav-link">mycomputer.education</a></li>
                        <li><a href="https://python.mycomputer.education" target="_blank" rel="noopener" className="footer__nav-link">Курс Python</a></li>
                        <li><a href="https://minecraft.mycomputer.education" target="_blank" rel="noopener" className="footer__nav-link">Курс Minecraft</a></li>
                    </ul>
                </div>

                <div className="footer__col">
                    <h4 className="footer__col-title">Графік роботи</h4>
                    <ul className="footer__schedule">
                        <li className="footer__schedule-row">
                            <span className="footer__schedule-days">Пн – Пт</span>
                            <span className="footer__schedule-time">9:00 – 19:00</span>
                        </li>
                        <li className="footer__schedule-row">
                            <span className="footer__schedule-days">Сб – Нд</span>
                            <span className="footer__schedule-time">9:00 – 18:00</span>
                        </li>
                    </ul>
                    <h4 className="footer__col-title" style={{ marginTop: '24px' }}>Контакти</h4>
                    <ul className="footer__contacts">
                        <li>
                            <a href="tel:+380954624672" className="footer__contact-link">
                                +38 (095) 462-46-72
                            </a>
                        </li>
                        <li>
                            <a href="mailto:my.computer.academy25@gmail.com" className="footer__contact-link">
                                my.computer.academy25@gmail.com
                            </a>
                        </li>
                    </ul>
                </div>

            </div>

            <div className="footer__bottom">
                <div className="footer__payment">
                    <span className="footer__payment-label">ОПЛАТА:</span>
                    <div className="footer__payment-methods">
                        {PAYMENT_METHODS.map(m => (
                            <span key={m} className="footer__payment-badge">{m}</span>
                        ))}
                    </div>
                </div>

                <div className="footer__legal">
                    {LEGAL_LINKS.map((link, i) => (
                        <Link key={i} to={link.href} className="footer__legal-link">
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="footer__copy">
                    <p>© {new Date().getFullYear()} My Computer Academy. Всі права захищені.</p>
                    <p className="footer__fop">
                        ФОП Піменов К.Ю., ІПН&nbsp;3498404577, м.&nbsp;Дніпро, пр.&nbsp;О.&nbsp;Поля&nbsp;28а&nbsp;·&nbsp;
                        <a href="tel:+380954624672">+38&nbsp;(095)&nbsp;462-46-72</a>&nbsp;·&nbsp;
                        <a href="mailto:my.computer.academy25@gmail.com">my.computer.academy25@gmail.com</a>
                    </p>
                </div>
            </div>
        </div>
    </footer>
)

export default Footer
