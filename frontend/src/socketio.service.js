import { io } from 'socket.io-client';

export let socket;

export const initiateSocketConnection = () => {
  socket = io();
  console.log(`Connecting socket...`);
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket.off();
    console.log('Disconnecting socket...');
  };
}

export const joinRoom = ({ roomId, senderInfo }) => {
  socket.emit('join', { senderInfo, roomId }, (error) => {
    if (error) {
      alert(error);
    }
  });

}

// export const receiveMessage = () => {
//   socket.on('message', message => {});
//   let receivedMsg = ;

//   console.log('receive a msg: ', receivedMsg)
//   // return receivedMsg
// }

export const sendMessage = ({ text, roomId, name, createdAt, userId }, callback) => {
  socket.emit('sendMessage', { text, roomId, name, createdAt, userId }, callback);
}

export const sendFeed = (newFeed, callback) => {
  socket.emit('sendFeed', newFeed, callback);
}