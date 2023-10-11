// Result.tsx

import React, { useState } from 'react';

const Result: React.FC = () => {
  const [rollNumber, setRollNumber] = useState<string>('');
  const [course, setCourse] = useState<string>('');
  const [searching, setSearching] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleSearch = () => {
    setSearching(true);

    // Simulated search result (you can replace this with your search logic)
    const result = `Result for Roll Number ${rollNumber}, Course: ${course}`;

    // Simulate an API request or any search logic here
    setTimeout(() => {
      setSearchResult(result);
      setSearching(false);
    }, 2000);
  };

  return (
    <div>
      <h2>Search Results</h2>
      <div>
        <label>
          Roll Number:
          <input
            type="text"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Course:
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value="">Select Course</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
          </select>
        </label>
      </div>
      <div>
        <button onClick={handleSearch} disabled={searching}>
          {searching ? 'Searching...' : 'Search'}
        </button>
      </div>
      {searchResult && (
        <div>
          <h3>Search Result:</h3>
          <p>{searchResult}</p>
        </div>
      )}
    </div>
  );
};

export default Result;
