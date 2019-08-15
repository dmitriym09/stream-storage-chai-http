'use strict';

const chai = require('chai');
chai.use(require('chai-http'));

const {
  assert,
  expect
} = chai;

const {
  StreamStorageChaiHttp
} = require('..');

describe('StreamStorageChaiHttp', function () {
  beforeEach(function () {
    this.len = 0;
    this.stream = new StreamStorageChaiHttp();
  });

  describe('multer', function () {
    beforeEach(function () {
      this.timeout(-1);

      return new Promise((resolve, reject) => {
        this.server = require('./server');
        this.requester = chai.request(this.server).keepOpen();

        this.text = `Hello World ${new Date()}!`;
        this.stream.put(this.text)
          .then(() => {
            this.requester.post('/')
              .attach('file', this.stream, 'test.txt')
              .end((err, res) => {
                if (!!err) {
                  return reject(err);
                }
                this.resp = res;

                resolve();
              });
          })
          .catch(reject);
      });
    });

    it('requst', function () {
      expect(this.resp.status).to.equal(222);
    });

    it('text', function () {
      expect(this.resp.text).to.equal(this.text);
    });

    afterEach(function () {
      this.server.close();
    });
  });

  afterEach(function () {
    this.stream.destroy();
  });
});