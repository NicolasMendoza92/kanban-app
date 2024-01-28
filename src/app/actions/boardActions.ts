'use server';

// VOY COLOCANDO LAS ACCIONES QUE DESEO HACER 

import { authOptions } from "@/lib/authOptions";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { Liveblocks, RoomInfo } from "@liveblocks/node";
import { getServerSession } from "next-auth";
import uniqid from 'uniqid';


export async function createBoard(name: string): Promise<false | RoomInfo> {

    const liveblocksClient = new Liveblocks({
        secret: process.env.LIVEBLOCKS_SECRET_KEY || '',
    });
    const session = await getServerSession(authOptions);
    const email = session?.user?.email || '';
    if (email) {
        const roomId = uniqid.time();
        return await liveblocksClient.createRoom(roomId, {
            defaultAccesses: [],
            usersAccesses: {
                [email]: ['room:write'],
            },
            metadata: {
                boardName: name,
            }
        });
    }

    return false
}

//  esta funcion recibe dos parametros para actualizar, board id y el nuevo mail
export async function addEmailToBoard(boardId: string, email: string) {
    // acceso al room mediante el id
    const room = await liveblocksClient.getRoom(boardId);
    // guardamos los usaurios permitidos que tienen el room en la vble 
    const usersAccesses = room.usersAccesses;
    // buscamos los email y vemos cual tiene la propiedad de escribir
    usersAccesses[email] = ['room:write'];
    await liveblocksClient.updateRoom(boardId, { usersAccesses });
    return true;
}

export async function updateBoard(boardId: string, updateData: any) {
    const result = await liveblocksClient.updateRoom(boardId, updateData);
    console.log({ result });
    return true;
}



export async function removeEmailFromBoard(boardId: string, email: string) {
    const room = await liveblocksClient.getRoom(boardId);
    // decimos que traiga cualquier tipo de objeto
    const usersAccesses: any = room.usersAccesses;
    // hacemos que se convierta el email en null, en vez de usar delete
    usersAccesses[email] = null;
    await liveblocksClient.updateRoom(boardId, { usersAccesses });
    return true;
}


export async function deleteBoard(boardId: string) {
    await liveblocksClient.deleteRoom(boardId);
    return true;
}