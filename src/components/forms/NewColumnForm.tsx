'use client'
import { useMutation } from "@/app/liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import { FormEvent } from "react";
import uniqid from 'uniqid';

export default function NewColumnForm() {

    // Creamos la funcion callback, que indica liveblocks Mutation, es como un UseEffect
    const addColumn = useMutation(({ storage }, columnName) => {
        storage.get('columns').push(new LiveObject({
            name: columnName,
            id: uniqid.time(),
            index: 0,
        }))
    }, [])

    // tenemos que decir de que se trata el event en typescript
    function handleNewColumn(ev: FormEvent) {
        ev.preventDefault();
        const input = (ev.target as HTMLFormElement).querySelector('input');
        if (input) {
            const columnName = input?.value;
            addColumn(columnName);
            input.value = "";
        }

    }

    return (
        <form onSubmit={handleNewColumn} >
            <input type="text"className="newstate" placeholder=" +add state" />
        </form>
    )
}
