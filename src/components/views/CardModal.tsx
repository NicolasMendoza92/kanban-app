'use client'

import CardModalBody from "../cardComponents/CardModalBody";

export default function CardModal() {

  return (
    <>
      {/* <div className="fixed inset-0 bg-black/70"></div> */}
      <div className=" inset-0 w-full ">
        <div className="">
          <div className="bg-white max-w-full min-h-full my-4 px-8 py-4 mx-auto rounded-md">
            <CardModalBody />
          </div>
        </div>
      </div>
    </>
  )
}
