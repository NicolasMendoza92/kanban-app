'use client'
import Link from "next/link";
import { useParams } from "next/navigation";


export default function CardDetail({ id, name }: { id: string, name: string }) {

    // llamamos a la vble  de contexto openCard, la cual es seteada con un usestate si esta , quire decir que esta abierto.
    // const { openCard } = useContext(BoardContext);
    // const router = useRouter()
    // Chequeamos si en la ruta, hay algun parametro que nos sirva- .en este caso el boardId nos sirve y tamb cardId.
    const params = useParams();

    // Cuando cambie el params.cardId esto deberia ejecutarse, pero a veces anda y a veces no
    
    // useEffect(() => {
    //     if (params.cardId && !openCard) {
    //         const { boardId, cardId } = params;
    //         router.push(`/boards/${boardId}`);
    //         router.push(`/boards/${boardId}/cards/${cardId}`);
    //     }
    //     if (!params.cardId && openCard) {
    //         router.push(`/boards/${params.boardId}`);
    //     }
    // }, [params.cardId])


    return (
        <Link
            href={`/boards/${params.boardId}/cards/${id}`}
            className="border block bg-white my-2 p-4 rounded-md">
            <span>{name}</span>
        </Link>
    )
}
