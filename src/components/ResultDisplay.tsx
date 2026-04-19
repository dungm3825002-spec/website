import { QuadraticResult } from '../utils/quadraticSolver';
import { formatNumber } from '../utils/quadraticSolver';
import ParabolaGraph from './ParabolaGraph';

interface ResultDisplayProps {
  result: QuadraticResult;
  a: number;
  b: number;
  c: number;
}

export default function ResultDisplay({ result, a, b, c }: ResultDisplayProps) {
  const renderSteps = () => {
    return (
      <div className="space-y-4">
        {/* Bước 1: Xác định phương trình */}
        <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
          <h4 className="font-semibold text-blue-900 mb-2">📋 Bước 1: Xác định phương trình</h4>
          <p className="text-gray-700">
            Phương trình: <span className="font-mono font-semibold">{a}x² + {b}x + {c} = 0</span>
          </p>
          <p className="text-gray-700 mt-1">
            Với a = {a}, b = {b}, c = {c}
          </p>
        </div>

        {/* Bước 2: Tính Delta */}
        <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
          <h4 className="font-semibold text-purple-900 mb-2">🔢 Bước 2: Tính Delta (Δ)</h4>
          <p className="text-gray-700 mb-2">
            Công thức: <span className="font-mono">Δ = b² - 4ac</span>
          </p>
          <p className="text-gray-700">
            Δ = ({b})² - 4 × ({a}) × ({c})
          </p>
          <p className="text-gray-700">
            Δ = {b * b} - {4 * a * c}
          </p>
          <p className="text-gray-700 font-semibold text-lg mt-2">
            Δ = {formatNumber(result.discriminant)}
          </p>
        </div>

        {/* Bước 3: Phân tích Delta */}
        <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
          <h4 className="font-semibold text-green-900 mb-2">📊 Bước 3: Phân tích kết quả</h4>
          {result.type === 'two-real' && (
            <>
              <p className="text-gray-700 mb-3">
                <span className="font-semibold">Δ = {formatNumber(result.discriminant)} {'>'} 0</span>
                <br />
                ➜ Phương trình có <span className="font-bold text-green-700">hai nghiệm phân biệt</span>
              </p>
              <div className="bg-white rounded-lg p-3 mt-3">
                <p className="text-gray-700 mb-2">Công thức nghiệm:</p>
                <p className="font-mono text-sm mb-2">x₁ = (-b + √Δ) / (2a)</p>
                <p className="font-mono text-sm mb-2">x₂ = (-b - √Δ) / (2a)</p>
                
                <div className="mt-3 space-y-2">
                  <p className="text-gray-700">
                    x₁ = ({-b} + √{formatNumber(result.discriminant)}) / {2 * a}
                    = ({-b} + {formatNumber(Math.sqrt(result.discriminant))}) / {2 * a}
                    = <span className="font-bold text-green-700">{formatNumber(result.x1!)}</span>
                  </p>
                  <p className="text-gray-700">
                    x₂ = ({-b} - √{formatNumber(result.discriminant)}) / {2 * a}
                    = ({-b} - {formatNumber(Math.sqrt(result.discriminant))}) / {2 * a}
                    = <span className="font-bold text-green-700">{formatNumber(result.x2!)}</span>
                  </p>
                </div>
              </div>
            </>
          )}

          {result.type === 'one-real' && (
            <>
              <p className="text-gray-700 mb-3">
                <span className="font-semibold">Δ = {formatNumber(result.discriminant)} = 0</span>
                <br />
                ➜ Phương trình có <span className="font-bold text-green-700">nghiệm kép</span>
              </p>
              <div className="bg-white rounded-lg p-3 mt-3">
                <p className="text-gray-700 mb-2">Công thức nghiệm:</p>
                <p className="font-mono text-sm mb-2">x = -b / (2a)</p>
                
                <p className="text-gray-700 mt-2">
                  x = -{b} / {2 * a}
                  = <span className="font-bold text-green-700">{formatNumber(result.x1!)}</span>
                </p>
              </div>
            </>
          )}

          {result.type === 'complex' && (
            <>
              <p className="text-gray-700 mb-3">
                <span className="font-semibold">Δ = {formatNumber(result.discriminant)} {'<'} 0</span>
                <br />
                ➜ Phương trình <span className="font-bold text-orange-700">vô nghiệm thực</span>
                <br />
                ➜ Có <span className="font-bold text-blue-700">hai nghiệm phức</span>
              </p>
              <div className="bg-white rounded-lg p-3 mt-3">
                <p className="text-gray-700 mb-2">Nghiệm phức có dạng: x = p ± qi</p>
                <p className="text-gray-700 mb-2">Trong đó:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                  <li>p (phần thực) = -b / (2a) = {formatNumber(result.realPart!)}</li>
                  <li>q (phần ảo) = √|Δ| / (2a) = {formatNumber(result.imaginaryPart!)}</li>
                </ul>
                
                <div className="mt-3 p-3 bg-blue-50 rounded">
                  <p className="font-semibold text-blue-900 mb-2">Nghiệm phức:</p>
                  <p className="font-mono">
                    x₁ = {formatNumber(result.realPart!)} + {formatNumber(result.imaginaryPart!)}i
                  </p>
                  <p className="font-mono">
                    x₂ = {formatNumber(result.realPart!)} - {formatNumber(result.imaginaryPart!)}i
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bước 4: Thông tin bổ sung */}
        <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
          <h4 className="font-semibold text-amber-900 mb-2">📈 Bước 4: Thông tin đồ thị Parabol</h4>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Hướng mở:</span>{' '}
              {a > 0 ? (
                <span className="text-green-600">⬆ Hướng lên (a {'>'} 0)</span>
              ) : (
                <span className="text-red-600">⬇ Hướng xuống (a {'<'} 0)</span>
              )}
            </p>
            <p>
              <span className="font-semibold">Trục đối xứng:</span>{' '}
              x = {formatNumber(result.axis!)}
            </p>
            <p>
              <span className="font-semibold">Đỉnh parabol:</span>{' '}
              I({formatNumber(result.vertex!.x)}, {formatNumber(result.vertex!.y)})
            </p>
            <p>
              <span className="font-semibold">Giá trị {a > 0 ? 'nhỏ nhất' : 'lớn nhất'}:</span>{' '}
              y = {formatNumber(result.vertex!.y)} tại x = {formatNumber(result.vertex!.x)}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-fadeIn">
      {/* Header kết quả */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-4">
          <span className="text-3xl">✓</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Kết Quả Giải Phương Trình
        </h2>
      </div>

      {/* Kết quả tóm tắt */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6 border-2 border-green-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">🎯 Kết quả</h3>
        
        {result.type === 'two-real' && (
          <div className="text-center space-y-2">
            <p className="text-lg text-gray-700">
              Phương trình có <span className="font-bold text-green-600">hai nghiệm phân biệt:</span>
            </p>
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 space-y-1">
              <p>x₁ = {formatNumber(result.x1!)}</p>
              <p>x₂ = {formatNumber(result.x2!)}</p>
            </div>
          </div>
        )}

        {result.type === 'one-real' && (
          <div className="text-center space-y-2">
            <p className="text-lg text-gray-700">
              Phương trình có <span className="font-bold text-blue-600">nghiệm kép:</span>
            </p>
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              <p>x₁ = x₂ = {formatNumber(result.x1!)}</p>
            </div>
          </div>
        )}

        {result.type === 'complex' && (
          <div className="text-center space-y-2">
            <p className="text-lg text-gray-700">
              Phương trình <span className="font-bold text-orange-600">vô nghiệm thực</span>
            </p>
            <p className="text-gray-600 mb-3">Có hai nghiệm phức:</p>
            <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 space-y-1">
              <p>x₁ = {formatNumber(result.realPart!)} + {formatNumber(result.imaginaryPart!)}i</p>
              <p>x₂ = {formatNumber(result.realPart!)} - {formatNumber(result.imaginaryPart!)}i</p>
            </div>
          </div>
        )}
      </div>

      {/* Đồ thị */}
      <div className="mb-6">
        <ParabolaGraph
          a={a}
          b={b}
          c={c}
          roots={result.type === 'two-real' ? [result.x1!, result.x2!] : result.type === 'one-real' ? [result.x1!] : []}
          vertex={result.vertex!}
        />
      </div>

      {/* Giải thích chi tiết */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">📝</span>
          Lời Giải Chi Tiết
        </h3>
        {renderSteps()}
      </div>

      {/* Tổng kết */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-2">💡 Tổng kết:</h4>
        <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
          <li>Phương trình bậc 2 luôn có dạng ax² + bx + c = 0 với a ≠ 0</li>
          <li>Delta (Δ) quyết định số nghiệm: Δ {'>'} 0 (2 nghiệm), Δ = 0 (nghiệm kép), Δ {'<'} 0 (vô nghiệm thực)</li>
          <li>Đồ thị của hàm số y = ax² + bx + c là một parabol</li>
          <li>Trục đối xứng của parabol là đường thẳng x = -b/(2a)</li>
        </ul>
      </div>
    </div>
  );
}
