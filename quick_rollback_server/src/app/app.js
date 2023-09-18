import React, { useState, useEffect } from 'react';

function App(props) {
  const [selectedOption, setSelectedOption] = useState('')
  const [historyList, setHistoryList] = useState({ list: [] });
  const host = "http://localhost:3001"

  useEffect(() => {
    const getHistory = async () => {
      const result = await fetch(
        `${host}/history`,
      );
      const res = await result.json()
      setHistoryList(res);
    };

    getHistory()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedOption) {
      const res = await fetch(`${host}/rollback?id=${selectedOption}`)
      if (res.status === 200) {
        console.log("Rollback Successfully")
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="" disabled>Please Select The Rollback Version</option>
        {historyList["list"].map((item, index) => (
          <option key={index} value={item.id}>
            {item.id}
          </option>
        ))}
      </select>
      <button type="submit">Start Rollback</button>
    </form>
  )
}

export default App;
