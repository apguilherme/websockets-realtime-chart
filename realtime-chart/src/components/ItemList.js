import React, { useState, useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext';

export const ItemList = () => {

    const [items, setItems] = useState([]);
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        socket.on('current-items', (data) => {
            setItems(data.list.items);
        })
        return () => socket.off('current-items')
    }, [socket])

    const handleNameChange = (itemTarget, name) => {
        setItems(items => items.map(item => {
            if (item.id === itemTarget.id) item.name = name;
            return item;
        }));
    }

    const createRow = () => {
        return (
            items?.map(item => (
                <tr key={item.id}>
                    <td>
                        <input
                            className='form-control'
                            value={item.name}
                            onChange={(e) => handleNameChange(item, e.target.value)}
                            onBlur={() => socket.emit('update-name', item)}
                        />
                    </td>
                    <td>
                        <button
                            className='btn btn-primary'
                            onClick={() => socket.emit('increase-value', item.id)}
                        >+</button>
                        {item.value}
                        <button
                            className='btn btn-secondary'
                            onClick={() => socket.emit('decrease-value', item.id)}
                        >-</button>
                    </td>
                    <td>
                        <button
                            className='btn btn-danger'
                            onClick={() => socket.emit('remove-item', item.id)}
                        >Remove</button>
                    </td>
                </tr>
            ))
        )
    }

    return (
        <>
            <h3>Items list</h3>
            <table className='table table-stripped'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {createRow()}
                </tbody>
            </table>
        </>
    )
}
