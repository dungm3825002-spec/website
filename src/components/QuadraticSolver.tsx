import { useState } from 'react';
import { solveQuadratic, QuadraticResult } from '../utils/quadraticSolver';
import ResultDisplay from './ResultDisplay';

export default function QuadraticSolver() {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [c, setC] = useState<string>('');
  const [result, setResult] = useState<QuadraticResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSolve = () => {
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const cNum = parseFloat(c);

    if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum)) {
      alert('Vui lòng nhập đầy đủ các hệ số hợp lệ!');
      return;
    }

    if (aNum === 0) {
      alert('Hệ số a phải khác 0 để là phương trình bậc 2!');
      return;
    }

    const solution = solveQuadratic(aNum, bNum, cNum);
    setResult(solution);
    setShowResult(true);
  };

  const handleReset = () => {
    setA('');
    setB('');
    setC('');
    setResult(null);
    setShowResult(false);
  };

  const handleExample = (exampleNum: number) => {
    switch (exampleNum) {
      case 1:
        setA('1');
        setB('-5');
        setC('6');
        break;
      case 2:
        setA('1');
        setB('-4');
        setC('4');
        break;
      case 3:
        setA('1');
        setB('2');
        setC('5');
        break;
    }
    setShowResult(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Card chính */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
        {/* Công thức */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border border-blue-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 text-center">
            Phương trình dạng:
          </h2>
          <div className="text-center">
            <span className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              ax² + bx + c = 0
            </span>
          </div>
        </div>

        {/* Input fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hệ số a
            </label>
            <input
              type="number"
              step="any"
              value={a}
              onChange={(e) => setA(e.target.value)}
              placeholder="Nhập a"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hệ số b
            </label>
            <input
              type="number"
              step="any"
              value={b}
              onChange={(e) => setB(e.target.value)}
              placeholder="Nhập b"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hệ số c
            </label>
            <input
              type="number"
              step="any"
              value={c}
              onChange={(e) => setC(e.target.value)}
              placeholder="Nhập c"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-lg"
            />
          </div>
        </div>

        {/* Preview equation */}
        {(a || b || c) && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Phương trình của bạn:</p>
            <p className="text-xl font-semibold text-gray-800">
              {a || '0'}x² {parseFloat(b) >= 0 ? '+' : ''} {b || '0'}x {parseFloat(c) >= 0 ? '+' : ''} {c || '0'} = 0
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleSolve}
            className="flex-1 min-w-[150px] bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            🧮 Giải phương trình
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
          >
            🔄 Làm mới
          </button>
        </div>

        {/* Ví dụ */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-600 mb-3">Thử các ví dụ:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleExample(1)}
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm hover:bg-blue-100 transition-colors border border-blue-200"
            >
              x² - 5x + 6 = 0
            </button>
            <button
              onClick={() => handleExample(2)}
              className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm hover:bg-purple-100 transition-colors border border-purple-200"
            >
              x² - 4x + 4 = 0
            </button>
            <button
              onClick={() => handleExample(3)}
              className="px-4 py-2 bg-pink-50 text-pink-700 rounded-lg text-sm hover:bg-pink-100 transition-colors border border-pink-200"
            >
              x² + 2x + 5 = 0
            </button>
          </div>
        </div>
      </div>

      {/* Kết quả */}
      {showResult && result && (
        <ResultDisplay result={result} a={parseFloat(a)} b={parseFloat(b)} c={parseFloat(c)} />
      )}
    </div>
  );
}
