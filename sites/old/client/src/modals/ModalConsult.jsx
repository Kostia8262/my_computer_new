import { useState, useContext } from 'react'
import { postOrder } from '../api'
import { ModalContext } from '../app/providers/ModalProvider/ModalProvider'
import cross from '../shared/assets/icons/interface/cross_l.svg'

export const ModalConsult = () => {
    const [formData, setFormData] = useState({ name: '', phone: '', message: '' })
    const { openModal, closeModal } = useContext(ModalContext)

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = (e) => {
        e.preventDefault()
        postOrder(formData)
            .then(() => {
                closeModal('consult')
                openModal('success', "Ми зв'яжемося з вами найближчим часом!")
            })
            .catch((err) => console.error('Помилка відправки:', err))
    }

    const wrapperHandler = (e) => {
        if (e.target.className.includes('modal__wrapper')) closeModal('consult')
    }

    return (
        <div className='modal__wrapper modal__consultation' onClick={wrapperHandler}>
            <div className='modal__content'>
                <div className="modal__head">
                    <h2>Безкоштовна консультація</h2>
                    <button className='close' onClick={() => closeModal('consult')}>
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

                    <button type='submit'>Отримати консультацію</button>
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
