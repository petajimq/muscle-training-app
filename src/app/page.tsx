'use client';

import { useState } from "react";

const generateWorkoutPage = () => {
  const [part, setPart] = useState('胸');

  const partChange = (e: any) => {
    return setPart(e.target.value);
  }

  return (
    <div>
      <h1>筋トレメニュー作成</h1>

      <div>
        <label>部位</label>
        <select value={part} onChange={partChange}>
          <option value="胸">胸</option>
          <option value="背中">背中</option>
          <option value="脚">脚</option>
          <option value="肩">肩</option>
          <option value="腕">腕</option>
          <option value="腹筋">腹筋</option>
          <option value="全身">全身</option>
        </select>
      </div>
    </div>
  )
}

export default generateWorkoutPage;