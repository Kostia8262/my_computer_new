import {
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { ContentWrapper, Description, Details, ImageWrapper, ModalContainer, StyledImage, Title, ModalButton, Bonus, BonusCode, TitleWrapper, ModalButtonClose, ModalActions } from "./ModalDiscount.styled";
import discountPlaceholder from '../../shared/assets/images/discount.png';
import { ModalDiscountTimer } from './ModalDiscountTimer';
import { useNavigate } from 'react-router-dom';
import cross from '../../shared/assets/icons/interface/modal_cross.png'


export const ModalDiscount = ({
  open,
  onClose,
  discount
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  if (!discount) return null;
  
  const {
    title,
    description,
    desktop_banner,
    mobile_banner,
    discount_percent,
    promo,
    has_promo,
    has_discount,
    show_timer,
    end_date,
  } = discount;
  
  
  const imageSrc = isMobile
  ? (mobile_banner || discountPlaceholder)
  : (desktop_banner || discountPlaceholder);
  
  const handleGetBonus = () => {
    navigate('#contacts', { replace: true });
    const element = document.getElementById('contacts');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  }

  return (
    <ModalContainer open={open} onClose={onClose}>
      <ImageWrapper>
        <StyledImage
          src={imageSrc}
          alt="Discount Banner"
        />
      </ImageWrapper>

      <ContentWrapper>
        <TitleWrapper>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Title>{title}</Title>
            <ModalButtonClose onClick={onClose} startIcon={<img src={cross} />}  />
          </Box>
        </TitleWrapper>

        <Details>
          <Description variant="body1">{description}</Description>

          {has_discount && discount_percent && Number(discount_percent) > 0 && (
            <Bonus>
              <span>Бонус:</span> <strong>{Math.floor(Number(discount_percent))}%</strong>
            </Bonus>
          )}

          {has_promo && promo && (
            <BonusCode>
              <span>Промокод:</span> <strong>{promo}</strong>
            </BonusCode>
          )}

          {show_timer && end_date && (
            <ModalDiscountTimer targetDate={end_date} />
          )}
        </Details>

          <ModalActions>
            <ModalButton onClick={handleGetBonus}>
              Получить бонус
            </ModalButton>
          </ModalActions>
      </ContentWrapper>
    </ModalContainer>
  );
};
