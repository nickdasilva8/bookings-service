import server from './app';

const port: number = 3001;

/**
 * Start Express server.
 */

if (!module.parent) {
  server.listen(port, () => {
    console.log(`App is running at ${port}`);
  });
}

server.on('error', (e) =>
  console.error(`Error opening listener on port ${port}`, e)
);

export default server;
