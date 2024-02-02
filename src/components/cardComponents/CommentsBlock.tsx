import { useParams } from 'next/navigation';
import { Composer, Thread } from "@liveblocks/react-comments";
import { useThreads } from '@/app/liveblocks.config';
import "@liveblocks/react-comments/styles.css";

export default function CommentsBlock() {

    const params = useParams();
    // Traigo los threads como dice en la documentación:" https://liveblocks.io/docs/api-reference/liveblocks-react-comments " 
    const { threads } = useThreads({
        query: {
            metadata: {
                cardId: params.cardId.toString(),
            }
        }
    });

    return (
        <div className="-mx-4 z-30">
            {threads && threads.map(thread => (
                <div key={thread.id}>
                    <Thread thread={thread} id={thread.id} />
                </div>
            ))}
            {threads?.length === 0 && (
                <div >
                    <Composer metadata={{ cardId: params.cardId.toString() }} />
                </div>
            )}
        </div>
    )
}
