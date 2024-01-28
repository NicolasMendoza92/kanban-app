import { Liveblocks } from "@liveblocks/node";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
    // extraigo la informacion del JSON, para eso debo poner req:NextRequest
    const { id, update } = await req.json();
    // esto me trae los parametros si es que yo uso un fetch. 
    const liveblocks = new Liveblocks({ secret: process.env.LIVEBLOCKS_SECRET_KEY as string });
    // Consoleo para ver si me sale lo que puse en fetch, y efectivamente me trae el nuevo objeto. 
    console.log({ id, update });
    await liveblocks.updateRoom(id, update);
    return Response.json(true);
}

// OBJETO DEL CONSOLE LOG. Haceindo click en nicomendoza.92@gmail.com
// {
//     id: 'lruvvtn0',
//     update: {
//       'nicomendoza.92@gmail.com': [ 'room:read', 'room:presence:write' ],
//       'test@gmail.com': [ 'room:write' ]
//     }
//   }