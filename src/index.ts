import cluster from 'cluster';
import os from 'os';

// const CPUS = os.cpus();
// if (cluster.isPrimary) {
//   CPUS.forEach(() => {
//     cluster.fork();
//   });
//   cluster.on('listening', (worker) => {
//     // eslint-disable-next-line no-console
//     console.log('Cluster %d connected', worker.process.pid);
//   });
//   cluster.on('disconnect', (worker) => {
//     // eslint-disable-next-line no-console
//     console.log('Cluster %d disconnected', worker.process.pid);
//   });
//   cluster.on('exit', (worker) => {
//     // eslint-disable-next-line no-console
//     console.log('Cluster %d is dead', worker.process.pid);
//     cluster.fork();
//   });
// } else {
import('./server');
// }
