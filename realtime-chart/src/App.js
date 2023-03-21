import { ItemAdd } from './components/ItemAdd'
import { ItemList } from './components/ItemList'
import React, { useContext } from 'react'
import { SocketContext } from './context/SocketContext';
import { ChartRealTime } from './components/ChartRealTime';

function App() {

  const { isOnline } = useContext(SocketContext);

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {isOnline ? <span className="text-success"> Online</span> : <span className="text-danger"> Offline</span>}
        </p>
      </div>
      <h1>Realtime Chart</h1>
      <hr />
      <div className='row'>
        <div className='col'>
          <ChartRealTime />
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          <ItemList />
        </div>
        <div className="col-4">
          <ItemAdd />
        </div>
      </div>
    </div>
  );
}

export default App;
