'use client'

import CardModalBody from "../cardComponents/CardModalBody";


export default function CardModal() {

  return (
    <>
      <div className="fixed inset-0 bg-black/70"></div>
      <div className="absolute inset-0 w-full">
        <div className="">
          <div className="bg-white max-w-7xl min-h-full my-8 px-8 py-4 mx-auto rounded-md">
            <div onClick={ev => ev.stopPropagation()}>
              <CardModalBody />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
