import {faClose} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function CancelXBtn({onClick}:{onClick:() => void}) {
  return (
    <button
      className="text-gray-400 p-2 text-lg"
      onClick={onClick}>
      <FontAwesomeIcon icon={faClose}/>
    </button>
  );
}