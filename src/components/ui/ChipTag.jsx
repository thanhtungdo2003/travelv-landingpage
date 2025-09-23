import { XCircle } from "lucide-react";

export default function ChipTag({
    title,
    onRemove,
    onClick,
    icon,
    backgroundColor = "#eee",
    color = "#000",
    borderRadius = "50px",
    border = "1px solid #ccc",
    width = "auto",
    iconFill = '#737373ff',
    iconColor = 'white',
}) {
    return (
        <div
            className="chiptag"
            onClick={onClick}
            style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "4px 8px",
                gap: "4px",
                backgroundColor,
                color,
                borderRadius,
                border,
                width,
                fontSize: "14px",
                cursor: onClick ? "pointer" : "default",
                userSelect: "none"
            }}
        >
            {icon && <span className="chiptag-icon">{icon}</span>}
            <div>{title}</div>
            {onRemove && (
                <div
                    className="chiptag-remove-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                    style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                >
                    <XCircle color={iconColor} fill={iconFill} size={20} />
                </div>
            )}
        </div>
    );
}
