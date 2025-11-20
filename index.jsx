import React, { useState, useEffect } from 'react';
import { Zap, ChevronRight, School, BookOpen, Activity, Award, Search, Menu, X, Battery, BatteryWarning, BatteryCharging } from 'lucide-react';

// --- 数据源 ---
const COLLEGE_DATA = {
  "英才实验学院": [
    "成电英才计划（电子与计算机科技创新领军人才）" 
  ],
  "信息与通信工程学院": [
    "电子信息工程（科技与艺术联合学位实验班）",
    "电子信息工程（“人工智能+”复合型创新人才双学位）",
    "电子信息工程",
    "通信工程",
    "信息对抗技术",
    "网络工程",
    "物联网工程"
  ],
  "电子科学与工程学院": [
    "电子科学与技术",
    "电磁场与无线技术"
  ],
  "材料与能源学院": [
    "材料科学与工程",
    "新能源材料与器件",
    "应用化学",
    "材料科学与工程（“人工智能+”复合型创新人才双学位）"
  ],
  "机械与电气工程学院": [
    "机械设计制造及其自动化",
    "电气工程及其自动化",
    "智能电网信息工程",
    "工业工程",
    "机器人工程",
    "智能电网信息工程（“人工智能+”复合型创新人才双学位）"
  ],
  "光电科学与工程学院": [
    "光电信息科学与工程",
    "信息工程"
  ],
  "自动化工程学院": [
    "测控技术与仪器",
    "自动化",
    "自动化（“人工智能+”复合型创新人才双学位）"
  ],
  "资源与环境学院": [
    "遥感科学与技术",
    "地球信息科学与技术"
  ],
  "计算机科学与工程学院（网络空间安全学院）": [
    "信息与计算科学（强基计划）",
    "计算机科学与技术（国家“珠峰计划”拔尖人才实验班）",
    "计算机科学与技术（智能金融与区块链金融“双A”联合学位）",
    "计算机科学与技术（“人工智能+”复合型创新人才双学位）",
    "计算机科学与技术",
    "网络空间安全",
    "数据科学与大数据技术",
    "人工智能"
  ],
  "航空航天学院": [
    "航空航天工程（智能无人机拔尖人才实验班）",
    "飞行器控制与信息工程",
    "无人驾驶航空器系统工程"
  ],
  "数学科学学院": [
    "数学与应用数学",
    "信息与计算科学",
    "数据科学与大数据技术",
    "数据科学与大数据技术（“人工智能+”复合型创新人才双学位）"
  ],
  "物理学院": [
    "电子信息科学与技术",
    "应用物理学",
    "应用物理学（强基计划）"
  ],
  "生命科学与技术学院": [
    "生物医学工程",
    "生物技术"
  ],
  "经济与管理学院": [
    "电子商务",
    "电子信息工程（管理与电子双学位）",
    "工商管理(数智管理与商业分析)",
    "金融学"
  ],
  "公共管理学院": [
    "信息管理与信息系统",
    "行政管理",
    "城市管理",
    "法学"
  ],
  "外国语学院": [
    "英语（“人工智能+”复合型创新人才双学位）",
    "英语",
    "日语",
    "法语"
  ],
  "集成电路科学与工程学院（示范性微电子学院）": [
    "数理基础科学（强基计划）",
    "微电子科学与工程",
    "集成电路设计与集成系统（国家示范性微电子学院）"
  ],
  "信息与软件工程学院": [
    "软件工程（“国家卓越工程师教育培养计划”特色班）",
    "软件工程（工业数智化）",
    "软件工程（“人工智能+”复合型创新人才培养实验班）"
  ],
  "医学院": [
    "临床医学",
    "护理学"
  ],
  "格拉斯哥学院": [
    "电子信息工程（中外合作办学）",
    "通信工程（中外合作办学）",
    "微电子科学与工程（中外合作办学）"
  ],
  "格拉斯哥海南学院": [
    "电子信息工程（海南陵水国际教育创新区）",
    "通信工程（海南陵水国际教育创新区）"
  ]
};

