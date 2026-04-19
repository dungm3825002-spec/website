import { useState, useCallback, useMemo } from "react";

// BMI Categories with detailed info
const BMI_CATEGORIES = [
  {
    label: "Gầy nặng",
    min: 0,
    max: 16,
    color: "#6366f1",
    bgGradient: "from-indigo-500 to-violet-600",
    emoji: "⚠️",
    description: "Thiếu cân nặng - Nguy hiểm",
    healthRisk: "Rất cao",
    advice: [
      "Cần đến gặp bác sĩ ngay để được tư vấn chế độ dinh dưỡng phù hợp",
      "Ăn nhiều bữa nhỏ trong ngày, tăng cường thực phẩm giàu calori và protein",
      "Bổ sung các loại hạt, bơ, sữa, thịt nạc, cá vào chế độ ăn hàng ngày",
      "Tránh vận động quá mức, tập thể dục nhẹ nhàng như yoga, đi bộ",
      "Kiểm tra sức khỏe định kỳ để loại bỏ các nguyên nhân bệnh lý",
    ],
  },
  {
    label: "Gầy trung bình",
    min: 16,
    max: 17,
    color: "#8b5cf6",
    bgGradient: "from-violet-500 to-purple-500",
    emoji: "😰",
    description: "Thiếu cân mức độ trung bình",
    healthRisk: "Cao",
    advice: [
      "Tăng cường dinh dưỡng với chế độ ăn giàu protein và carbohydrate phức",
      "Ăn 5-6 bữa/ngày thay vì 3 bữa chính",
      "Bổ sung sữa, trứng, thịt, cá, các loại đậu và hạt vào bữa ăn",
      "Tập thể dục适度 để tăng cơ bắp, không nên bỏ bữa",
      "Tham khảo ý kiến chuyên gia dinh dưỡng để có kế hoạch tăng cân khoa học",
    ],
  },
  {
    label: "Gầy nhẹ",
    min: 17,
    max: 18.5,
    color: "#a78bfa",
    bgGradient: "from-purple-400 to-violet-500",
    emoji: "😟",
    description: "Thiếu cân nhẹ",
    healthRisk: "Thấp",
    advice: [
      "Bổ sung thêm calori lành mạnh vào chế độ ăn hàng ngày",
      "Ăn vặthealthy giữa các bữa chính: hạt, trái cây sấy, sữa chua",
      "Uống sinh tố trái cây với sữa và mật ong",
      "Tập luyện thể thao đều đặn để tăng khối lượng cơ",
      "Đảm bảo ngủ đủ giấc 7-8 tiếng mỗi đêm để cơ thể phục hồi",
    ],
  },
  {
    label: "Bình thường",
    min: 18.5,
    max: 25,
    color: "#22c55e",
    bgGradient: "from-emerald-400 to-green-500",
    emoji: "😊",
    description: "Cân nặng lý tưởng - Tuyệt vời!",
    healthRisk: "Thấp nhất",
    advice: [
      "Duy trì chế độ ăn cân bằng: nhiều rau xanh, trái cây, protein nạc",
      "Tập thể dục ít nhất 30 phút/ngày, 5 ngày/tuần",
      "Uống đủ 2 lít nước mỗi ngày",
      "Giữ thói quen ngủ đúng giờ, đủ 7-8 tiếng/đêm",
      "Kiểm tra sức khỏe định kỳ 6 tháng/lần để phát hiện sớm vấn đề",
      "Tiếp tục lối sống lành mạnh và tích cực!",
    ],
  },
  {
    label: "Thừa cân nhẹ",
    min: 25,
    max: 30,
    color: "#f59e0b",
    bgGradient: "from-amber-400 to-orange-500",
    emoji: "😐",
    description: "Thừa cân mức độ nhẹ",
    healthRisk: "Trung bình",
    advice: [
      "Giảm lượng calori tiêu thụ mỗi ngày khoảng 300-500 calo",
      "Hạn chế đồ ngọt, thức ăn nhanh, nước có ga",
      "Tăng cường rau xanh, trái cây, và thực phẩm giàu chất xơ",
      "Tập cardio 30-45 phút/ngày: chạy bộ, đạp xe, bơi lội",
      "Ăn chậm, nhai kỹ để não bộ nhận tín hiệu no đúng lúc",
      "Tránh ăn khuya và hạn chế dùng điện thoại khi ăn",
    ],
  },
  {
    label: "Béo phì độ I",
    min: 30,
    max: 35,
    color: "#f97316",
    bgGradient: "from-orange-500 to-red-500",
    emoji: "😟",
    description: "Béo phì mức độ I",
    healthRisk: "Cao",
    advice: [
      "Tham khảo ý kiến bác sĩ để có kế hoạch giảm cân an toàn",
      "Áp dụng chế độ ăn low-carb hoặc Địa Trung Hải",
      "Tập thể dục cường độ vừa, 45-60 phút/ngày, 5-6 ngày/tuần",
      "Loại bỏ hoàn toàn đồ ngọt, rượu bia, thức ăn chế biến sẵn",
      "Theo dõi cân nặng và vòng eo hàng tuần",
      "Xem xét tư vấn tâm lý nếu ăn do căng thẳng",
    ],
  },
  {
    label: "Béo phì độ II",
    min: 35,
    max: 40,
    color: "#ef4444",
    bgGradient: "from-red-500 to-rose-600",
    emoji: "😰",
    description: "Béo phì mức độ II - Nguy hiểm",
    healthRisk: "Rất cao",
    advice: [
      "Cần đến gặp bác sĩ chuyên khoa nội tiết và dinh dưỡng ngay",
      "Thực hiện chế độ giảm calo nghiêm ngặt dưới sự giám sát y tế",
      "Kiểm tra đường huyết, huyết áp, cholesterol định kỳ",
      "Tập thể dục dưới sự hướng dẫn của chuyên gia, tránh chấn thương",
      "Xem xét các phương pháp điều trị y khoa nếu cần thiết",
      "Tìm kiếm hỗ trợ từ gia đình và nhóm giảm cân cộng đồng",
    ],
  },
  {
    label: "Béo phì độ III",
    min: 40,
    max: 100,
    color: "#dc2626",
    bgGradient: "from-red-600 to-rose-800",
    emoji: "⚠️",
    description: "Béo phì mức độ III - Rất nguy hiểm",
    healthRisk: "Cực kỳ cao",
    advice: [
      "PHẢI đến gặp bác sĩ chuyên khoa ngay lập tức!",
      "Cần can thiệp y khoa chuyên sâu và theo dõi liên tục",
      "Xem xét phẫu thuật giảm béo theo chỉ định của bác sĩ",
      "Kiểm tra tim mạch, hô hấp, tiểu đường và các biến chứng",
      "Tuân thủ tuyệt đối phác đồ điều trị của bác sĩ",
      "Nhận hỗ trợ tâm lý để vượt qua giai đoạn khó khăn",
    ],
  },
];

