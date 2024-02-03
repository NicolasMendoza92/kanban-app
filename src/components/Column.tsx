/* eslint-disable react/jsx-key */
import { ReactSortable } from "react-sortablejs";
import { Card, useMutation, useStorage } from "@/app/liveblocks.config";
import { shallow } from "@liveblocks/client";
import NewCardForm from "./forms/NewCardForm";
import { FormEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import CancelXBtn from "./buttons/CancelXBtn";
import CardDetail from "./CardDetail";

// en typecsript tengo que especificar que tipo de dato se usa. Es para operaciones grandes.
type ColumnsProps = {
    id: string;
    index: number;
    name: string;
}


// type ColumnsProps = {
//     id: string;
//     index: number;
//     name: string;
//     es una funcion de un useState, entonces tenemos que definirla como tal usando ts
//     cards: CardType[];  
//     setCards: SetStateAction<any>;
// }

//  Antes habiamos definido, sin base de datos un estado para hacer sorting cards
// setCards((prevCards: CardType[]) => {
//     const newCards = [...prevCards];
//     sortedCards.forEach((sortedCard: CardType, newIndex: number) => {
//         const foundCard = newCards.find(newCard => newCard.id === sortedCard.id);
//         if (foundCard) {
//             foundCard.index = newIndex;
//             foundCard.columnId = newColumnId;
//         }
//     });
//     return newCards;
// })

export default function Column({ id, name }: ColumnsProps) {

    const [editNameMode, setEditNameMode] = useState(false)

    // primero traemos del useStorage del liveblock las cards que hay creadas y luego , filtramos las que pertenecen a una especifica columna por su ID
    const columnCards = useStorage<Card[]>(root => {
        return root
            .cards.filter(card => card.columnId === id)
            .map(c => ({ ...c }))
            .sort((a, b) => a.index - b.index);
    }, shallow);

    // para que funcione el reactsortable, tenemos que haceer que se cambie el columnId y el index de cada card. 
    const updateCard = useMutation(({ storage }, index, updateData) => {
        // busco en storgaey tragio las cards, y luego las del especifico index
        const card = storage.get('cards').get(index);
        if (card) {
            for (let key in updateData) {
                card?.set(key as keyof Card, updateData[key])
            }
        }

    }, []);

    // recibe el id de la columna y el nuevo nombre que neceisto. Lo hago con Mutation asi como hice con las task de cada column  
    const updateColumn = useMutation(({ storage }, id, newName) => {
        const columns = storage.get('columns');
        columns.find(c => c.toObject().id === id)?.set('name', newName);
    }, []);


    const deleteColumn = useMutation(({ storage }, id) => {
        const columns = storage.get('columns');
        // accedemos a la columna y elimiamos la que tenga el mismo id
        const columnIndex = columns.findIndex(c => c.toObject().id === id);
        columns.delete(columnIndex);
    }, [])

    //  por todas las cards que tengamos en cada columna, tenemos que actualizar el columnId
    const setTasksOrderForColumn = useMutation(({ storage }, sortedCards: Card[], newColumnId) => {
        // console.log({sortedCards, newColumnId}) - vi que se actualizaba el newColumnId pero no lo reemplazaba por la propiedad del columnId en el objeto tipo Card.
        // extraigo los id de las cards en la columna time 3:35
        const idsOfSortedCards = sortedCards.map((c: Card) => c.id.toString());
        // por cada id , debo reemplazar en el columnId y el index si es que cambio de posicion en la misma columna =>
        // debo pasarle las nuevsa vblees a la funcion upadateCard que las espera como paramatetros
        const allCards: Card[] = [...storage.get('cards').map(c => c.toObject())];
        // hacemos el loop , por cada id y traemos el id que sea igual y la posicion de el en el array
        idsOfSortedCards.forEach((sortedCardId, colIndex) => {
            const cardStorageIndex = allCards.findIndex(c => c.id.toString() === sortedCardId);
            updateCard(cardStorageIndex, {
                columnId: newColumnId,
                index: colIndex,
            })
        })
    }, [])


    // FUNCION PARA REENOMBRAR TITULOS DE LAS COLUMNAS
    function handleRenameSubmit(ev: FormEvent) {
        ev.preventDefault();
        const input = (ev.target as HTMLFormElement).querySelector('input');
        if (input) {
            const newColumnName = input.value;
            // llamo a la funcion update column y le paso los parametros que marque 
            updateColumn(id, newColumnName);
            setEditNameMode(false);
        }
    }

    return (
        <div className=' h-auto bg-white shadow-md rounded-md p-2 min-w-fit'>
            {!editNameMode && (
                <div className="flex justify-between">
                    <h3>{name}</h3>
                    <button className="text-gray-300" onClick={() => setEditNameMode(true)}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </button>
                </div>
            )}
            {editNameMode && (
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        Edit name:
                        <CancelXBtn onClick={() => setEditNameMode(false)} />
                    </div>
                    <form onSubmit={handleRenameSubmit} className="mb-2">
                        <input type="text" defaultValue={name} />
                        <button type="submit" className="w-full mt-2 rounded-md">
                            Save
                        </button>
                    </form>
                    <button
                        onClick={() => deleteColumn(id)}
                        className="bg-gray-100 text-gray-500 p-2 flex gap-2 w-full items-center rounded-md justify-center border border-t-red-500">
                        <FontAwesomeIcon icon={faTrash} />
                        Delete
                    </button>

                </div>
            )}
             {!editNameMode && (
                <NewCardForm columnId={id} />
            )}
            {/* ponemos esta condicion para solucionar el problema de ts "Type 'CardType[] | null' is not assignable to type 'CardType[]'" */}
            {!editNameMode && columnCards && (
                <ReactSortable
                    className="min-h-12"
                    // esto es una propiedad del objeto de tipo ReactSortable, que es como la sombra que aparece en el futuro
                    ghostClass="opacity-40"
                    list={columnCards}
                    setList={items => setTasksOrderForColumn(items, id)}
                    group="cards">
                        {/* invoco a card detail */}
                    {columnCards.map(card => (
                        <CardDetail key={card.id} id={card.id} name={card.name}/>
                    ))}
                </ReactSortable>
            )}
           
        </div>
    )
}
