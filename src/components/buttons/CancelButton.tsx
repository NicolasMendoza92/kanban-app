import {faClose} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function CancelButton({onClick}:{onClick:() => void}) {
  return (
    <button
      className="bg-gray-100 py-2 px-4 border border-t-red-500 text-gray-500 rounded-md"
      onClick={onClick}>
      <FontAwesomeIcon icon={faClose}/> 
    </button>
  );
}