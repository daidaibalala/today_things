import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import LovePage from './pages/LovePage';
import WorkPage from './pages/WorkPage';

function HomePage() {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [luckyColor, setLuckyColor] = useState('');
  const [tarotCard, setTarotCard] = useState(null);
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState('');
  const [hasGenerated, setHasGenerated] = useState(false);

  // 塔罗牌数据
  const tarotCards = [
    // 大阿尔卡纳牌 (22张)
    {
      name: '0 - 愚者',
      meaning: '正位：新的开始、冒险、自由、天真、自发性\n逆位：鲁莽、冒失、不负责任、过于理想化',
      image: '🃏'
    },
    {
      name: 'I - 魔术师',
      meaning: '正位：创造力、技能、意志力、自信、专注\n逆位：优柔寡断、欺骗、技能不足、创意受阻',
      image: '✨'
    },
    {
      name: 'II - 女祭司',
      meaning: '正位：直觉、神秘、内在知识、智慧\n逆位：隐藏的动机、表面性格、混乱、缺乏洞察力',
      image: '👑'
    },
    {
      name: 'III - 女皇',
      meaning: '正位：丰饶、母性、创造力、安全感、富足\n逆位：依赖、过度保护、不安全感、创造力受阻',
      image: '👸'
    },
    {
      name: 'IV - 皇帝',
      meaning: '正位：权威、领导力、控制、稳定、理性\n逆位：专制、固执、过度控制、不成熟',
      image: '🤴'
    },
    {
      name: 'V - 教皇',
      meaning: '正位：精神指引、传统、教育、信仰、建议\n逆位：教条主义、不自由、叛逆、坏建议',
      image: '🙏'
    },
    {
      name: 'VI - 恋人',
      meaning: '正位：爱情、和谐、关系、选择、价值观\n逆位：不和谐、分离、错误选择、价值观冲突',
      image: '💑'
    },
    {
      name: 'VII - 战车',
      meaning: '正位：胜利、意志力、自信、决心、进展\n逆位：失败、自负、犹豫、方向错误',
      image: '🏃'
    },
    {
      name: 'VIII - 力量',
      meaning: '正位：力量、勇气、耐心、同情心、自控\n逆位：软弱、自我怀疑、缺乏信心、失控',
      image: '💪'
    },
    {
      name: 'IX - 隐士',
      meaning: '正位：内省、智慧、独处、指引、谨慎\n逆位：孤独、封闭、偏执、迷失方向',
      image: '🧙'
    },
    {
      name: 'X - 命运之轮',
      meaning: '正位：转机、机会、命运、变化、进展\n逆位：倒霉、阻碍、计划受阻、不良循环',
      image: '🎡'
    },
    {
      name: 'XI - 正义',
      meaning: '正位：公正、真理、诚实、因果、平衡\n逆位：不公、失衡、偏见、欺骗',
      image: '⚖️'
    },
    {
      name: 'XII - 倒吊人',
      meaning: '正位：牺牲、等待、新视角、智慧\n逆位：无谓牺牲、拖延、固执',
      image: '🙃'
    },
    {
      name: 'XIII - 死神',
      meaning: '正位：结束、转变、蜕变、新生\n逆位：停滞、抗拒改变、惧怕失去',
      image: '💀'
    },
    {
      name: 'XIV - 节制',
      meaning: '正位：平衡、节制、调和、耐心\n逆位：失衡、过度、冲突、浪费',
      image: '🌊'
    },
    {
      name: 'XV - 恶魔',
      meaning: '正位：束缚、欲望、执着、物质主义\n逆位：释放、觉醒、摆脱束缚',
      image: '😈'
    },
    {
      name: 'XVI - 塔',
      meaning: '正位：突变、崩塌、意外、启示\n逆位：避免灾难、渐进改变、恐惧改变',
      image: '🗼'
    },
    {
      name: 'XVII - 星星',
      meaning: '正位：希望、启发、灵感、治愈\n逆位：失望、消沉、迷失方向',
      image: '⭐'
    },
    {
      name: 'XVIII - 月亮',
      meaning: '正位：直觉、梦境、幻想、潜意识\n逆位：混乱、恐惧、焦虑、欺骗',
      image: '🌙'
    },
    {
      name: 'XIX - 太阳',
      meaning: '正位：快乐、活力、成功、真理\n逆位：暂时的快乐、过度乐观、虚荣',
      image: '☀️'
    },
    {
      name: 'XX - 审判',
      meaning: '正位：觉醒、重生、改变、宽恕\n逆位：拒绝改变、自我怀疑、后悔',
      image: '📢'
    },
    {
      name: 'XXI - 世界',
      meaning: '正位：完成、圆满、成功、整合\n逆位：未完成、停滞、拖延',
      image: '🌍'
    },

    // 小阿尔卡纳牌 - 权杖组 (14张)
    {
      name: '权杖王牌',
      meaning: '正位：新机会、灵感、创造力的开始\n逆位：错失机会、创意受阻',
      image: '🌟'
    },
    // ... 继续添加权杖2-10和宫廷牌

    // 小阿尔卡纳牌 - 圣杯组 (14张)
    {
      name: '圣杯王牌',
      meaning: '正位：新的感情、直觉、创造力\n逆位：情感受阻、空虚',
      image: '🏆'
    },
    // ... 继续添加圣杯2-10和宫廷牌

    // 小阿尔卡纳牌 - 宝剑组 (14张)
    {
      name: '宝剑王牌',
      meaning: '正位：突破、清晰、真理\n逆位：混乱、困惑',
      image: '⚔️'
    },
    // ... 继续添加宝剑2-10和宫廷牌

    // 小阿尔卡纳牌 - 钱币组 (14张)
    {
      name: '钱币王牌',
      meaning: '正位：物质机会、繁荣、丰收\n逆位：错失机会、物质损失',
      image: '💰'
    }
    // ... 继续添加钱币2-10和宫廷牌
  ];

  // 答案之书数据
  const answers = [
    '是的，毫无疑问', '看起来很有希望', '命运对你有利',
    '现在还不是时候', '需要再等等看', '保持耐心',
    '不太可能', '最好不要', '我持怀疑态度',
    '专注当下最重要', '相信你的直觉', '顺其自然',
    '不要执着', '放手吧', '换个方向试试',
    '很快就会有结果', '保持乐观', '会柳暗花明',
    '需要更多努力', '时机未到', '继续坚持'
  ];

  // 检查是否已经生成过运势
  useEffect(() => {
    if (birthDate && birthTime) {
      const savedFortune = localStorage.getItem(`fortune_${birthDate}_${birthTime}`);
      if (savedFortune) {
        const fortune = JSON.parse(savedFortune);
        setLuckyColor(fortune.luckyColor);
        setTarotCard(fortune.tarotCard);
        setHasGenerated(true);
      } else {
        setLuckyColor('');
        setTarotCard(null);
        setHasGenerated(false);
      }
    }
  }, [birthDate, birthTime]);

  // 生成随机颜色的函数
  const generateLuckyColor = () => {
    const colors = [
      '红色', '橙色', '黄色', '绿色', '蓝色', '紫色', 
      '粉色', '白色', '金色', '银色', '青色', '棕色'
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  // 抽取塔罗牌
  const drawTarotCard = () => {
    const randomIndex = Math.floor(Math.random() * tarotCards.length);
    const isReversed = Math.random() < 0.5; // 50%概率逆位
    return {
      ...tarotCards[randomIndex],
      isReversed
    };
  };

  // 生成答案
  const generateAnswer = () => {
    if (!question.trim()) {
      alert('请输入您的问题！');
      return;
    }
    const randomIndex = Math.floor(Math.random() * answers.length);
    setAnswer(answers[randomIndex]);
  };

  // 修改处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    if (birthDate && birthTime && !hasGenerated) {
      const newLuckyColor = generateLuckyColor();
      const newTarotCard = drawTarotCard();
      
      // 保存运势到 localStorage
      const fortune = {
        luckyColor: newLuckyColor,
        tarotCard: newTarotCard
      };
      localStorage.setItem(`fortune_${birthDate}_${birthTime}`, JSON.stringify(fortune));
      
      setLuckyColor(newLuckyColor);
      setTarotCard(newTarotCard);
      setHasGenerated(true);
    }
  };

  // 处理日期输入验证
  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const year = date.getFullYear();
    
    if (year >= 1950 && year <= 2300) {
      setBirthDate(e.target.value);
    } else {
      alert('请输入1950-2300年之间的日期！');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="main-title">✨ 吸引力 ✨</h1>
        <p className="subtitle">遇见更好的自己</p>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="navigation-buttons">
          <Link to="/love" className="nav-button love-button">
            恋爱脑点这里 💕
          </Link>
          <Link to="/work" className="nav-button work-button">
            工作狂点这里 💼
          </Link>
        </div>
        <div className="birthday-form">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="date"
                value={birthDate}
                onChange={handleDateChange}
                className="date-input"
                min="1950-01-01"
                max="2300-12-31"
                required
              />
              <input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="time-input"
                required
              />
            </div>
            <button 
              type="submit" 
              className={`submit-button ${hasGenerated ? 'disabled' : ''}`}
              disabled={hasGenerated}
            >
              {hasGenerated ? '已生成运势' : '生成今日运势'}
            </button>
          </form>
          {luckyColor && (
            <div className="lucky-color">
              您的今日幸运色是：{luckyColor}
            </div>
          )}
          {tarotCard && (
            <div className="tarot-card">
              <div className="card-image">
                {tarotCard.image}
              </div>
              <div className="card-content">
                <h3>{tarotCard.name} {tarotCard.isReversed ? '(逆位)' : '(正位)'}</h3>
                <p>{tarotCard.isReversed ? 
                  tarotCard.meaning.split('\n')[1].substring(4) : 
                  tarotCard.meaning.split('\n')[0].substring(4)}
                </p>
              </div>
            </div>
          )}
          
          {/* 答案之书部分 */}
          <div className="answer-book">
            <h3>答案之书</h3>
            <div className="question-form">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="在此输入您的问题..."
                className="question-input"
              />
              <button 
                onClick={generateAnswer}
                className="answer-button"
              >
                寻求答案
              </button>
            </div>
            {answer && (
              <div className="answer-display">
                <p className="question-text">问：{question}</p>
                <p className="answer-text">答：{answer}</p>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/love" element={<LovePage />} />
        <Route path="/work" element={<WorkPage />} />
      </Routes>
    </Router>
  );
}

export default App;
