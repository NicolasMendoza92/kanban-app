'use client'
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";


export default function CardDetail({ id, name }: { id: string, name: string }) {

    const params = useParams();
    const boardId = params.boardId
    //  vamos a ver si podemos abrir 

    useEffect(() => {
        if(boardId){

        }
    }, [boardId])
    

    return (
        <Link
            href={`/boards/${boardId}/cards/${id}`}
            className="border block bg-white my-2 p-4 rounded-md">
            <span>{name}</span>
        </Link>
    )
}
