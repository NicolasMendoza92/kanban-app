import { useParams, useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import { BoardContext, BoardContextProps } from "../boardComponents/BoardContext";
import { Card, useMutation, useStorage } from "@/app/liveblocks.config";
import { shallow } from "@liveblocks/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faEllipsis, faFileLines } from "@fortawesome/free-solid-svg-icons";
import CardDescription from "./CardDescription";
import CancelXBtn from "../buttons/CancelXBtn";
import DeleteCardBtn from "./DeleteCardBtn";
import CommentsBlock from "./CommentsBlock";

export default function CardModalBody() {

    const router = useRouter();
    const params = useParams();

    // Traemos la vble de contexto setOpenCard para actualizarla en esta pagina
    const { setOpenCard } = useContext<BoardContextProps>(BoardContext);
    const [editMode, setEditMode] = useState(false);

    // Traemos la info de la card seleccionada por medio del useStorage
    const cardInfo = useStorage(root => {
        return root.cards.find(c => c.id === params.cardId);
    }, shallow);

    // creamos la fn updateCard con useMutation de liveblock
    const updateCard = useMutation(({ storage }, cardId, updateData) => {
        // traemos las cards de storage y las convertimos en objetos
        const cards = storage.get('cards').map(c => c.toObject());
        const index = cards.findIndex(c => c.id === cardId);
        const card = storage.get('cards').get(index);
        for (let updateKey in updateData) {
            card?.set(updateKey as keyof Card, updateData[updateKey]);
        }
    }, []);

    // FN para borrar card usando useMutation
    const deleteCard = useMutation(({ storage }, id) => {
        const cards = storage.get('cards');
        const cardIndex = cards.findIndex(c => c.toObject().id === id);
        cards.delete(cardIndex);
    }, []);

    // El useEffect que setea mi vble de contexto de boardContext, VER POR QUE NO FUNCIONA.no me actualiza el estado 
    useEffect(() => {
        if (params.cardId && setOpenCard) {
            setOpenCard(params.cardId.toString());
        }
    }, [params]);

    // FN para borrar
    function handleDelete() {
        // invocamos a la funcion delete card y le pasamos el parametro de la cardId para borrar
        deleteCard(params.cardId);
        // seteamos el Setopencard en null, cerramos el pop up
        if (setOpenCard) {
            setOpenCard(null);
        }
        router.back();
    }

    // FN para editar el nombre 
    function handleNameChangeSubmit(ev: FormEvent) {
        ev.preventDefault();
        const input = (ev.target as HTMLFormElement).querySelector('input');
        if (input) {
            const newName = input.value;
            // invocamos a updateCard y pasamos parametros
            updateCard(params.cardId, { name: newName });
            setEditMode(false);
        }
    }

    return (
        <>
            {!editMode && (
                <div className="flex justify-between">
                    <h4 className="text-2xl">{cardInfo?.name}</h4>
                    <button className="text-gray-400"
                        onClick={() => setEditMode(true)}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </button>
                </div>
            )}
            {editMode && (
                <div>
                    <CancelXBtn onClick={() => setEditMode(false)} />
                    <form onSubmit={handleNameChangeSubmit}>
                        <input type="text" defaultValue={cardInfo?.name} className="mb-2" />
                        <button type="submit" className="w-full">Save</button>
                    </form>
                    <div className="mt-2">
                        <DeleteCardBtn onDelete={() => handleDelete()} />
                    </div>
                </div>
            )}
            {!editMode && (
                <div>
                    <h2 className="flex gap-2 items-center mt-4">
                        <FontAwesomeIcon icon={faFileLines} />
                        Description
                    </h2>
                    <CardDescription />
                    <h2 className="flex gap-2 items-center mt-4">
                        <FontAwesomeIcon icon={faComments} />
                    </h2>
                    <CommentsBlock />
                </div>
            )}
        </>
    );
}