'use server';
import { liveblocksClient } from '@/lib/liveblocksClient'
import { getUserEmail } from '@/lib/userClient'
import Link from 'next/link';

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
        <div className='my-4 grid md:grid-cols-4 gap-2 text-center'>
            {rooms?.length > 0 && rooms.map(room => (
                <Link href={`/boards/${room.id}`} key={room.id} className='block bg-gray-300 p-4 rounded-md '>
                    {room.metadata.boardName}
                </Link>
            ))}
        </div>
    )
}
