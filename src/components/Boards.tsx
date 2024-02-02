'use server';
import { liveblocksClient } from '@/lib/liveblocksClient'
import { getUserEmail } from '@/lib/userClient'
import BoardsTitles from './boardComponents/BoardsTitles';

export default async function Boards() {
    // traemos el email logeado
    const email = await getUserEmail();
    // traemos los rooms que estan relaciondos al userId: email
    const roomsData = await liveblocksClient.getRooms({ userId: email });
    // me da un array de datos
    const rooms = roomsData.data;

    // ESTO ES LO QUE TIENEN CADA ROOM QUE EXTRAIGO DE LA BASE DE DATOS DE LIVEBLOCKS CON getRooms , es un array con los rooms adenetro.
    // [
    //   {
    //     type: 'room',
    //     id: 'lrqmvtu8',
    //     lastConnectionAt: 2024-01-23T17:32:06.443Z,
    //     createdAt: 2024-01-23T17:32:06.443Z,
    //     metadata: { boardName: 'test1' },
    //     defaultAccesses: [],
    //     groupsAccesses: {},
    //     usersAccesses: { 'nicomendoza.92@gmail.com': [Array] }
    //   },
    // {
    //     type: 'room',
    //     id: 'lruvvtn0',
    //     lastConnectionAt: 2024-01 - 26T16: 55: 10.629Z,
    //     createdAt: 2024-01 - 26T16: 55:07.554Z,
    //     metadata: { boardName: 'TEST2' },
    //     defaultAccesses: [],
    //     groupsAccesses: { },
    //     usersAccesses: { 'nicomendoza.92@gmail.com': [Array] }
    // }
    // ]

    return (
        // Le paso el array de rooms y la renombro como boards
        <BoardsTitles boards={rooms}/>
    )
}
