import { useRef } from 'react';
import './ui.css'
const Button = ({
  className,
  type,
  value,
  onClick,
  backgroundColor,
  iconLeft,
  iconRight,
  color,
  border,
  disable,
  flex = 1,
  borderRadius,
  onFocus,
  onBlur
}) => {
  const button = useRef();

  const handleClick = () => {
    if (button.current && !disable) {
      button.current.click();
    }
  };

  return (
    <>
      <div
        className={className ?? 'travelv-btns'}
        onClick={handleClick}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{
          opacity: disable ? 0.5 : 1,
          backgroundColor: backgroundColor || 'rgba(255, 255, 255, 1)',
          border: border || '2px solid rgba(255, 255, 255, 1)1)',
          outline: 'none',
          cursor: disable ? 'not-allowed' : 'pointer',
          borderRadius: borderRadius || '5px',
          color: color || 'rgba(75, 128, 160, 1)',
          fontSize: '13px',
          fontWeight: '510',
          padding: '5px 10px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '3px',
          flex: flex,
          justifyContent: "center"
        }}
      >
        {iconLeft}
        {value}
        {iconRight}
        <button type={type} ref={button} onClick={onClick} style={{ display: 'none' }} />
      </div>
    </>
  );
};

export default Button;
