// Result.tsx

import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const Result = () => {
  const [rollNumber, setRollNumber] = useState<string>('');
  const [course, setCourse] = useState<string>('');
  const [searching, setSearching] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      setSearching(true);

      // Perform an API request or any search logic here
      // For this example, we're just simulating a delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulated search result
      setSearchResult(`Result for Roll Number ${rollNumber}, Course: ${course}`);
    } catch (error) {
      console.error('Error occurred during search:', error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className='p-5'>
      <h2>Search Results</h2>
      <div>
        <label>
          Roll Number:
          <input className='mb-3'
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
          className='mb-3'
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
        <Button onClick={handleSearch} disabled={searching}>
          {searching ? 'Searching...' : 'Search'}
        </Button>
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
