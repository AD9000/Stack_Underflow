import React from "react";
import { useHistory } from 'react-router-dom';

// Change name
export default function RegisterSuccess() {

  let history = useHistory();

  const handleButton = () => {
    history.push('/home');
  }

  return (
    <div>
      <h1>
        success
      </h1>
      <button onClick={handleButton}>Done</button>
    </div>
  );
}

export { RegisterSuccess };