# stream-storage-chai-http

![Version](https://img.shields.io/badge/version-0.0.2-green.svg)
![npm](https://img.shields.io/npm/dy/stream-storage-chai-http)

Simple [stream](https://github.com/dmitriym09/stream-storage) for using with [chai-http](https://github.com/chaijs/chai-http).

```
npm install stream-storage-chai-http -D
```

## Usage

```js
const { StreamStorage } = require('stream-storage');
const streamStorage = new StreamStorage();

const server = require('./server');
const requester = chai.request(server).keepOpen();

streamStorage.put('HI')
    .then(() => {
        requester.post('/')
            .attach('file', streamStorage, 'test.txt')
            .end((err, res) => {
                streamStorage.destroy();
                //...
            });
    });
```

## Contributors
 * dmitriym09 <dmitriym.09.12.1989@gmail.com>

## dev

### test

For run test:
```js
npm run test
```

## versions

- **0.0.1** - init
- **0.0.2** - tags
