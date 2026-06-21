import { useContext, useState } from 'react'
import { ModalContext } from '../../app/providers/ModalProvider/ModalProvider'
import { postOrder } from '../../api'
import './style.css'

import phoneSm from '../../shared/assets/icons/interface/phone_sm.svg'
import penSm from '../../shared/assets/icons/interface/pen_sm.svg'
import send from '../../shared/assets/icons/interface/send.svg'
import { ReactComponent as Inst } from '../../shared/assets/icons/social/inst.svg'
import { ReactComponent as Fb } from '../../shared/assets/icons/social/fb.svg'

const Contacts = () => {
    const [formData, setFormData] = useState({ name: '', phone: '', message: '' })
    const [sent, setSent] = useState(false)
    const { openModal } = useContext(ModalContext)

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = (e) => {
        e.preventDefault()
        postOrder(formData)
            .then(() => {
                setSent(true)
                setFormData({ name: '', phone: '', message: '' })
                openModal('success', "Ми зв'яжемося з вами найближчим часом!")
            })
            .catch((err) => console.error('Помилка відправки:', err))
    }

    return (
        <section className="contacts" id='contacts'>
            <div className="container">
                <div className="contacts__wrapper">

                    <form className="contacts__form" onSubmit={handleSubmit}>
                        <div className="section__heading contacts__heading">
                            <div className="heading__icon">
                                <img src={penSm} alt="" />
                            </div>
                            <h2>Написати нам</h2>
                        </div>

                        <div className="form__field">
                            <label className="contacts__label" htmlFor="contacts-name">Ваше ім'я</label>
                            <input
                                type="text"
                                id="contacts-name"
                                name='name'
                                value={formData.name}
                                placeholder="Введіть ім'я..."
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form__field">
                            <label className="contacts__label" htmlFor="contacts-phone">
                                Телефон <span className="form__required">*</span>
                            </label>
                            <input
                                type="tel"
                                id="contacts-phone"
                                name='phone'
                                value={formData.phone}
                                required
                                placeholder='+380...'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form__field">
                            <label className="contacts__label" htmlFor="contacts-msg">Повідомлення</label>
                            <div className="contacts__comment">
                                <textarea
                                    id="contacts-msg"
                                    placeholder='Введіть текст...'
                                    name='message'
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                                <button type="submit" className="contacts__send" aria-label="Надіслати">
                                    <img src={send} alt="" />
                                </button>
                            </div>
                        </div>

                        <div className="contacts__copyright">
                            <input type="checkbox" name="consent" id="contacts-consent" required />
                            <label htmlFor="contacts-consent">
                                Я даю згоду на{' '}
                                <a href="/privacy/">обробку персональних даних</a>{' '}
                                згідно з{' '}
                                <a href="/terms/">правилами</a>.
                            </label>
                        </div>
                    </form>

                    <div className="contacts__info">
                        <div className="section__heading">
                            <div className="heading__icon">
                                <img src={phoneSm} alt="" />
                            </div>
                            <h2>Контакти</h2>
                        </div>
                        <p className='contacts__description'>
                            Зв'яжіться з нами зручним способом або замовте дзвінок від нашого менеджера:
                        </p>
                        <div className="contacts__phones_wrapper">
                            <h3>Телефони:</h3>
                            <ul className="contacts__phones">
                                <li className="contacts__phone">
                                    <img src={phoneSm} alt="" />
                                    <span>+38 (095) 462-46-72</span>
                                    <a href="viber://add?number=380954624672">Viber</a>
                                    <a href="https://api.whatsapp.com/send?phone=380954624672">Whatsapp</a>
                                    <a href="https://t.me/380954624672">Telegram</a>
                                </li>
                                <li className="contacts__phone">
                                    <img src={phoneSm} alt="" />
                                    <span>+38 (068) 252-28-76</span>
                                    <a href="https://api.whatsapp.com/send?phone=380682522876">Whatsapp</a>
                                </li>
                            </ul>
                        </div>
                        <h3>Пошта:</h3>
                        <ul className="contacts__mails">
                            <li className="contacts__mail">
                                <a href="mailto:my.computer.academy25@gmail.com">
                                    my.computer.academy25@gmail.com
                                </a>
                            </li>
                        </ul>
                        <h3>Слідкуйте за нами:</h3>
                        <ul className="contacts__links">
                            <li className="contacts__link">
                                <a href="https://www.instagram.com/my_computer_academy_/" aria-label="Instagram">
                                    <Inst />
                                </a>
                            </li>
                            <li className="contacts__link">
                                <a href="https://www.facebook.com/MyComputerAcademy.Dnipro/" aria-label="Facebook">
                                    <Fb />
                                </a>
                            </li>
                        </ul>
                        <button onClick={() => openModal('order')}>Замовити дзвінок</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contacts
