import { ItemAdd } from './components/ItemAdd'
import { ItemList } from './components/ItemList'
import React, { useState, useEffect } from 'react'
import io from 'socket.io-client';

const connSocketServer = () => {
  const socket = io.connect('http://localhost:8080', {
    transports: ['websocket']
  });
  return socket;
}

function App() {
  const [isOnline, setIsOnline] = useState(false);
  const [socket, setSocket] = useState(connSocketServer());
  const [currentItems, setCurrentItems] = useState([]);

  const plusValue = (id) => {
    socket.emit('increase-value', id);
  }
  const minusValue = (id) => {
    socket.emit('decrease-value', id);
  }
  const addItem = (name) => {
    socket.emit('add-item', name);
  }
  const updateName = (item) => {
    socket.emit('update-name', item);
  }
  const removeItem = (id) => {
    socket.emit('remove-item', id);
  }

  useEffect(() => {
    socket.on('connect', () => {
      setIsOnline(true);
    })
    socket.on('disconnect', () => {
      setIsOnline(false);
    })
    socket.on('current-items', (data) => {
      setCurrentItems(data.list.items);
    })
  }, [socket])

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

      <div className="row">
        <div className="col-8">
          <ItemList 
            currentItems={currentItems} 
            plusValue={plusValue} 
            minusValue={minusValue} 
            updateName={updateName} 
            removeItem={removeItem}
          />
        </div>
        <div className="col-4">
          <ItemAdd addItem={addItem} />
        </div>
      </div>

    </div>
  );
}

export default App;
