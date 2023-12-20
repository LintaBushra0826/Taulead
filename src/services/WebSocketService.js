import axios from 'axios';

let ws;

export function connectWebSocket(onDataReceived) {
  ws = new WebSocket('ws://localhost:3005');

  ws.onopen = () => {
    console.log('WebSocket connected');
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onDataReceived(data); // Call the provided callback function with received data
  };

  ws.onclose = () => {
    console.log('WebSocket disconnected');
  };
}

export function disconnectWebSocket() {
  if (ws) {
    ws.close();
  }
}

export async function fetchDataFromHR() {
  try {
    const response = await axios.get('http://localhost:3005/humanresource');
    return response.data.data;
    
  } catch (error) {
    console.error('Error fetching HR data:', error);
    throw error;
  }
}