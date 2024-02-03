'use client';
import {faArrowLeft, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";

type Props = {
  onDelete: () => void;
};


export default function DeleteCardBtn({onDelete}: Props) {
  const [wannaDelete, setWannaDelete] = useState(false);

  if (wannaDelete) {
    return (
      <div>
        <h4 className="mb-2 text-center">Are you sure?</h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="">
            <button
              className="block grow w-full bg-gray-200 py-2 px-4 border border-t-blue-500 text-gray-500 rounded-md"
              onClick={() => setWannaDelete(false)}
            >
              <FontAwesomeIcon icon={faArrowLeft}/>
              No
            </button>
          </div>
          <div>
            <button onClick={onDelete} className="w-full bg-gray-200 py-2 px-4 border border-t-red-500 text-red-500 rounded-md">
              Yes, delete!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setWannaDelete(true)}
      className="bg-gray-100 text-gray-500 p-2 flex gap-2 w-full items-center rounded-md justify-center border border-t-red-500">
      <FontAwesomeIcon icon={faTrash}/>
      Delete
    </button>
  );
}
