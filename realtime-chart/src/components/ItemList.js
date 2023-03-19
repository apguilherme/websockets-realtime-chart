import React, { useState, useEffect } from 'react'

export const ItemList = ({ currentItems, plusValue, minusValue, updateName, removeItem }) => {

    const [items, setItems] = useState(currentItems);

    useEffect(() => {
        setItems(currentItems);
    }, [currentItems])

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
                            onBlur={() => updateName(item)}
                        />
                    </td>
                    <td>
                        <button
                            className='btn btn-primary'
                            onClick={(e) => plusValue(item.id)}
                        >+</button>
                        {item.value}
                        <button
                            className='btn btn-secondary'
                            onClick={(e) => minusValue(item.id)}
                        >-</button>
                    </td>
                    <td>
                        <button
                            className='btn btn-danger'
                            onClick={(e) => removeItem(item.id)}
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
