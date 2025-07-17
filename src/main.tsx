// main.tsx
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { API_BASE_URL } from './constants/Constants.tsx';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

// 👇 Apollo Client instance
const client = new ApolloClient({
  uri: `${API_BASE_URL}/graphql`,
  cache: new InMemoryCache(),
});

// 👇 Wrap App in ApolloProvider
createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>
);
