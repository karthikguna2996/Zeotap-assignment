import React, { useState } from 'react';
import './App.css';

function App() {
  const [rule, setRule] = useState('');
  const [combinedRule, setCombinedRule] = useState('');
  const [data, setData] = useState({ age: '', department: '', salary: '', experience: '' });
  const [result, setResult] = useState(null);

  const handleRuleChange = (e) => {
    setRule(e.target.value);
  };

  const handleDataChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const submitRule = async () => {
    try {
      const response = await fetch('http://localhost:5000/create_rule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rule_string: rule })
      });
      const result = await response.json();
      alert('Rule created successfully!');
    } catch (error) {
      console.error('Error creating rule:', error);
    }
  };

  const evaluateRule = async () => {
    try {
      const response = await fetch('http://localhost:5000/evaluate_rule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data })
      });
      const result = await response.json();
      setResult(result);
    } catch (error) {
      console.error('Error evaluating rule:', error);
    }
  };

  return (
    <div className="App">
      <h1>Rule Engine with AST</h1>

      <div>
        <h3>Create Rule</h3>
        <input 
          type="text" 
          placeholder="Enter rule" 
          value={rule} 
          onChange={handleRuleChange} 
        />
        <button onClick={submitRule}>Submit Rule</button>
      </div>

      <div>
        <h3>Evaluate Rule</h3>
        <label>Age:</label>
        <input type="number" name="age" value={data.age} onChange={handleDataChange} />

        <label>Department:</label>
        <input type="text" name="department" value={data.department} onChange={handleDataChange} />

        <label>Salary:</label>
        <input type="number" name="salary" value={data.salary} onChange={handleDataChange} />

        <label>Experience:</label>
        <input type="number" name="experience" value={data.experience} onChange={handleDataChange} />

        <button onClick={evaluateRule}>Evaluate</button>
      </div>

      {result !== null && (
        <div>
          <h3>Evaluation Result</h3>
          <p>{result ? "User is eligible" : "User is not eligible"}</p>
        </div>
      )}
    </div>
  );
}

export default App;
