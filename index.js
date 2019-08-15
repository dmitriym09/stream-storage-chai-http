'use strict';

const {
    StreamStorage
} = require('stream-storage');

class StreamStorageChaiHttp extends StreamStorage {
    constructor(options) {
        super(options);
        this.httpVersion = 11;
    }

    put(buffer) {
        return new Promise((resolve, reject) => {
            this.write(buffer);
            this.end();
            this.on('finish', (err) => {
                if (!!err) {
                    return reject(err);
                }

                resolve();
            });
        });
    }

    get headers() {
        return {
            'content-length': this.size
        };
    }
}

module.exports.StreamStorageChaiHttp = StreamStorageChaiHttp;