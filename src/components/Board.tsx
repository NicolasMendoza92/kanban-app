'use client';

import { RoomProvider } from '@/app/liveblocks.config';
import { LiveList } from '@liveblocks/client';
import { ClientSideSuspense } from '@liveblocks/react';
import Columns from './Columns';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCog, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FormEvent, useState } from 'react';
import { updateBoard } from '@/app/actions/boardActions';
import { useRouter } from 'next/navigation';
import CancelButton from './buttons/CancelButton';
import { BoardContextProvider } from './boardComponents/BoardContext';


// ANtes de usa liveblocks habia creado defults columns y cards para ver si funcionaba y tambien defini las clases TYPE

// const defaultColumns = [
//   { id: '123', name: 'TODO', index: 0 },
//   { id: '456', name: 'IN PROGRESS', index: 1 },
//   { id: '789', name: 'COMPLETE', index: 2 },
// ];

// const defaultCards = [
//   { id: 'abc', name: 'Task1', index: 0, columnId: '123' },
//   { id: 'def', name: 'Task2', index: 1, columnId: '456' },
//   { id: 'jkl', name: 'Task4', index: 1, columnId: '456' },
//   { id: 'ghi', name: 'Task3', index: 2, columnId: '789' },
//   { id: 'mno', name: 'Task5', index: 2, columnId: '789' },
// ];

// const [cards, setCards] = useState(defaultCards);
// const [columns, setColumns] = useState(defaultColumns);

{/* <Column
  key={column.id}
  {...column}
  cards={
    cards.sort((a, b) => a.index - b.index)
      .filter(c => c.columnId === column.id)
  }
  setCards={setCards}
/> */}

// export type CardType = {
//   id: string | number;
//   name: string;
//   index: number;
//   columnId: string;
// };

// manera de definir un type rapidamente {id}:{id:string}}
export default function Board({ id, name }: { id: string, name: string }) {

  const [editNameMode, setEditNameMode] = useState(false);
  const router = useRouter();

  async function handleNameSubmit(ev: FormEvent) {
    ev.preventDefault();
    // Atrapamos el input name con la manera de FormElement
    const input = (ev.target as HTMLFormElement).querySelector('input');
    if (input) {
      const newName = input.value;
      // llamamos a la opcion updateboard de boardAction 
      await updateBoard(id, { metadata: { boardName: newName } });
      setEditNameMode(false);
      router.refresh();
    }
  }

  return (
    <BoardContextProvider>
      {/* es un componente de liveblocks, que sirve para traer los datos de la db */}
      <RoomProvider
        id={id}
        initialPresence={{ }}
        initialStorage={{
          columns: new LiveList(),
          cards: new LiveList(),
        }}>
        <ClientSideSuspense fallback={(<div>loading...</div>)}>{() => (
          <>
            <Link
              href={`/`}
              className='flex justify-start w-fit gap-2 items-center mb-2'>
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to workspace
            </Link>
            <div className='flex gap-2 justify-between items-center mb-4'>
              <div>
                {!editNameMode && (
                  <h1 className='text-2xl'
                    onClick={() => setEditNameMode(true)}>
                    {name}
                  </h1>
                )}
                {editNameMode && (
                  <>
                    <div className='flex items-center justify-between gap-2'>
                      <form className='flex' onSubmit={handleNameSubmit} >
                        <input type='text' defaultValue={name} />
                        <button type="submit" className="ms-1 items-center rounded-md ">
                          <FontAwesomeIcon icon={faFloppyDisk} />
                        </button>
                      </form>
                      <CancelButton onClick={() => setEditNameMode(false)} />
                    </div>
                  </>

                )}
              </div>
              <Link
                href={`/boards/${id}/settings`}
                className='flex gap-2 items-center btn-settings'>
                <FontAwesomeIcon icon={faCog} />
                Board settings
              </Link>
            </div>
            <Columns />
          </>
        )}
        </ClientSideSuspense>
      </RoomProvider>
    </BoardContextProvider>
  )
}
