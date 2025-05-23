// components/TenderTable.js
import React, { useEffect, useState } from 'react';

function TenderTable({ onRowClick }) {
  const [tenders, setTenders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/tenders')
      .then(res => res.json())
      .then(data => setTenders(data.slice(0, 10))) // Limit to 10 for now
      .catch(err => console.error('Failed to fetch tenders:', err));
  }, []);

  if (tenders.length === 0) return <p>No tenders available.</p>;

  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>Title</th>
          <th>Buyer</th>
          <th>Publication Date</th>
          <th>Deadline</th>
          <th>CPV Code</th>
        </tr>
      </thead>
      <tbody>
        {tenders.map(tender => (
          <tr key={tender.id} onClick={() => onRowClick(tender.id)} style={{ cursor: 'pointer' }}>
            <td>{tender.title}</td>
            <td>{tender.buyer_name}</td>
            <td>{tender.publication_date}</td>
            <td>{tender.deadline_date}</td>
            <td>{tender.cpv}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TenderTable;
