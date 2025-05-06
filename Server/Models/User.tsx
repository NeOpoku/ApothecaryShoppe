import React from 'react';

interface UserProps {
  username: string;
  email: string;
}

const User: React.FC<UserProps> = ({ username, email }) => {
  return (
    <div className="user-card">
      <h2>{username}</h2>
      <p>{email}</p>
    </div>
  );
};

export default User;