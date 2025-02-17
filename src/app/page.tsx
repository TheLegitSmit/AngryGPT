'use client';

import { useChat } from '@ai-sdk/react';

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4">
      <div className="w-full max-w-md mb-16">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`whitespace-pre-wrap mb-4 p-3 rounded shadow ${
              msg.role === 'user'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            <strong>{msg.role === 'user' ? 'User: ' : 'AI: '}</strong>
            {msg.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          className="w-full p-3 mb-4 border border-blue-300 rounded text-black focus:outline-none focus:border-blue-500"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
