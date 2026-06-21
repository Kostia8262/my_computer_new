import plus from '../../../../shared/assets/icons/interface/plus.svg'
import minus from '../../../../shared/assets/icons/interface/minus.svg'
import clock from '../../../../shared/assets/icons/interface/clock.svg'
import cash from '../../../../shared/assets/icons/interface/cash.svg'

export const AbilitiesCard = ({ title, description, image, rating }) => {
    return (
        <div className="abilities__card">
            <div className="abilities__card_head">
                <img src={image} alt="" />
            </div>
            <div className="abilities__card_body">
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="abilities__card_spec">
                    <div className="abilities__card_time">
                        <img src={clock} alt="" />
                        {Array.from({ length: rating.time }).map((_, id) =>
                            (<img key={id} src={minus} alt="" />)
                        )}
                    </div>
                    <div className="abilities__card_money">
                        <img src={cash} alt="" />
                        {Array.from({ length: rating.cash }).map((_, id) =>
                            (<img key={id} src={plus} alt="" />)
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}