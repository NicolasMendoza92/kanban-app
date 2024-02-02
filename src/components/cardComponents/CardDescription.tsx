import { useRoom } from '@/app/liveblocks.config';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import * as Y from "yjs";
import LiveblocksProvider from "@liveblocks/yjs";
import CollaborativeEditor from './CollaborativeEditor';

export default function CardDescription() {

  const { cardId } = useParams();
  const room = useRoom();

  //  Creamos los estados como indica la libreria 
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();

  // para hacer editor en linea uso "yjs" https://docs.yjs.dev/  un framework que permite editar en linea documentos. Es un realtime y permite ver quien esta conectado en el momento. 
  // similar a como pasa en google sheets. Indica la presencia de los usuarios. Yjs es una libreria que tiene compatibilidad con liveblock. 
  // https://liveblocks.io/docs/get-started/yjs-tiptap-react
  // Set up Liveblocks Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksProvider(room, yDoc);

    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };

  }, [room]);

  //  si no hay algun documento o algun provider entonces 
  if (!doc || !provider) {
    return null;
  }


  return (
    <div className=''>
      {/* como este componente esta dentro de RoomProvider y dentro de ClientSideSuspense puedo invocarlo */}
      <CollaborativeEditor
        doc={doc}
        provider={provider}
        cardId={cardId.toString()}
      />
    </div>
  )
}
