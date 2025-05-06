import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ApolloProvider from './utils/ApolloProvider'; // Ensure the file exists at 'client/src/utils/ApolloProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