// --- 样式与主题配置 ---
const THEME = {
  primary: "bg-[#004098]",
  primaryHover: "hover:bg-[#003075]",
  secondary: "bg-[#F0F4F8]",
  accent: "text-[#E88E24]",
};

const App = () => {
  const [college, setCollege] = useState("");
  const [major, setMajor] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    setMajor("");
  }, [college]);

  // --- 核心算法：毒舌版含电量计算 ---
  const calculateElectricity = () => {
    if (!college || !major) return;

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      // 基础分大幅降低，方便拉开差距
      let baseScore = 5; 
      let bonus = 0;
      let tags = [];
      let comment = "";

      // 关键词加权 (硬核程度排序)
      const keywords = [
        { word: "英才", score: 94, tag: "卷" },
        { word: "集成电路", score: 88, tag: "磨logo" },
        { word: "微电子", score: 88, tag: "光刻操作员" },
        { word: "电子", score: 85, tag: "原味电兵" },
        { word: "电磁场", score: 90, tag: "玄学大师" },
        { word: "通信", score: 82, tag: "基站维修工" },
        { word: "光电", score: 80, tag: "光速打工人" },
        { word: "物理", score: 75, tag: "不如川大" },
        { word: "计算机", score: 70, tag: "地中海" },
        { word: "软件", score: 68, tag: "码农" },
        { word: "网络空间安全", score: 72, tag: "嘉豪" },
        { word: "人工智能", score: 75, tag: "炼丹师" },
        { word: "自动化", score: 60, tag: "万金油" },
        { word: "机器人", score: 65, tag: "万金油" },
        { word: "测控", score: 55, tag: "不如川大" },
        { word: "机械", score: 50, tag: "打铁匠" },
        { word: "数学", score: 45, tag: "不如川大" },
        { word: "材料", score: 30, tag: "生化环材" },
        { word: "生物", score: 25, tag: "劝退专业？" },
        { word: "医", score: 20, tag: "不如川大" },
        { word: "金融", score: 15, tag: "搞钱" },
        { word: "管理", score: 10, tag: "领导" },
        { word: "英语", score: 0, tag: "带路党" },
        { word: "日语", score: 0, tag: "冬雪莲" },
        { word: "法学", score: 0, tag: "罗翔" },
        { word: "行政", score: 0, tag: "考公大户" },
      ];

      let matched = false;
      // 优先匹配高分词
      keywords.sort((a, b) => b.score - a.score);

      for (let k of keywords) {
        if (major.includes(k.word)) {
          bonus = Math.max(bonus, k.score);
          tags.push(k.tag);
          matched = true;
          break; // 只取最高特征
        }
      }
      
      // 如果专业没匹配到，尝试匹配学院
      if (!matched) {
        for (let k of keywords) {
           if (college.includes(k.word)) {
             bonus = Math.max(bonus, k.score);
             tags.push(k.tag);
             matched = true;
             break;
           }
        }
      }

      // 特殊修正
      if (college === "英才实验学院") {
        bonus = 95;
        tags = ["特种兵", "卷王之王"];
      }
      
      if (major.includes("强基计划") || major.includes("珠峰")) {
        bonus += 5;
        tags.push("学术苦行僧");
      }

      if (major.includes("双学位")) {
        bonus += 2;
        tags.push("缝合怪"); // 调侃
      }

      if (major.includes("中外合作") || college.includes("格拉斯哥")) {
        // 格院分数不低，但加上特殊tag
        if(bonus > 60) bonus -= 5; // 稍微减一点硬核度，加一点洋气
        tags.push("雅思8分");
      }

      let total = baseScore + bonus;
      
      // 随机波动 (-3 ~ +3)
      const variation = Math.floor(Math.random() * 7) - 3;
      total = total + variation;
      
      // 边界限制
      if (total > 100) total = 100;
      if (total < 0) total = 0;

      // --- 毒舌评语生成 ---
      if (total >= 95) {
        comment = "忠诚电兵！建议直接把自己焊在主板上，你血管里流的不是血，是电子流。";
      } else if (total >= 85) {
        comment = "人形PCB。你是成电的亲儿子/亲女儿，走到哪都自带静电，头发可能不太保得住。";
      } else if (total >= 70) {
        comment = "赛博包工头。虽然不一定拿烙铁，但你是建设数字基建的主力军，含电量充足。";
      } else if (total >= 50) {
        comment = "混合动力。半电半软，既能写代码又能看电路图，但可能两边都学得有点秃头。";
      } else if (total >= 30) {
        comment = "弱电保护体质。你的电量仅够给手机充电，千万别碰高压线，容易短路。";
      } else if (total >= 10) {
        comment = "成电绝缘体。你在成电成功读出了综合性大学的感觉，这是一种稀缺的抗干扰能力。";
      } else {
        comment = "纯天然避雷针。兄弟/姐妹，你是来成电蹭网费的吗？物理绝缘，安全感爆棚！";
      }

      setResult({ score: total, tags, comment });
      setLoading(false);
    }, 800);
  };

  // 动态颜色
  const getScoreColor = (score) => {
    if (score >= 80) return "text-[#E88E24]"; // Orange
    if (score >= 50) return "text-[#004098]"; // Blue
    return "text-gray-500"; // Gray
  };

  const getBatteryIcon = (score) => {
     if (score >= 90) return <Zap className="w-12 h-12 text-[#E88E24] animate-pulse" />;
     if (score >= 60) return <BatteryCharging className="w-12 h-12 text-[#004098]" />;
     if (score >= 30) return <Battery className="w-12 h-12 text-gray-500" />;
     return <BatteryWarning className="w-12 h-12 text-red-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 selection:bg-blue-200 selection:text-blue-900">
      {/* --- Header --- */}
      <header className={`${THEME.primary} text-white shadow-lg sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Area */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#004098] font-bold border-2 border-blue-200 flex-shrink-0 overflow-hidden p-1.5">
                {!logoError ? (
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/zh/a/a9/University_of_Electronic_Science_and_Technology_of_China_logo.svg" 
                    alt="UESTC" 
                    className="w-full h-full object-contain"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <span style={{ fontSize: '10px', fontWeight: 'bold', lineHeight: 1 }}>UESTC</span>
                )}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-lg font-bold tracking-wide leading-tight truncate">电子科技大学</span>
                <span className="text-[10px] opacity-80 tracking-wider truncate">UNIVERSITY OF ELECTRONIC SCIENCE AND TECHNOLOGY OF CHINA</span>
              </div>
            </div>

            <nav className="hidden md:flex space-x-8 text-sm font-medium">
              <a href="#" className="hover:text-blue-200 transition-colors py-2">首页</a>
              <a href="#" className="hover:text-blue-200 transition-colors py-2">专业目录</a>
              <a href="#" className="hover:text-blue-200 transition-colors py-2">关于算法</a>
            </nav>

            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-md hover:bg-blue-800">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- Hero Section --- */}
      <div className={`relative ${THEME.primary} overflow-hidden`}>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 100 L100 0 L100 100 Z" fill="white" />
             <circle cx="20" cy="20" r="15" fill="white" className="animate-pulse"/>
             <circle cx="80" cy="80" r="25" fill="white" className="opacity-50"/>
           </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white space-y-6">
            <div className="inline-block px-4 py-1 border border-blue-300 rounded-full text-xs font-semibold tracking-wider bg-blue-900/30 backdrop-blur-sm mb-2">
              2025 招生参考
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow-md">
              你的 <span className="text-[#FFA500]">含电量</span> 达标了吗？
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-blue-100">
              是忠诚电兵还是绝缘体？
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-50" style={{clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)"}}></div>
      </div>

      {/* --- Main Content --- */}
      <main className="max-w-4xl mx-auto px-4 py-12 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Calculator Form */}
          <div className="p-8 md:p-12 space-y-8">
            <div className="flex items-center space-x-2 text-[#004098] mb-6">
              <Activity className="w-6 h-6" />
              <h2 className="text-xl font-bold">专业成分检测</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  <School className="inline w-4 h-4 mr-2 text-gray-400"/>
                  所属学院
                </label>
                <div className="relative">
                  <select 
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="block w-full pl-4 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-[#004098] focus:border-[#004098] sm:text-sm rounded-lg border bg-gray-50 hover:bg-white transition-colors appearance-none truncate"
                  >
                    <option value="" disabled>-- 请选择 --</option>
                    {Object.keys(COLLEGE_DATA).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                   <BookOpen className="inline w-4 h-4 mr-2 text-gray-400"/>
                   具体专业
                </label>
                <div className="relative">
                  <select 
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    disabled={!college}
                    className={`block w-full pl-4 pr-10 py-3 text-base sm:text-sm rounded-lg border appearance-none transition-all duration-200
                      ${!college 
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200" 
                        : "bg-gray-50 hover:bg-white border-gray-300 focus:outline-none focus:ring-[#004098] focus:border-[#004098] text-gray-900"
                      }`}
                  >
                    <option value="" disabled>{college ? "-- 请选择 --" : "-- 先选学院 --"}</option>
                    {college && COLLEGE_DATA[college].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={calculateElectricity}
                disabled={loading || !major}
                className={`w-full flex items-center justify-center py-4 px-6 border border-transparent rounded-lg text-lg font-medium text-white shadow-md transition-all duration-300
                  ${loading || !major 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-[#004098] hover:bg-[#003075] hover:shadow-xl transform hover:-translate-y-0.5"
                  }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    正在接入校园电网...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 w-5 h-5" />
                    立即检测含电量
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Result Section */}
          {result && (
            <div className="bg-[#F0F4F8] border-t border-gray-200 p-8 md:p-12 animate-fade-in-up">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                
                {/* Score Visual */}
                <div className="flex flex-col items-center justify-center space-y-4 w-full md:w-auto">
                  <div className="relative w-48 h-48 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        className="text-gray-200"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 88}
                        strokeDashoffset={2 * Math.PI * 88 * (1 - result.score / 100)}
                        className={`${getScoreColor(result.score)} transition-all duration-1000 ease-out`}
                        style={{ strokeLinecap: 'round' }}
                      />
                    </svg>
                    <div className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center ${getScoreColor(result.score)}`}>
                      <span className="text-6xl font-bold font-mono tracking-tighter">{result.score}</span>
                      <span className="text-xs font-bold uppercase tracking-wider mt-1">Electricity</span>
                    </div>
                  </div>
                  {/* Battery Icon */}
                  <div className="animate-bounce">
                    {getBatteryIcon(result.score)}
                  </div>
                </div>

                {/* Result Details */}
                <div className="flex-1 text-center md:text-left space-y-4 w-full">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center justify-center md:justify-start gap-2">
                    <Award className={`${getScoreColor(result.score)}`} />
                    鉴定结果：
                  </h3>
                  
                  <div className="bg-white p-5 rounded-xl border-l-4 border-blue-600 shadow-sm">
                    <p className="text-xl text-gray-800 font-bold leading-relaxed">
                      "{result.comment}"
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
                    {result.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 font-bold shadow-sm transform hover:rotate-2 transition-transform cursor-default">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="pt-4 mt-4">
                     <p className="text-xs text-gray-400 italic">
                       *注：本结果仅供娱乐，请勿作为转专业依据。绝缘体也有绝缘体的快乐，比如头发多。
                     </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-[#002855] text-white mt-24 py-12 border-t border-blue-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col justify-center items-center text-center space-y-4">
          <p className="text-lg font-bold">电子科技大学含电量计算器 v2.0 </p>
          <p className="text-sm text-blue-300">University of Electronic Science and Technology of China</p>
          <div className="text-blue-500 text-xs">
            © 2025 UESTC Unofficial. 
          </div>
        </div>
      </footer>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}} />
    </div>
  );
};

export default App;
