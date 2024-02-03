import BoardPage from "@/app/boards/[boardId]/page";


//en  esta especifica ruta vamos a hacer que se abra como un modal pero que tenga la ruta de la card. ASi como en click up o Trello
// para eso importamos el BoardPage para que aparezca los mismo que en la pantalla del board pero difuminado.

// A traves de los params, podemos acceder a los Id que necesito, tanto del board en el que nos encontramos y el de la card seleccionada. 
type PageProps = {
    params: {
      boardId: string;
      cardId: string;
    };
  };

export default function CardPage({params}:PageProps) {

  return (
    // llamamos al componente BoardPage y le pasamos los parametros 
    <BoardPage params={params}/>
  )
}
