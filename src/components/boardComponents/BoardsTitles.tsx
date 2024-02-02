import { RoomInfo } from '@liveblocks/node'
import Link from 'next/link'
import React from 'react'

// recibo los parametros y los defino como ts me indica como un array "Binding element 'boards' implicitly has an 'any' type."
export default function BoardsTitles({ boards }: { boards: RoomInfo[] }) {
    return (
        <div>
            <div className='my-4 grid md:grid-cols-4 gap-2 text-center'>
                {boards?.length > 0 && boards.map(board => (
                    <Link href={`/boards/${board.id}`} key={board.id} className='block bg-gray-300 p-4 rounded-md '>
                        {board.metadata.boardName}
                    </Link>
                ))}
            </div>
        </div>
    )
}

