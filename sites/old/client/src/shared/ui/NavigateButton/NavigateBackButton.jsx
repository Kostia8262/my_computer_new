import { useNavigate } from "react-router-dom";
import { NavigateButton } from ".";
import prev_chev from '../../assets/icons/interface/prev_chev.svg'

export const NavigateBackButton = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <NavigateButton
            variant="outlined"
            startIcon={<img src={prev_chev} />}
            onClick={handleBackClick}
        />
    );
}