function getCategory(bmi: number) {
  return BMI_CATEGORIES.find((c) => bmi >= c.min && bmi < c.max) || BMI_CATEGORIES[BMI_CATEGORIES.length - 1];
}

function BMIGauge({ bmi }: { bmi: number | null }) {
  const percentage = bmi ? Math.min(Math.max(((bmi - 10) / 35) * 100, 0), 100) : 50;
  const category = bmi ? getCategory(bmi) : null;
  const needleRotation = bmi ? -90 + (percentage / 100) * 180 : -90;

  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg viewBox="0 0 300 180" className="w-full">
        <defs>
          {BMI_CATEGORIES.map((cat, i) => (
              <linearGradient key={i} id={`grad-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={cat.color} stopOpacity="0.9" />
                <stop offset="100%" stopColor={cat.color} stopOpacity="1" />
              </linearGradient>
          ))}
        </defs>

        {BMI_CATEGORIES.map((cat, i) => {
          const startAngle = -90 + (i / BMI_CATEGORIES.length) * 180;
          const endAngle = -90 + ((i + 1) / BMI_CATEGORIES.length) * 180 - 1;
          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (endAngle * Math.PI) / 180;
          const outerR = 120;
          const innerR = 85;
          const cx = 150;
          const cy = 150;

          const x1o = cx + outerR * Math.cos(startRad);
          const y1o = cy + outerR * Math.sin(startRad);
          const x2o = cx + outerR * Math.cos(endRad);
          const y2o = cy + outerR * Math.sin(endRad);
          const x1i = cx + innerR * Math.cos(endRad);
          const y1i = cy + innerR * Math.sin(endRad);
          const x2i = cx + innerR * Math.cos(startRad);
          const y2i = cy + innerR * Math.sin(startRad);

          const largeArc = endAngle - startAngle > 180 ? 1 : 0;

          return (
            <path
              key={i}
              d={`M ${x1o} ${y1o} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2o} ${y2o} L ${x1i} ${y1i} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x2i} ${y2i} Z`}
              fill={cat.color}
              opacity={bmi && getCategory(bmi) === cat ? 1 : 0.4}
              className="transition-all duration-500"
            />
          );
        })}

        {/* Category labels */}
        {BMI_CATEGORIES.filter((_, i) => [0, 3, 4, 5, 7].includes(i)).map((cat, idx) => {
          const indices = [0, 3, 4, 5, 7];
          const i = indices[idx];
          const midAngle = -90 + ((i + 0.5) / BMI_CATEGORIES.length) * 180;
          const midRad = (midAngle * Math.PI) / 180;
          const labelR = 135;
          const lx = 150 + labelR * Math.cos(midRad);
          const ly = 150 + labelR * Math.sin(midRad);
          return (
            <text
              key={`label-${i}`}
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[7px] font-semibold fill-gray-700"
            >
              {cat.label}
            </text>
          );
        })}

        {/* Needle */}
        {bmi && (
          <g transform={`rotate(${needleRotation}, 150, 150)`}>
            <line
              x1="150"
              y1="150"
              x2="150"
              y2="45"
              stroke={category?.color || "#333"}
              strokeWidth="3"
              strokeLinecap="round"
              className="transition-all duration-700"
            />
            <circle cx="150" cy="150" r="8" fill={category?.color || "#333"} className="transition-all duration-500" />
            <circle cx="150" cy="150" r="4" fill="white" />
          </g>
        )}

        {/* BMI Value Display */}
        <text x="150" y="130" textAnchor="middle" className="text-3xl font-bold" fill={category?.color || "#64748b"}>
          {bmi ? bmi.toFixed(1) : "--"}
        </text>
        <text x="150" y="150" textAnchor="middle" className="text-xs fill-gray-400 font-medium">
          BMI
        </text>
      </svg>
    </div>
  );
}

function InfoCard({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function App() {
  const [height, setHeight] = useState<number>(170);
  const [weight, setWeight] = useState<number>(65);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<number>(25);
  const [showResult, setShowResult] = useState(false);

  const bmi = useMemo(() => {
    if (height > 0 && weight > 0) {
      const heightM = height / 100;
      return weight / (heightM * heightM);
    }
    return null;
  }, [height, weight]);

  const category = bmi ? getCategory(bmi) : null;

  const idealWeight = useMemo(() => {
    if (!height) return null;
    const heightM = height / 100;
    const minIdeal = 18.5 * heightM * heightM;
    const maxIdeal = 24.9 * heightM * heightM;
    return { min: minIdeal.toFixed(1), max: maxIdeal.toFixed(1) };
  }, [height]);

  const bmr = useMemo(() => {
    if (!height || !weight || !age) return null;
    if (gender === "male") {
      return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else {
      return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    }
  }, [height, weight, gender, age]);

  const waterIntake = useMemo(() => {
    return weight ? (weight * 0.033).toFixed(1) : null;
  }, [weight]);

  const handleCalculate = useCallback(() => {
    setShowResult(true);
  }, []);

  const handleReset = useCallback(() => {
    setHeight(170);
    setWeight(65);
    setAge(25);
    setGender("male");
    setShowResult(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 font-['Inter',sans-serif]">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-8 md:py-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
            <span className="text-white/90 text-sm font-medium">🏥 Công cụ sức khỏe</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
            Tính Chỉ Số BMI
          </h1>
          <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Kiểm tra chỉ số khối cơ thể (Body Mass Index) để đánh giá tình trạng cân nặng
            <br className="hidden md:block" />
            và nhận lời khuyên sức khỏe cá nhân hóa
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8">
        {/* Input Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Info */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white text-lg">👤</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Thông tin cá nhân</h2>
            </div>

            {/* Gender */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-600 mb-3">Giới tính</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setGender("male")}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all duration-200 font-medium ${
                    gender === "male"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                  }`}
                >
                  <span className="text-xl">👨</span> Nam
                </button>
                <button
                  onClick={() => setGender("female")}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all duration-200 font-medium ${
                    gender === "female"
                      ? "border-pink-500 bg-pink-50 text-pink-700"
                      : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                  }`}
                >
                  <span className="text-xl">👩</span> Nữ
                </button>
              </div>
            </div>

            {/* Age */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Tuổi: <span className="text-indigo-600 font-bold text-lg">{age}</span> tuổi
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>10</span>
                <span>100</span>
              </div>
            </div>
          </div>

          {/* Body Metrics */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <span className="text-white text-lg">📏</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Số đo cơ thể</h2>
            </div>

            {/* Height */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Chiều cao: <span className="text-emerald-600 font-bold text-lg">{height}</span> cm
              </label>
              <input
                type="range"
                min="100"
                max="220"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>100 cm</span>
                <span>220 cm</span>
              </div>
            </div>

            {/* Weight */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Cân nặng: <span className="text-emerald-600 font-bold text-lg">{weight}</span> kg
              </label>
              <input
                type="range"
                min="30"
                max="200"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>30 kg</span>
                <span>200 kg</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCalculate}
                className="flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                🔍 Tính BMI
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-3.5 bg-gray-100 text-gray-600 font-semibold rounded-xl hover:bg-gray-200 active:scale-[0.98] transition-all duration-200"
              >
                ↻
              </button>
            </div>
          </div>
        </div>

        {/* Result Section */}
        {showResult && bmi && category && (
          <div className="space-y-6 animate-fade-in">
            {/* BMI Score Card */}
            <div className={`bg-gradient-to-r ${category.bgGradient} rounded-2xl shadow-2xl p-6 md:p-8 text-white relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl" />
              </div>
              <div className="relative">
                <div className="grid md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-1 text-center md:text-left">
                    <p className="text-white/80 text-sm font-medium mb-1">Chỉ số BMI của bạn</p>
                    <p className="text-6xl md:text-7xl font-black tracking-tight">{bmi.toFixed(1)}</p>
                    <div className="mt-2 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5">
                      <span className="text-xl">{category.emoji}</span>
                      <span className="font-bold text-sm">{category.label}</span>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <BMIGauge bmi={bmi} />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 shadow-md p-4 text-center">
                <div className="text-2xl mb-1">⚖️</div>
                <p className="text-xs text-gray-500 font-medium">Cân nặng lý tưởng</p>
                <p className="text-lg font-bold text-gray-800 mt-1">
                  {idealWeight?.min} - {idealWeight?.max} kg
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 shadow-md p-4 text-center">
                <div className="text-2xl mb-1">🔥</div>
                <p className="text-xs text-gray-500 font-medium">BMR (Năng lượng cần)</p>
                <p className="text-lg font-bold text-gray-800 mt-1">
                  {bmr ? Math.round(bmr) : "--"} kcal
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 shadow-md p-4 text-center">
                <div className="text-2xl mb-1">💧</div>
                <p className="text-xs text-gray-500 font-medium">Nước cần uống/ngày</p>
                <p className="text-lg font-bold text-gray-800 mt-1">
                  {waterIntake} lít
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 shadow-md p-4 text-center">
                <div className="text-2xl mb-1">❤️</div>
                <p className="text-xs text-gray-500 font-medium">Mức độ rủi ro</p>
                <p className="text-lg font-bold mt-1" style={{ color: category.color }}>
                  {category.healthRisk}
                </p>
              </div>
            </div>

            {/* BMI Scale Reference */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">📊</span>
                <h3 className="text-lg font-bold text-gray-800">Bảng phân loại BMI (WHO)</h3>
              </div>
              <div className="space-y-2">
                {BMI_CATEGORIES.map((cat, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                      getCategory(bmi) === cat
                        ? "bg-gray-50 ring-2 shadow-md"
                        : "hover:bg-gray-50"
                    }`}
                    style={
                      getCategory(bmi) === cat
                        ? { boxShadow: `0 4px 14px ${cat.color}33, 0 0 0 2px ${cat.color}55` }
                        : {}
                    }
                  >
                    <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:gap-4">
                      <span className={`font-semibold text-sm ${getCategory(bmi) === cat ? "text-gray-900" : "text-gray-600"}`}>
                        {cat.label}
                      </span>
                      <span className="text-xs text-gray-400">
                        BMI: {cat.min} - {cat.max === 100 ? "∞" : cat.max}
                      </span>
                    </div>
                    {getCategory(bmi) === cat && (
                      <span className="text-xs font-bold px-2 py-1 rounded-full text-white" style={{ backgroundColor: cat.color }}>
                        Bạn ở đây
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Health Advice */}
            <div className="grid md:grid-cols-2 gap-6">
              <InfoCard icon="💡" title="Lời khuyên sức khỏe">
                <div className="space-y-3">
                  {category.advice.map((tip, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div
                        className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold mt-0.5"
                        style={{ backgroundColor: category.color }}
                      >
                        {i + 1}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </InfoCard>

              <div className="space-y-6">
                <InfoCard icon="📋" title="Giải thích chỉ số">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">BMI là gì?</p>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        BMI (Body Mass Index) là chỉ số khối cơ thể, được tính bằng công thức:
                        <strong> Cân nặng (kg) ÷ Chiều cao² (m²)</strong>. Đây là chỉ số được Tổ chức
                        Y tế Thế giới (WHO) sử dụng để phân loại tình trạng cân nặng.
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Kết quả của bạn:</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-gray-500">Chiều cao:</div>
                        <div className="font-semibold text-gray-700">{height} cm</div>
                        <div className="text-gray-500">Cân nặng:</div>
                        <div className="font-semibold text-gray-700">{weight} kg</div>
                        <div className="text-gray-500">BMI:</div>
                        <div className="font-semibold" style={{ color: category.color }}>
                          {bmi.toFixed(1)}
                        </div>
                        <div className="text-gray-500">Phân loại:</div>
                        <div className="font-semibold" style={{ color: category.color }}>
                          {category.description}
                        </div>
                      </div>
                    </div>
                    {idealWeight && (
                      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                        <p className="text-sm text-blue-800">
                          <span className="font-bold">💡 Mẹo:</span> Cân nặng lý tưởng cho chiều cao{" "}
                          {height} cm của bạn là{" "}
                          <strong>
                            {idealWeight.min} - {idealWeight.max} kg
                          </strong>
                          . Hiện tại bạn {weight < parseFloat(idealWeight.min) ? "nhẹ hơn" : weight > parseFloat(idealWeight.max) ? "nặng hơn" : "nằm trong"} mức lý tưởng
                          {weight < parseFloat(idealWeight.min) && (
                            <span> khoảng <strong>{(parseFloat(idealWeight.min) - weight).toFixed(1)} kg</strong></span>
                          )}
                          {weight > parseFloat(idealWeight.max) && (
                            <span> khoảng <strong>{(weight - parseFloat(idealWeight.max)).toFixed(1)} kg</strong></span>
                          )}.
                        </p>
                      </div>
                    )}
                  </div>
                </InfoCard>

                <InfoCard icon="⚠️" title="Lưu ý quan trọng">
                  <div className="text-sm text-gray-500 leading-relaxed space-y-2">
                    <p>
                      • BMI chỉ là chỉ số tham khảo, không phản ánh chính xác sức khỏe của mỗi cá nhân.
                    </p>
                    <p>
                      • BMI không phân biệt được giữa khối lượng cơ bắp và mỡ. Vận động viên có thể có BMI cao nhưng vẫn khỏe mạnh.
                    </p>
                    <p>
                      • Phụ nữ có thai, người già và trẻ em cần sử dụng các tiêu chuẩn đánh giá khác.
                    </p>
                    <p>
                      • Luôn tham khảo ý kiến bác sĩ trước khi thay đổi chế độ ăn uống hoặc tập luyện.
                    </p>
                  </div>
                </InfoCard>
              </div>
            </div>
          </div>
        )}

        {/* Quick Info (always visible) */}
        {!showResult && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">📊</span>
              <h3 className="text-lg font-bold text-gray-800">Bảng phân loại BMI theo WHO</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {BMI_CATEGORIES.map((cat, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4 text-center border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-8 h-8 rounded-full mx-auto mb-2" style={{ backgroundColor: cat.color }} />
                  <p className="font-semibold text-sm text-gray-700">{cat.label}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {cat.min} - {cat.max === 100 ? "∞" : cat.max}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <p className="text-sm text-blue-800 text-center">
                💡 <strong>Nhập thông tin</strong> và nhấn <strong>"Tính BMI"</strong> để xem kết quả chi tiết và lời khuyên sức khỏe cá nhân hóa!
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-gray-100 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          <p className="text-sm text-gray-400">
            🏥 Công cụ tính BMI — Chỉ mang tính chất tham khảo, không thay thế tư vấn y tế chuyên nghiệp
          </p>
          <p className="text-xs text-gray-300 mt-2">
            Công thức: BMI = Cân nặng (kg) ÷ [Chiều cao (m)]² • Tiêu chuẩn phân loại: WHO
          </p>
        </div>
      </footer>
    </div>
  );
}
