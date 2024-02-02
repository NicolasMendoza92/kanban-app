import LiveblocksProvider from '@liveblocks/yjs';
import { useSelf } from '@/app/liveblocks.config';
import { Doc } from 'yjs';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Collaboration } from "@tiptap/extension-collaboration";
import { CollaborationCursor } from "@tiptap/extension-collaboration-cursor";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Underline } from "@tiptap/extension-underline";
import { ToolbarCard } from './ToolbarCard';
import { Avatars } from './Avatars';



type EditorProps = {
    doc: Doc,
    provider: LiveblocksProvider<any, any, any, any>,
    cardId: string,
}

// hacemos el componente como indica la libreria  https://liveblocks.io/docs/get-started/yjs-tiptap-react
export default function CollaborativeEditor({ doc, provider, cardId }: EditorProps) {

    // Traemos de liveblock la info del usuario que esta en el momento
    const userInfo = useSelf(me => me.info);

    // instalamos el framework Tiptap - https://tiptap.dev/docs/editor/introduction  con este podemos usar todas las propiedades, 
    const editor = useEditor({
        // definimos las extensiones en un array, que sacamos de la libreria de liveblocks 
        extensions: [
            StarterKit.configure({
                history: false,
            }),
            Placeholder.configure({
                emptyEditorClass: 'is-editor-empty',
                placeholder: 'Task description...',
            }),
            Collaboration.configure({
                document: doc,
                field: cardId,
            }),
            CollaborationCursor.configure({
                provider,
                user: userInfo || undefined,
            }),
            Underline.configure(),
        ]
    });

    return (
        <div >
            <div className='flex justify-between items-center'>
                <ToolbarCard editor={editor} />
                <Avatars />
            </div>

            <EditorContent editor={editor} className='editorContainer' />
        </div>
    )
}