import { useMemo, useState, useEffect } from 'react';
import io from 'socket.io-client';

export const useSocket = (serverPath) => {
    const socket = useMemo(() => io(serverPath, {
        transports: ['websocket'],
        autoConnect: true,
    }), [serverPath]);
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        socket.on('connect', () => {
            setIsOnline(true);
        })
        socket.on('disconnect', () => {
            setIsOnline(false);
        })
        return () => socket.close();
    }, [socket])

    return {socket, isOnline};
}