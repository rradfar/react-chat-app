import React from 'react';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';

export default function Login() {
  return (
    <div id='login-page'>
      <div id='login-card'>
        <h2>Welcome!</h2>
        <div className='login-button google'>
          <GoogleOutlined /> Sign in with Google
        </div>
        <br /> <br />
        <div className='login-button facebook'>
          <FacebookOutlined /> Sign in with Facebook
        </div>
      </div>
    </div>
  );
}
