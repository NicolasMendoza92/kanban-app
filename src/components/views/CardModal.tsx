'use client'

import { useParams, useRouter } from "next/navigation"
import {  useEffect } from "react";
import CardModalBody from "../cardComponents/CardModalBody";

export default function CardModal() {

  const router = useRouter();
  const params = useParams();


  // si estamamos dentro de un card (pop up abierto), seteamos el estado de openCard con el valor para que actualice el useState del BoardContext.
  useEffect(() => {
    if (params.cardId) {

    }
  }, [params.cardId])


  const handleBackdropClick = () => {
    router.back()
  }

  return (
    <>
     <div
        className="fixed inset-0 bg-black/70 z-10"
      >
      </div>
      <div className="absolute inset-0 z-20 w-full" onClick={handleBackdropClick}>
        <div className="">
          <div
            className="bg-white max-w-4xl my-8 px-4 p-1 mx-auto rounded-md">
            <div onClick={ev => ev.stopPropagation()}>
              <CardModalBody/>
            </div>

          </div>
          <div>&nbsp;</div>
        </div>
      </div>
    </>
  )
}
