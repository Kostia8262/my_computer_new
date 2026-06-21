import { useContext } from 'react'
import { ModalContext } from '../../app/providers/ModalProvider/ModalProvider';

const PlanCard = ({ name, level = 'начальный', specs = [], link, price, discount, tag }) => {
    const { openModal } = useContext(ModalContext);

    if (!specs.length) {
        specs = [{ text: 'описание' }, { text: 'описание' }, { text: 'описание' }]
    }
    let pricePeriod = tag == 'child' ? 'міс' : 'курс'
    let levelTag = { 'base': 'початковий', 'advanced': 'середній', 'expert': 'поглиблений' }[level]
    const priceLabel = (<>від <strong>{Math.round(price * (100 - discount) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</strong> грн/{pricePeriod}</>)
    const priceDiscountLabel = discount ? (<span className='plan__card_discount' ><strong className='plan__card_price-discount'>{Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</strong> грн/{pricePeriod}</span>) : ''
    return (
        <div className='plan__card'>
            <h3 className="plan__card_name">{name}</h3>
            <ul className="plan__card_descriptions">
                {specs.map((specs, id) =>
                    <li className="plan__card_description" key={id}>{specs.text}</li>
                )}
            </ul>
            <p className="plan__price">{priceLabel} {priceDiscountLabel}</p>
            <a href={link} className="plan__card_link" onClick={() => openModal('order')}>Записатись на пробне</a>
            <div className={`plan__card_level ${level}`}>{levelTag}</div>
        </div>
    )
}

export default PlanCard