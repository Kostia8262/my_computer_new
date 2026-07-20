import { useContext } from 'react'
import { ModalContext } from '../app/providers/ModalProvider/ModalProvider';

import inst from '../shared/assets/icons/social/inst_c.svg';

const ModalSuccess = () => {
    const { modalStates, closeModal } = useContext(ModalContext)

    const wrapperHandler = (e) => {
        if (e.target.className.includes('modal__wrapper')) {
            closeModal('success')
        }
    }

    return (
        <div className='modal__wrapper modal--success' onClick={(e) => { wrapperHandler(e) }}>
            <div className="modal__content">
                <h2>Дякуємо за заявку</h2>
                <p>{modalStates['success'].content}</p>
                <ul>
                    <li><a href="https://www.instagram.com/my_computer_academy_/" aria-label="Instagram"><img src={inst} alt="Instagram" /></a></li>
                </ul>
                <button onClick={() => { closeModal('success') }}>Чудово!</button>
            </div>
        </div>
    )
}

export default ModalSuccess