import { useState, useContext } from 'react'
import { postOrder } from '../api'
import { ModalContext } from '../app/providers/ModalProvider/ModalProvider'

const ModalEnroll = () => {
    const [formData, setFormData] = useState({ name: '', phone: '', message: '' })
    const { openModal } = useContext(ModalContext)

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = (e) => {
        e.preventDefault()
        postOrder(formData)
            .then(() => openModal('success', "Ми зв'яжемося з вами найближчим часом!"))
            .catch((err) => console.error('Помилка відправки:', err))
    }

    return (
        <div className='modal__enroll'>
            <h2>Записатись на курс або отримати безкоштовну консультацію</h2>
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
    )
}

export default ModalEnroll
