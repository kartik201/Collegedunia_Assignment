import React, { useState, useEffect } from 'react';
import SearchBar from './components/searchbar';
import CollegeTable from './components/CollegeTable';
import './styles.css';

const App = () => {
  const [colleges, setColleges] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch('/colleges.json');
        const data = await response.json();
        setColleges(data);
      } catch (error) {
        console.error('Error loading colleges:', error);
      }
    };

    fetchColleges();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = (key) => {
    const direction = (sortConfig.key === key && sortConfig.direction === 'ascending') ? 'descending' : 'ascending';
    setSortConfig({ key, direction });
  };

  const filteredColleges = colleges.filter(college =>
    college.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
      <CollegeTable
        colleges={filteredColleges}
        onSort={handleSort}
        sortConfig={sortConfig}
      />
    </div>
  );
};

export default App;
