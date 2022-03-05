import React, { useState } from 'react'

function ChatInput({ hanldeSendNewMsg }) {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault()
    hanldeSendNewMsg(text)
    setText('')
  }

  return (
    <>
      <form className="flex bottom-0 w-full items-center bg-slate-100 z-10 absolute" onSubmit={handleSubmit}>
        <input
          type="text"
          className="flex-1 form-control m-0 block w-full rounded py-3 focus:border-blue-700 focus:outline-none px-4 border-solid border-gray-500"
          placeholder="Type something..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button className='bg-teal-600 p-3 text-white font-mono rounded' type='submit' >send</button>
      </form>
    </>
  )
}

export default ChatInput