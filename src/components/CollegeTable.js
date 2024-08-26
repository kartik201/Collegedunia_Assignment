import React, { useState, useEffect } from 'react';

const CollegeTable = ({ colleges, onSort, sortConfig }) => {
    const [displayedColleges, setDisplayedColleges] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(10);
    const BATCH_SIZE = 10;

    useEffect(() => {
        setDisplayedColleges(colleges.slice(0, BATCH_SIZE));
        setCurrentIndex(BATCH_SIZE);
    }, [colleges]);

    useEffect(() => {
        const handleScroll = () => {
            if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 10) {
                loadMore();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [displayedColleges]);

    const loadMore = () => {
        if (currentIndex < colleges.length) {
            setDisplayedColleges(prev => [
                ...prev,
                ...colleges.slice(currentIndex, currentIndex + BATCH_SIZE)
            ]);
            setCurrentIndex(prev => prev + BATCH_SIZE);
        }
    };

    const sortedColleges = [...displayedColleges].sort((a, b) => {
        if (sortConfig.key) {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    return (
        <table>
            <thead>
                <tr>
                    <th onClick={() => onSort('name')}>
                        College Name {sortConfig.key === 'name' ? (sortConfig.direction === 'ascending' ? '(asc)' : '(desc)') : ''}
                    </th>
                    <th onClick={() => onSort('collegedunia')}>
                        Collegedunia Rating {sortConfig.key === 'collegedunia' ? (sortConfig.direction === 'ascending' ? '(asc)' : '(desc)') : ''}
                    </th>
                    <th onClick={() => onSort('fees')}>
                        Fees {sortConfig.key === 'fees' ? (sortConfig.direction === 'ascending' ? '(asc)' : '(desc)') : ''}
                    </th>
                    <th onClick={() => onSort('userReview')}>
                        User Review {sortConfig.key === 'userReview' ? (sortConfig.direction === 'ascending' ? '(asc)' : '(desc)') : ''}
                    </th>
                    <th>
                        Location
                    </th>
                    <th>
                        Avg Placement
                    </th>
                    <th>
                        Max Placement
                    </th>
                </tr>
            </thead>
            <tbody>
                {sortedColleges.map(college => (
                    <tr key={college.rank} className={college.featured ? 'featured' : ''}>
                        <td>{college.name}</td>
                        <td>{college.collegedunia.toFixed(1)}</td>
                        <td>₹{college.fees.toLocaleString()}</td>
                        <td>{college.userReview.toFixed(1)}</td>
                        <td>{college.location}</td>
                        <td>₹{college.placementAvg.toLocaleString()}</td>
                        <td>₹{college.placementMax.toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CollegeTable;
