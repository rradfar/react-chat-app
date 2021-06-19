import React, { useEffect, UseRef, UseState } from 'react';
import { useHistory } from 'react-router';
import { ChatEngine } from 'react-chat-engine';

import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

export default function Chats() {
  const history = useHistory();
  const { user } = useAuth();
  const { loading, setLoading } = useState(true);

  const handleLogout = async () => {
    await auth.signOut();
    history.push('/');
  };

  const getFile = async url => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File({ data }, 'userPhoto.jpg', { type: 'image/jpeg' });
  };

  useEffect(() => {
    if (!user) {
      history.push('/');
      return;
    }
    axios
      .get('https://api.chatengine.io/users/me', {
        headers: {
          'project-ID': '784bdb9e-8724-4f63-8ab6-3c10d59f74a7',
          'user-name': user.email,
          'user-secret': user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formData = new FormData();
        formData.append('email', user.email);
        formData.append('username', user.displayName);
        formData.append('secret', user.uid);
        getFile(user.photoUrl).then(avatar => {
          formData.append('avatar', avatar, avatar.name);
        });
        axios
          .post('https://api.chatengine.io/users', formData, {
            headers: {
              'private-key': 'placeholder-private-key',
            },
          })
          .then(() => setLoading(false))
          .catch(error => console.log(error));
      });
  }, [user, history]);

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
