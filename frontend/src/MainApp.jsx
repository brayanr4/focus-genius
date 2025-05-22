import React, { useState } from 'react';
import axios from 'axios';

function MainApp() {
  const [topics, setTopics] = useState("");
  const [dailyHours, setDailyHours] = useState(3);
  const [duration, setDuration] = useState(7);
  const [schedule, setSchedule] = useState("");

  const createSchedule = async () => {
    const response = await axios.post('http://localhost:5500/api/create-schedule', {
      topics: topics.split(',').map(topic => topic.trim()),
      dailyHours,
      duration
    });
    setSchedule(response.data.schedule);
  };

  return (
    <div className="MainApp">
      <h2>FocusGenius AI Scheduler</h2>
      <input placeholder="Enter topics (comma-separated)" onChange={e => setTopics(e.target.value)} />
      <input type="number" value={dailyHours} onChange={e => setDailyHours(+e.target.value)} placeholder="Hours per day" />
      <input type="number" value={duration} onChange={e => setDuration(+e.target.value)} placeholder="Total days" />
      <button onClick={createSchedule}>Create My Plan</button>
      <pre>{schedule}</pre>
    </div>
  );
}

export default MainApp;