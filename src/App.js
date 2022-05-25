import React, { memo } from 'react';
import MapContainer from './components/MapContainer';

const App = memo(() => {
  return (
    <div>
      <MapContainer />
    </div>
  );
});

export default App;