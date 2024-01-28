'use client';
import { deleteBoard } from "@/app/actions/boardActions";
import {useRouter} from "next/navigation";

export default function BoardDeleteButton({boardId}:{boardId:string}) {
  const router = useRouter();
  async function handleDeleteBoard() {
    await deleteBoard(boardId);
    router.push('/');
  }
  return (
    <div>
      <button
        className="bg-gray-300 py-2 px-4 border border-t-red-500 text-red-500 rounded-md"
        onClick={() => handleDeleteBoard()}>
            Delete board
      </button>
    </div>
  );
}