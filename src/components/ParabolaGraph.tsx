import { useEffect, useRef } from 'react';

interface ParabolaGraphProps {
  a: number;
  b: number;
  c: number;
  roots?: number[];
  vertex: { x: number; y: number };
}

export default function ParabolaGraph({ a, b, c, roots = [], vertex }: ParabolaGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Kích thước canvas
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Xóa canvas
    ctx.clearRect(0, 0, width, height);

    // Tính toán tỷ lệ
    const scale = 40;
    const gridSize = 1;

    // Vẽ lưới
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;

    // Lưới dọc
    for (let x = 0; x <= width; x += scale * gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Lưới ngang
    for (let y = 0; y <= height; y += scale * gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Vẽ trục tọa độ
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;

    // Trục X
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    // Trục Y
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // Vẽ mũi tên trục X
    ctx.beginPath();
    ctx.moveTo(width - 10, centerY - 5);
    ctx.lineTo(width, centerY);
    ctx.lineTo(width - 10, centerY + 5);
    ctx.stroke();

    // Vẽ mũi tên trục Y
    ctx.beginPath();
    ctx.moveTo(centerX - 5, 10);
    ctx.lineTo(centerX, 0);
    ctx.lineTo(centerX + 5, 10);
    ctx.stroke();

    // Nhãn trục
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('x', width - 20, centerY - 10);
    ctx.fillText('y', centerX + 10, 20);
    ctx.fillText('O', centerX + 10, centerY - 10);

    // Vẽ parabol
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();

    let firstPoint = true;
    for (let screenX = 0; screenX <= width; screenX += 1) {
      const mathX = (screenX - centerX) / scale;
      const mathY = a * mathX * mathX + b * mathX + c;
      const screenY = centerY - mathY * scale;

      if (screenY >= -100 && screenY <= height + 100) {
        if (firstPoint) {
          ctx.moveTo(screenX, screenY);
          firstPoint = false;
        } else {
          ctx.lineTo(screenX, screenY);
        }
      }
    }
    ctx.stroke();

    // Vẽ đỉnh parabol
    const vertexScreenX = centerX + vertex.x * scale;
    const vertexScreenY = centerY - vertex.y * scale;

    if (vertexScreenY >= 0 && vertexScreenY <= height) {
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(vertexScreenX, vertexScreenY, 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Nhãn đỉnh
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 12px Arial';
      ctx.fillText(
        `I(${vertex.x.toFixed(2)}, ${vertex.y.toFixed(2)})`,
        vertexScreenX + 10,
        vertexScreenY - 10
      );
    }

    // Vẽ các nghiệm (nếu có)
    if (roots.length > 0) {
      ctx.fillStyle = '#10b981';
      roots.forEach((root) => {
        const rootScreenX = centerX + root * scale;
        const rootScreenY = centerY;

        if (rootScreenX >= 0 && rootScreenX <= width) {
          ctx.beginPath();
          ctx.arc(rootScreenX, rootScreenY, 5, 0, 2 * Math.PI);
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Nhãn nghiệm
          ctx.fillStyle = '#10b981';
          ctx.font = 'bold 11px Arial';
          ctx.fillText(`x=${root.toFixed(2)}`, rootScreenX - 20, rootScreenY + 20);
        }
      });
    }

    // Vẽ trục đối xứng
    const axisX = centerX + vertex.x * scale;
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(axisX, 0);
    ctx.lineTo(axisX, height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Nhãn trục đối xứng
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 11px Arial';
    ctx.fillText(`x=${vertex.x.toFixed(2)}`, axisX + 5, 15);
  }, [a, b, c, roots, vertex]);

  return (
    <div className="bg-white rounded-xl p-4 shadow-inner border border-gray-200">
      <h4 className="font-semibold text-gray-800 mb-3 text-center">
        📊 Đồ Thị Parabol: y = {a}x² + {b}x + {c}
      </h4>
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="border border-gray-300 rounded bg-white"
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-4 justify-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-gray-700">Parabol</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
          <span className="text-gray-700">Đỉnh I</span>
        </div>
        {roots.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Nghiệm</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-red-500 border-dashed"></div>
          <span className="text-gray-700">Trục đối xứng</span>
        </div>
      </div>
    </div>
  );
}
