'use client'
import { RoomProvider } from '@/app/liveblocks.config'
import { BoardContextProvider } from '@/context/BoardContext'
import { LiveList } from '@liveblocks/core'
import { useParams } from 'next/navigation'
import React from 'react'

type PageProps = {
  children: React.ReactNode,
}

export default function BoardLayout({ children}: PageProps) {
  const params = useParams();

  return (
    <BoardContextProvider>
      <RoomProvider id={params.boardId.toString()}
        initialPresence={{}}
        // definimos las default items que necesita
        initialStorage={{
          columns: new LiveList(),
          cards: new LiveList(),
        }}>
        {children}
      </RoomProvider>

    </BoardContextProvider>
  )
}
