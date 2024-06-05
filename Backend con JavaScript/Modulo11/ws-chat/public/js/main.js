const socket = io({
  auth: {
    token: 'ABC-123',
    name: 'John Doe',
  },
});

socket.on('welcome', (data) => {
  console.log('Welcome', data.message);
});

socket.on('disconnect', () => {
  console.log("You're offline");
});

socket.on('connect', () => {
  console.log("You're online");
});
