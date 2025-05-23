// App.js
import React, { useState } from 'react';
import TenderTable from './components/TenderTable.js';
import TenderDetails from './components/TenderDetails.js';

function App() {
  const [selectedTenderId, setSelectedTenderId] = useState(null);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">📑 Spanish Tender List</h1>
      <TenderTable onRowClick={setSelectedTenderId} />
      {selectedTenderId && <TenderDetails tenderId={selectedTenderId} />}
    </div>
  );
}

export default App;
