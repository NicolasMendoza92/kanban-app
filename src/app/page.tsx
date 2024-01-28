
import Boards from "@/components/Boards";
import LoginView from "@/components/views/LoginView";
import { authOptions } from "@/lib/authOptions";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {

  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <LoginView />
    )
  }

  return (
    <div>
      <h1 className="text-4xl"> YOUR KANBAN WORKSPACE </h1>
      <Boards/>
      <div>
        <Link className="bg-blue-500 px-3 py-3 border-b rounded-lg m-3 inline-block text-white gap-2 items-center" href={"/new-board"}> 
        Create a new board 
        <FontAwesomeIcon className="ms-1" icon={faPlus} />
        </Link>
      </div>

    </div>
  );
}
