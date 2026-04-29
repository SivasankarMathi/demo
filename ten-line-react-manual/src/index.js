import React from 'react';
import { createRoot } from 'react-dom/client';

// This is a complete React app in exactly 10 lines of actual code
const App = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Ten Line React App</h1>
      <p>You clicked the button {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

createRoot(document.getElementById('root')).render(<App />);