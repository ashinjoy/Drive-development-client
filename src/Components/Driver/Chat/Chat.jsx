import React from 'react'

function Chat() {
  return (
    <div className="w-[70%] h-[90dvh]   border-2 border-gray-300 rounded-lg shadow-lg fixed z-50 top-5 right-[10rem] bg-white">
   
    <div className="bg-gray-200 px-4 py-3 border-b border-gray-300 rounded-t-lg flex items-center justify-between">
      <div className="font-semibold text-lg text-gray-800">Chat with John Doe</div>
      <button className="text-gray-600 hover:text-gray-800">
        <i className="fas fa-ellipsis-v"></i>
      </button>
    </div>
    
    <div className="relative w-full h-[80%]  p-4 ">
      
      <div className="flex">
        <div className="max-w-xs bg-gray-100 p-3 rounded-lg shadow-md text-gray-800">
          Hi there! How are you?
        </div>
      </div>
  
      
      <div className="flex justify-end">
        <div className="max-w-xs bg-blue-500 text-white p-3 rounded-lg shadow-md">
          I'm doing well, thanks! How about you?
        </div>
      </div>
  
      
    </div>
    
    
    <div className="absolute bottom-0 left-0 w-full px-4 py-3 bg-gray-200 border-t border-gray-300 rounded-b-lg flex items-center space-x-4">
      <button className="text-gray-600 hover:text-gray-800">
        <i className="fas fa-paperclip"></i>
      </button>
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
      />
      <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300">
        <i className="fas fa-paper-plane"></i>
      </button>
    </div>
  </div>
  
  )
}

export default Chat
