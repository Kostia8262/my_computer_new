import { useState, useContext } from 'react'
import { postOrder } from '../api'
import { ModalContext } from '../app/providers/ModalProvider/ModalProvider'

import tg from '../shared/assets/icons/social/tg.svg'
import wa from '../shared/assets/icons/social/wa.svg'
import vb from '../shared/assets/icons/social/vb.svg'
import cross from '../shared/assets/icons/interface/cross_l.svg'

const ModalOrder = () => {
    const [formData, setFormData] = useState({ name: '', phone: '', message: '' })
    const { openModal, closeModal } = useContext(ModalContext)

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = (e) => {
        e.preventDefault()
        postOrder(formData)
            .then(() => {
                closeModal('order')
                openModal('success', "Ми зв'яжемося з вами найближчим часом!")
            })
            .catch((err) => console.error('Помилка відправки:', err))
    }

    const wrapperHandler = (e) => {
        if (e.target.className.includes('modal__wrapper')) closeModal('order')
    }

    return (
        <div className='modal__wrapper modal__order' onClick={wrapperHandler}>
            <div className='modal__content'>
                <div className="modal__head">
                    <h2>Записатись на курс</h2>
                    <button className='close' onClick={() => closeModal('order')}>
                        <img src={cross} alt="Закрити" />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form__field">
                        <label className="form__label">Ваше ім'я</label>
                        <input
                            type="text"
                            placeholder="Введіть ім'я..."
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form__field">
                        <label className="form__label">Країна, Місто</label>
                        <input
                            type="text"
                            placeholder="Наприклад: Дніпро"
                            name='message'
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form__field">
                        <label className="form__label">
                            Телефон <span className="form__required">*</span>
                        </label>
                        <input
                            type="tel"
                            placeholder="+380..."
                            name='phone'
                            value={formData.phone}
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className="modal__online">
                        <p>Онлайн навчання?</p>
                        <div className="modal__online__radio">
                            <label htmlFor="onlineTrue">
                                <input type="radio" name="online" id='onlineTrue' defaultChecked /> Так
                            </label>
                            <label htmlFor="onlineFalse">
                                <input type="radio" name="online" id='onlineFalse' /> Ні
                            </label>
                        </div>
                    </div>

                    <ul className="modal__socio">
                        <li><a href="https://t.me/SosComputerAcademy"><img src={tg} alt="Telegram" /></a></li>
                        <li><a href="viber://add?number=380954624672"><img src={vb} alt="Viber" /></a></li>
                        <li><a href="https://api.whatsapp.com/send?phone=380954624672"><img src={wa} alt="WhatsApp" /></a></li>
                    </ul>

                    <button type='submit'>Записатись на пробне</button>
                    <p className="form__consent">
                        Натискаючи кнопку, я погоджуюсь на{' '}
                        <a href="/privacy/">обробку персональних даних</a>{' '}
                        та з{' '}
                        <a href="/terms/">правилами користування</a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default ModalOrder
