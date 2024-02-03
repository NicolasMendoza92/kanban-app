import { Card, useMutation } from "@/app/liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import { FormEvent } from "react";
import uniqid from 'uniqid';

//  error si pasamos el componente solamente {}, aparece:Binding element 'columnId' implicitly has an 'any' type  
export default function NewCardForm({ columnId }: { columnId: string }) {

    // Creamos la funcion callback, que indica liveblocks Mutation, es como un UseEffect
    const addCard = useMutation(({ storage }, cardName) => {
        storage.get('cards').push(new LiveObject<Card>({
            name: cardName,
            id: uniqid.time(),
            index: 0,
            columnId: columnId,
        }))
    }, [])

    function handleNewCardFormSubmit(ev: FormEvent) {
        ev.preventDefault();
        const input = (ev.target as HTMLFormElement).querySelector('input');
        if (input) {
            const cardName = input?.value;
            addCard(cardName);
            input.value = "";
        }
    }


    return (
        <form onSubmit={handleNewCardFormSubmit}>
            <input type="text" className="addTask" placeholder="Add a task"  />
        </form>
    )
}
