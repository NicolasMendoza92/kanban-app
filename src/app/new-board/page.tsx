'use client';
import React from 'react'
import { createBoard } from '../actions/boardActions';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';

export default function NewBoardPage() {

    async function handleNewBoardSubmit(formData: FormData){
        const boardName = formData.get('name')?.toString() || '';
        const boardInfo = await createBoard(boardName);
        if(boardInfo){
            redirect(`/boards/${boardInfo.id}`)
        }
       
    }

  return (
    <div>
        <Header/>
        <div className='p-8'>
        <form action={handleNewBoardSubmit} className='max-w-md block'>
            <h1 className='text-2xl text-bold mb-2'>Create it your board </h1>
            <input type='text' className='w-full' name='name' placeholder='BOARD NAME'/>
            <button type='submit' className='mt-2 w-full'> Create </button>
        </form>
        </div>
       
    </div>
  )
}
