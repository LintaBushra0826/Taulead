import React, { useEffect } from 'react';
import Routes from './routes';
import { ConfigProvider } from 'antd';
import { connectWebSocket, disconnectWebSocket } from '../src/services/WebSocketService';

function App() {
  useEffect(() => {
    connectWebSocket();

    return () => {
      disconnectWebSocket();
    };
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#660066',
        },
      }}
    >
      <Routes />
    </ConfigProvider>
  );
}

export default App;
