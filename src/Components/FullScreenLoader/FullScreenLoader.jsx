import React from 'react'

export default function FullScreenLoader() {
  return (
    <div className='fixed inset-0 bg-gray-200/70 flex items-center justify-center z-40'>
        <div className='w-12 h-12 border-4 border-gray-400 border-t-transparent rounded-full animate-spin'>

        </div>
    </div>
  )
}
