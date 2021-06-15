import React from 'react';
import { useHistory } from 'react-router';
import { ChatEngine } from 'react-chat-engine';

import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export default function Chats() {
  const history = useHistory();
  const { user } = useAuth();

  const handleLogout = async () => {
    await auth.signOut();
    history.push('/');
  };

  return (
    <div className='chats-page'>
      <div className='nav-bar'>
        <div className='logo-tab'>Chat</div>
        <div className='logout-tab' onClick={handleLogout}>
          Logout
        </div>
      </div>
      <ChatEngine
        height='calc(100vh - 66px)'
        projectID='784bdb9e-8724-4f63-8ab6-3c10d59f74a7'
        userName='.'
        userSecret='.'
      />
    </div>
  );
}
