import './ui.css'
const Select = ({
  value,
  onClick,
  backgroundColor,
  iconLeft,
  iconRight,
  borderRadius,
  width,
  type,
  onChange,
  ref,
  children,
  name,
  color,
  label,
  id
}) => {
  return (
    <>
      <label>{label}</label>
      <div
        ref={ref}
        onClick={onClick}
        style={{
          width: width || '100%',
          height: '35px',
          backgroundColor: backgroundColor,
          border: '2px solid rgba(60, 60, 60, 1)',
          outline: 'none',
          overflow: 'hidden',
          borderRadius: borderRadius,
          boxSizing: 'border-box',
          padding: '6px',
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
        }}
      >
        {iconLeft}
        <select id={id} className="select-box-ui-qr-ling"
          style={{
            width: '100%',
            color: color || 'white',
            fontSize: '14px',
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
          }}
          name={name}
          type={type || 'text'}
          value={value}
          onChange={onChange}
        >
          {children}
        </select>
        {iconRight}
      </div>
    </>
  );
};

export default Select;
