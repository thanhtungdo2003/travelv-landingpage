import { useEffect, useRef, useState } from "react";
import { useGencode } from "../contexts/gencode";
function isFinderPattern(x, y, size) {
    const zone = 11;
    if (x < zone && y < zone) return true;                // top-left
    if (x < zone && y >= size - zone) return true;         // top-right
    if (x >= size - zone && y < zone) return true;         // bottom-left
    return false;
}
function isFinderPatternWhiteRing(x, y, size) {
    const corners = [
        { startX: 0, startY: 0 },
        { startX: 0, startY: size - 7 },
        { startX: size - 7, startY: 0 }
    ];

    for (const corner of corners) {
        const dx = x - corner.startX;
        const dy = y - corner.startY;

        if (dx >= 0 && dx < 7 && dy >= 0 && dy < 7) {
            const inWhiteRing =
                ((dx === 1 || dx === 5) && dy >= 1 && dy <= 5) ||
                ((dy === 1 || dy === 5) && dx >= 1 && dx <= 5);

            if (inWhiteRing) return true;
        }
    }

    return false;
}
export default function QrCanvas({
    imgSrc = 'none',
    isIcon = false,
    matrix,
    blockSize = 10,
    backgroundColor = 'white',
    color = 'black',
    borderRadius = 0,
    onClick,
    border,
    patterns = 'block' }) {
    const canvasRef = useRef(null);
    const [downloadTrigger, onDownloadTrigger] = useState(false);
    const { qrCanvas, setQrCanvas } = useGencode();


    useEffect(() => {
        const img = new Image();

        async function drawQR() {
            const cellSize = blockSize;
            const margin = 1;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            const size = matrix.length;
            canvas.width = (size + margin * 2) * cellSize;
            canvas.height = (size + margin * 2) * cellSize;
            // nền
            if (imgSrc !== 'none') {
                img.src = imgSrc;

                // Scale và căn giữa ảnh
                const w = canvas.width;
                const h = canvas.height;
                const dx = 0;
                const dy = 0;
                ctx.drawImage(img, dx, dy, w, h);

                const arc = Math.PI * 2;
                const drawCell = (x, y, fill) => {
                    const px = (x + margin) * cellSize;
                    const py = (y + margin) * cellSize;
                    ctx.fillStyle = fill;
                    if (patterns == 'smallDot') {
                        const cx = px + cellSize / 2;
                        const cy = py + cellSize / 2;
                        ctx.beginPath();
                        ctx.arc(cx, cy, cellSize / 3.5, 0, arc);
                        ctx.fill();
                    } else if (patterns == 'star') {
                        const cx = (x + margin) * cellSize + cellSize / 2;
                        const cy = (y + margin) * cellSize + cellSize / 2;
                        const spikes = 5;
                        const outerRadius = cellSize / 2;
                        const innerRadius = cellSize / 4;
                        let rot = Math.PI / 2 * 3;
                        let step = Math.PI / spikes;
                        ctx.beginPath();
                        ctx.moveTo(cx, cy - outerRadius);
                        for (let i = 0; i < spikes; i++) {
                            let x1 = cx + Math.cos(rot) * outerRadius;
                            let y1 = cy + Math.sin(rot) * outerRadius;
                            ctx.lineTo(x1, y1);
                            rot += step;

                            let x2 = cx + Math.cos(rot) * innerRadius;
                            let y2 = cy + Math.sin(rot) * innerRadius;
                            ctx.lineTo(x2, y2);
                            rot += step;
                        }
                        ctx.closePath();
                        ctx.fill();
                    } else if (patterns == 'dot') {
                        ctx.beginPath();
                        ctx.arc(
                            (x + margin) * cellSize + cellSize / 2,
                            (y + margin) * cellSize + cellSize / 2,
                            cellSize / 2,
                            0,
                            Math.PI * 2
                        );
                        ctx.fill();
                    } else {
                        ctx.fillRect(px, py, cellSize, cellSize);
                    }
                };

                matrix.forEach((row, y) => {
                    row.forEach((cell, x) => {
                        if (cell) {
                            ctx.fillStyle = color

                            if (!isIcon && isFinderPattern(x, y, matrix.length)) {
                                ctx.fillRect(
                                    (x + margin) * cellSize,
                                    (y + margin) * cellSize,
                                    cellSize,
                                    cellSize
                                );
                                return;
                            }
                        }
                        let fill = cell ? color : 'white';

                        drawCell(x, y, fill);
                    });
                });
                return;
            }

            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            matrix.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell) {
                        ctx.fillStyle = color;
                        if (!isIcon && isFinderPattern(x, y, matrix.length)) {
                            ctx.fillRect(
                                (x + margin) * cellSize,
                                (y + margin) * cellSize,
                                cellSize,
                                cellSize
                            );

                        } else {

                            if (patterns === 'block') {
                                // Vuông
                                ctx.fillRect(
                                    (x + margin) * cellSize,
                                    (y + margin) * cellSize,
                                    cellSize,
                                    cellSize
                                );
                            } else if (patterns === 'dot') {
                                // Tròn full cell
                                ctx.beginPath();
                                ctx.arc(
                                    (x + margin) * cellSize + cellSize / 2,
                                    (y + margin) * cellSize + cellSize / 2,
                                    cellSize / 2,
                                    0,
                                    Math.PI * 2
                                );
                                ctx.fill();
                            } else if (patterns === 'smallDot') {
                                // Tròn nhỏ hơn 
                                ctx.beginPath();
                                ctx.arc(
                                    (x + margin) * cellSize + cellSize / 2,
                                    (y + margin) * cellSize + cellSize / 2,
                                    cellSize / 3, // nhỏ hơn
                                    0,
                                    Math.PI * 2
                                );
                                ctx.fill();
                            } else if (patterns === 'triangle') {
                                // Tam giác đều
                                const cx = (x + margin) * cellSize + cellSize / 2;
                                const cy = (y + margin) * cellSize + cellSize / 2;
                                const r = cellSize / 2;
                                ctx.beginPath();
                                for (let i = 0; i < 3; i++) {
                                    const angle = (Math.PI * 2 / 3) * i - Math.PI / 2;
                                    const px = cx + r * Math.cos(angle);
                                    const py = cy + r * Math.sin(angle);
                                    if (i === 0) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.closePath();
                                ctx.fill();
                            } else if (patterns === 'star') {
                                // Ngôi sao 5 cánh
                                const cx = (x + margin) * cellSize + cellSize / 2;
                                const cy = (y + margin) * cellSize + cellSize / 2;
                                const spikes = 5;
                                const outerRadius = cellSize / 2;
                                const innerRadius = cellSize / 4;
                                let rot = Math.PI / 2 * 3;
                                let step = Math.PI / spikes;
                                ctx.beginPath();
                                ctx.moveTo(cx, cy - outerRadius);
                                for (let i = 0; i < spikes; i++) {
                                    let x1 = cx + Math.cos(rot) * outerRadius;
                                    let y1 = cy + Math.sin(rot) * outerRadius;
                                    ctx.lineTo(x1, y1);
                                    rot += step;

                                    let x2 = cx + Math.cos(rot) * innerRadius;
                                    let y2 = cy + Math.sin(rot) * innerRadius;
                                    ctx.lineTo(x2, y2);
                                    rot += step;
                                }
                                ctx.closePath();
                                ctx.fill();

                            } else if (patterns === 'diamond') {
                                const cx = (x + margin) * cellSize + cellSize / 2;
                                const cy = (y + margin) * cellSize + cellSize / 2;
                                const r = cellSize / 2;
                                ctx.beginPath();
                                ctx.moveTo(cx, cy - r);
                                ctx.lineTo(cx + r, cy);
                                ctx.lineTo(cx, cy + r);
                                ctx.lineTo(cx - r, cy);
                                ctx.closePath();
                                ctx.fill();
                            } else if (patterns === 'heart') {
                                const cx = (x + margin) * cellSize + cellSize / 2;
                                const cy = (y + margin) * cellSize + cellSize / 2;
                                const r = cellSize / 2.5;
                                ctx.beginPath();
                                ctx.moveTo(cx, cy + r);
                                ctx.bezierCurveTo(cx + r * 2, cy - r, cx + r, cy - r * 3, cx, cy - r);
                                ctx.bezierCurveTo(cx - r, cy - r * 3, cx - r * 2, cy - r, cx, cy + r);
                                ctx.closePath();
                                ctx.fill();
                            }

                        }
                    }
                });
            });

            // nếu muốn chèn logo sau khi vẽ
            /*
            const logo = new Image();
            logo.src = "/logo.png"; // đường dẫn logo
            logo.onload = () => {
              const lw = canvas.width / 4;
              const lh = canvas.height / 4;
              ctx.drawImage(
                logo,
                (canvas.width - lw) / 2,
                (canvas.height - lh) / 2,
                lw,
                lh
              );
            };
            */
            setQrCanvas(canvas)
        }
        drawQR();
    }, [patterns, color, backgroundColor, imgSrc]);

    return <canvas onClick={onClick} style={{
        borderRadius: borderRadius,
        border: border
    }} ref={canvasRef} />;
}
