import React, { useState } from 'react';
import { MessageSquare, Upload, Key, Mail } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import ImageUpload from './components/ImageUpload';
import PasswordReset from './components/PasswordReset';
import OutlookTroubleshooting from './components/OutlookTroubleshooting';

function App() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">AI Helpdesk Agent</h1>
      </header>
      <div className="flex-grow flex">
        <nav className="w-64 bg-gray-800 text-white p-4">
          <ul>
            <li className={`mb-2 ${activeTab === 'chat' ? 'bg-blue-500' : ''}`}>
              <button
                className="flex items-center w-full p-2 rounded"
                onClick={() => setActiveTab('chat')}
              >
                <MessageSquare className="mr-2" /> Chat
              </button>
            </li>
            <li className={`mb-2 ${activeTab === 'image' ? 'bg-blue-500' : ''}`}>
              <button
                className="flex items-center w-full p-2 rounded"
                onClick={() => setActiveTab('image')}
              >
                <Upload className="mr-2" /> Image Upload
              </button>
            </li>
            <li className={`mb-2 ${activeTab === 'password' ? 'bg-blue-500' : ''}`}>
              <button
                className="flex items-center w-full p-2 rounded"
                onClick={() => setActiveTab('password')}
              >
                <Key className="mr-2" /> Password Reset
              </button>
            </li>
            <li className={`mb-2 ${activeTab === 'outlook' ? 'bg-blue-500' : ''}`}>
              <button
                className="flex items-center w-full p-2 rounded"
                onClick={() => setActiveTab('outlook')}
              >
                <Mail className="mr-2" /> Outlook Issues
              </button>
            </li>
          </ul>
        </nav>
        <main className="flex-grow p-4">
          {activeTab === 'chat' && <ChatInterface />}
          {activeTab === 'image' && <ImageUpload />}
          {activeTab === 'password' && <PasswordReset />}
          {activeTab === 'outlook' && <OutlookTroubleshooting />}
        </main>
      </div>
    </div>
  );
}

export default App;