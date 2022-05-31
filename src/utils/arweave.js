import Arweave from 'arweave';

export const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
});

// export const arweave = Arweave.init({
//     host: 'localhost',
//     port: 1984,
//     protocol: 'http'
// });