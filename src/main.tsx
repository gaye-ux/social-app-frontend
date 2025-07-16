// main.tsx
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

// 👇 Apollo Client instance
const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache(),
});

// 👇 Wrap App in ApolloProvider
createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>
);
