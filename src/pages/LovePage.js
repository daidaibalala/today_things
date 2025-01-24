import React, { useState } from 'react';
import './LovePage.css';

function LovePage() {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  // 恋爱相关的答案库
  const loveAnswers = [
    '缘分即将到来，保持耐心',
    '是时候主动出击了',
    '当下不是最好的时机',
    '对方也在暗暗关注着你',
    '多一些自信，展现真实的自己',
    '不要着急，享受单身的时光',
    '近期会有意外的惊喜',
    '珍惜眼前人，不要东张西望',
    '先专注提升自己',
    '对方正在向你靠近',
    '给对方多一些关心',
    '保持神秘感很重要',
    '坦诚地表达你的感受'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) {
      alert('请输入您的问题！');
      return;
    }
    
    // 使用生日和问题生成一个固定的答案
    const combinedString = `${birthDate}_${birthTime}_${question}`;
    const index = Math.abs(hashCode(combinedString)) % loveAnswers.length;
    setAnswer(loveAnswers[index]);
  };

  // 简单的字符串哈希函数，确保同样的输入得到同样的结果
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
    <div className="love-page">
      <header className="love-header">
        <h1>💕 恋爱解答 💕</h1>
        <div className="love-form-container">
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
            <div className="input-group">
              <label>您的问题</label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="例如：我们有可能在一起吗？"
                required
                className="question-input"
              />
            </div>
            <button type="submit" className="submit-button">
              寻求解答
            </button>
          </form>
          {answer && (
            <div className="answer-container">
              <div className="answer-card">
                <p className="question-display">问：{question}</p>
                <p className="answer-display">答：{answer}</p>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default LovePage; 