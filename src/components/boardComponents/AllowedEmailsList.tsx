'use client';
import {  removeEmailFromBoard, updateBoard} from "@/app/actions/boardActions";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RoomAccesses } from "@liveblocks/node";
import { useRouter } from "next/navigation";

export default function AllowedEmailsList({
    boardId, usersAccesses,
}: {
    boardId: string,
    usersAccesses: RoomAccesses,
}) {

    const router = useRouter();

    async function handleDelete(emailToDelete: string) {
        await removeEmailFromBoard(boardId, emailToDelete);
        router.refresh();
    }

    // funcion para cambiar permisos
    async function changePermissions(emailToChange: string){
        // traigo los usuarios que tiene el room como un objeto 
        const newUserAccesses = {...usersAccesses}
        //cambio los permisos del usuario que seleccione
        newUserAccesses[emailToChange] = ['room:read', 'room:presence:write']
        // Los mando a la BD liveblockls cambiando el parametro userAccesses.
        await updateBoard(boardId, {usersAccesses: newUserAccesses})
        router.refresh()
    }

    // funcion para relizar un llamado
    async function fetchUpdateData(emailToUpdate: string){
        // traigo los usuarios que tiene el room como un objeto 
        const newUserAccesses = {...usersAccesses}

        // Hago mi accion, por ejemplo delete o cambiar permisos. 
        //cambio los permisos del usuario que seleccione
        newUserAccesses[emailToUpdate] = ['room:read', 'room:presence:write']
        // enviamos en el body los dos parametros que pusimos que recibiria la ruta PUT en la Api
        fetch('/api/boards', {
            method: 'PUT', 
            body: JSON.stringify({
                id: boardId,
                update: newUserAccesses
            }),
            headers:{'Content-Type':'application/json'},
        })
    }




    return (
        <div className="max-w-xs">
            {Object.keys(usersAccesses).map(email => (
                <div
                    key={email}
                    className="flex gap-2 my-4 items-center max-w-xs justify-between border rounded-lg pl-4">
                    {email}
                    <button className="btn-settings p-1" onClick={() => handleDelete(email)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                    {/* <button className="btn-settings p-1" onClick={() => changePermissions(email)}>
                        see
                    </button> */}
                </div>
            ))}
        </div>
    );
}