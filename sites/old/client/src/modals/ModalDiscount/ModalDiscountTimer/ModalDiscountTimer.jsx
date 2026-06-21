import { useState, useEffect } from 'react';
import { TimerWrapper, TimeBlock, TimeValue, TimeLabel } from './ModalDiscountTimer.styles';

export const ModalDiscountTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - Date.now();
    return {
      days: difference > 0 ? String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0') : '00',
      hours: difference > 0 ? String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0') : '00',
      minutes: difference > 0 ? String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0') : '00',
      seconds: difference > 0 ? String(Math.floor((difference / 1000) % 60)).padStart(2, '0') : '00',
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const { days, hours, minutes, seconds } = timeLeft;

return (
    <TimerWrapper>
        <TimeBlock>
            <TimeValue>{days}</TimeValue>
            <TimeLabel>днів</TimeLabel>
        </TimeBlock>
        <TimeBlock>
            <TimeValue>{hours}</TimeValue>
            <TimeLabel>годин</TimeLabel>
        </TimeBlock>
        <TimeBlock>
            <TimeValue>{minutes}</TimeValue>
            <TimeLabel>хвилин</TimeLabel>
        </TimeBlock>
        <TimeBlock>
            <TimeValue>{seconds}</TimeValue>
            <TimeLabel>секунд</TimeLabel>
        </TimeBlock>
    </TimerWrapper>
);
};
