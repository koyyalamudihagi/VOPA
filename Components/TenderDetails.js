// components/TenderDetails.js
import React, { useEffect, useState } from 'react';

function TenderDetails({ tenderId }) {
  const [tender, setTender] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/tenders/${tenderId}`)
      .then(res => res.json())
      .then(data => setTender(data))
      .catch(err => console.error('Failed to fetch tender details:', err));
  }, [tenderId]);

  if (!tender) return <p>Loading tender details...</p>;

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">{tender.title}</h5>
        <p className="card-text"><strong>Buyer:</strong> {tender.buyer_name}</p>
        <p className="card-text"><strong>Description:</strong> {tender.description || 'N/A'}</p>
        <p className="card-text"><strong>Deadline:</strong> {tender.deadline_date}</p>
        <p className="card-text"><strong>CPV:</strong> {tender.cpv}</p>
      </div>
    </div>
  );
}

export default TenderDetails;
