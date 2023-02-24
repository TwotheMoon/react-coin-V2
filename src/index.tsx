import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

import App from './App';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const getLibrary = (provider: any) => new Web3Provider(provider);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <Web3ReactProvider getLibrary={getLibrary}>
       <QueryClientProvider client={queryClient}>
          <App />
       </QueryClientProvider>
      </Web3ReactProvider>
    </RecoilRoot>
  </React.StrictMode>
);
