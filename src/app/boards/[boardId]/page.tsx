'use server'

import Board from "@/components/Board";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/userClient";

// Usando use server, puedo hacer async (puedo acceder a server session y al email) y puedo crear los tipo (clase) de objeto para darle forma a sus parametros. 
//  y leo como JSON las props:  <div> : {JSON.stringify(props)} </div>

// con esta clase, puedo acceder al parametro es decir, accedo a la ruta /boards/boardId
type PageProps = {
  params: {
    boardId: string;
  }
}

export default async function BoardPage(props: PageProps) {
  const boardId = props.params.boardId;
  const loggedEmail = await getUserEmail();
  // aca le mando el id del room, que es lo que me pide para identificar en la base de datos
  const boardInfo = await liveblocksClient.getRoom(boardId);
  // vemos si el email logeado tiene acceso al board de liveblocks
  const userAccess = boardInfo.usersAccesses?.[loggedEmail];
  const hasAccess = userAccess && [...userAccess].includes('room:write');

  if (!hasAccess) {
    return (
      <div>Access denied</div>
    );
  }
  return (
    <div>
      <Board
        name={boardInfo.metadata.boardName.toString()}
        id={boardId} />
    </div>
  );
}



// usando use client, no podemos hacerla asyncrona y tenemos que extraer los parametros con next.
// 'use client'
// import { useParams } from 'next/navigation'
// import React from 'react'

// export default function BoardPage() {
//     const params = useParams()
//     // params contiene todo lo de la ruta , puedo acceder a params.boardId
//   return (
//     <div>page</div>
//   )
// }
