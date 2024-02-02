'use server'

import AllowedEmailsList from "@/components/AllowedEmailsList";
import BoardDeleteButton from "@/components/boardComponents/BoardDeleteButton";
import NewUserAccessForm from "@/components/forms/NewUserAccessForm";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/userClient";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type PageProps = {
    params: {
        boardId: string;
    }
}

export default async function BoardSettings({ params }: PageProps) {

    // traemos la informacion de este room. 
    const { boardId } = params;
    const userEmail = await getUserEmail();
    const loggedEmail = await getUserEmail();
    // traemos los rooms que estan relaciondos al userId: email
    const roomsData = await liveblocksClient.getRooms({ userId: loggedEmail });
    // aca le mando el id del room, que es lo que me pide para identificar en la base de datos
    // Hago una villereada para ver si funciona (accedo con un filter al array y traigo el room que coincida con el room del params. )
    const boardInfo = roomsData.data.filter(room => room.id === boardId)[0]
    if (!boardInfo.usersAccesses[userEmail]) {
        return 'Access denied'
    }

    return (
        <div>
            <div className="flex justify-between items-center">
            <Link href={`/boards/${boardId}`} className="inline-flex gap-1 items-center ">
                <FontAwesomeIcon icon={faArrowLeft} />
                Go back to board
            </Link>
            <BoardDeleteButton boardId={boardId}/>
            </div>
            
            <h1 className="text-2xl">Access to board: {boardInfo.metadata.boardName} </h1>
            <div className="mb-8">
                <AllowedEmailsList
                    boardId={boardId}
                    usersAccesses={boardInfo.usersAccesses} />
            </div>
            <NewUserAccessForm boardId={boardId} />
        </div>
    )
}
