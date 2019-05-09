import React from 'react'

function AuthButton(props) {
  const { authenticated, logout } = props;
  return (
    authenticated ? (
      <p>
        Welcome! <button onClick={() => { console.log('WHATTTTTTT') }}>Sign out</button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
  );
 }
export default AuthButton;
