const TextField = ({
  value,
  onClick,
  backgroundColor,
  iconLeft,
  iconRight,
  borderRadius,
  placeholder,
  width,
  border,
  type,
  onChange,
  ref,
  flex,
  mutiline = false,
  name,
  textAlign = 'start',
  error = false,
  label,
  id,
  disabled = false,
  labelError,
  maxLength,
  max,
  min
}) => {
  return (
    <>
      <div style={{ width: width || '100%' }}>
        {label != 'none' ? <label style={{
          color: "#434343ff",
          fontWeight: 550
        }}>{label}</label> : <></>}
        <div

          ref={ref}
          onClick={onClick}
          style={{
            flex: flex || 1,
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? "not-allowed" : "text",
            backgroundColor: backgroundColor || "rgba(255, 255, 255, 1)",
            border: border || '1px solid rgba(214, 214, 214, 1)',
            boxShadow: 'none',
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
          {mutiline ? (
            <textarea

              disabled={disabled}
              id={id}
              rows={4}
              maxLength={maxLength || 1720000}
              style={{
                cursor: disabled ? "not-allowed" : "text",
                maxHeight: '300px',
                width: '100%',
                color: 'rgba(67, 67, 67, 1)',
                fontSize: '14px',
                border: 'none',
                outline: 'none',
                backgroundColor: "transparent"
              }}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              name={name}
            ></textarea>
          ) : (
            <input
              max={max}
              min={min}
              disabled={disabled}
              id={id}
              maxLength={maxLength || 1720000}
              style={{
                textAlign: textAlign,
                cursor: disabled ? "not-allowed" : "text",
                width: '100%',
                color: 'rgba(67, 67, 67, 1)',
                fontSize: '14px',
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
              }}
              name={name}
              type={type || 'text'}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onBlur={(e) => {
                if (error) {
                  e.target.parentElement.style.border = ' 2px solid rgb(228, 0, 0) ';
                  e.target.parentElement.style.boxShadow = ' 0px 0px 5px rgba(228, 0, 0, 0.39)';
                } else {
                  e.target.parentElement.style.border = border || ' 1px solid rgba(206, 206, 206, 1) ';
                  e.target.parentElement.style.boxShadow = ' none';
                }
              }}
            />
          )}

          {iconRight}
        </div>
        {labelError != 'none' ? <label style={{
          color: "red",
        }}>{error ? labelError : ""}</label> : <></>}
      </div>
    </>
  );
};

export default TextField;
