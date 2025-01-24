import React, { useState } from 'react';
import './WorkPage.css';

function WorkPage() {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [fortune, setFortune] = useState(null);

  // 工作运势数据库
  const workFortunes = {
    productivity: [
      '今天的工作效率特别高，适合处理重要项目',
      '注意力较为分散，建议处理简单的任务',
      '创造力爆发，可以尝试新的工作方法',
      '适合团队协作，沟通顺畅',
      '今天特别适合独立完成任务',
      '建议合理安排工作时间，避免过度疲劳'
    ],
    luck: [
      '可能收到意外的好消息',
      '会遇到贵人相助',
      '适合保持低调，稳步推进',
      '建议多加小心，避免冒险',
      '今天适合谈判或签约',
      '可能有加薪或升职机会'
    ],
    focus: [
      '项目进展顺利',
      '可能遇到一些小障碍，但都能解决',
      '需要特别注意细节',
      '适合进行头脑风暴和创意工作',
      '重点关注团队协作',
      '建议关注长期项目的规划'
    ],
    advice: [
      '保持积极乐观的工作态度',
      '多与同事沟通交流',
      '注意工作与生活的平衡',
      '可以尝试新的工作方法',
      '建议提前做好计划',
      '适当放松，保持良好心态'
    ],
    luckyTime: [
      '上午9点到11点',
      '下午2点到4点',
      '上午10点到中午',
      '下午3点到5点',
      '早上8点到10点',
      '中午12点到下午2点'
    ]
  };

  // 根据生日计算五行属性
  const calculateElement = (date) => {
    const year = new Date(date).getFullYear();
    const elements = ['金', '木', '水', '火', '土'];
    return elements[year % 5];
  };

  // 根据生日计算幸运数字
  const calculateLuckyNumber = (date) => {
    const dateObj = new Date(date);
    return (dateObj.getDate() % 9) + 1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (birthDate && birthTime) {
      // 使用生日和时间生成固定的运势
      const combinedString = `${birthDate}_${birthTime}`;
      const hash = hashCode(combinedString);
      
      // 计算五行和幸运数字
      const element = calculateElement(birthDate);
      const luckyNumber = calculateLuckyNumber(birthDate);
      
      // 生成今日运势
      const productivity = workFortunes.productivity[Math.abs(hash) % workFortunes.productivity.length];
      const luck = workFortunes.luck[Math.abs(hash >> 8) % workFortunes.luck.length];
      const focus = workFortunes.focus[Math.abs(hash >> 16) % workFortunes.focus.length];
      const advice = workFortunes.advice[Math.abs(hash >> 12) % workFortunes.advice.length];
      const luckyTime = workFortunes.luckyTime[Math.abs(hash >> 4) % workFortunes.luckyTime.length];
      
      setFortune({
        productivity,
        luck,
        focus,
        advice,
        luckyTime,
        element,
        luckyNumber
      });
    }
  };

  // 哈希函数
  const hashCode = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash;
  };

  return (
    <div className="work-page">
      <header className="work-header">
        <h1>💼 工作运势 💼</h1>
        <div className="work-form-container">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>您的生辰</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
                className="date-input"
              />
              <input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                required
                className="time-input"
              />
            </div>
            <button type="submit" className="submit-button">
              查看今日工作运势
            </button>
          </form>
          
          {fortune && (
            <div className="fortune-container">
              <div className="fortune-card">
                <div className="fortune-header">
                  <p>五行属性：{fortune.element} | 幸运数字：{fortune.luckyNumber}</p>
                </div>
                <div className="fortune-section">
                  <h3>🎯 工作效率</h3>
                  <p>{fortune.productivity}</p>
                </div>
                <div className="fortune-section">
                  <h3>🍀 工作运气</h3>
                  <p>{fortune.luck}</p>
                </div>
                <div className="fortune-section">
                  <h3>💡 工作重点</h3>
                  <p>{fortune.focus}</p>
                </div>
                <div className="fortune-section">
                  <h3>📝 今日建议</h3>
                  <p>{fortune.advice}</p>
                </div>
                <div className="fortune-section">
                  <h3>⏰ 幸运时段</h3>
                  <p>{fortune.luckyTime}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default WorkPage; 