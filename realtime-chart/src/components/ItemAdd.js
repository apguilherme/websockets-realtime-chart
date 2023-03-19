import React, { useState, useContext } from 'react'
import {SocketContext} from '../context/SocketContext';

export const ItemAdd = ({ addItem }) => {

    const [name, setName] = useState('');
    const { socket } = useContext(SocketContext);

    const addHandler = (e) => {
        e.preventDefault();
        if (name !== "") {
            socket.emit('add-item', name);
            setName('');
        }
    }
    return (
        <>
            <h3>Add item</h3>
            <form>
                <input
                    className='form-control col-1'
                    placeholder='New item'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button
                    className='btn btn-primary col-2'
                    onClick={(e) => addHandler(e)}
                >Send</button>
            </form>
        </>
    )
}
