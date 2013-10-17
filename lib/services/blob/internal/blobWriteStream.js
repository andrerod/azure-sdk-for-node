/**
* Copyright (c) Microsoft.  All rights reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

var Stream = require('stream').Stream;
var util = require('util');

var Constants = require('../../../util/constants');
var BlobConstants = Constants.BlobConstants;

function BlobWriteStream(options) {
  if (options === null) {
    options = {};
  }

  this.options = options;

  this.writable = true;

  this.currentBuffer = null;
  this.currentBufferLength = 0;

  this.writeBlockSizeInBytes = BlobConstants.DEFAULT_WRITE_BLOCK_SIZE_IN_BYTES;
  if (options && options.writeBlockSizeInBytes) {
    this.writeBlockSizeInBytes = options.writeBlockSizeInBytes;
  }

  this.blocks = 0;
}

util.inherits(BlobWriteStream, Stream);

BlobWriteStream.prototype.end = function () {
  this.writable = false;

  if (this.blocks > 0) {
    // Committing a block list
    this._sendBlock(true, true);

    if (this.currentUploads === 0) {
      // Commit final list
      this._sendCommit();
    }
  } else {
    this._sendBlock(false);
  }
};

BlobWriteStream.prototype.write = function (data) {
  var self = this;

  if (!Buffer.isBuffer(data)) {
    data = new Buffer(data);
  }

  if (self.writable) {
    if (!self.currentBuffer) {
      self.currentBuffer = new Buffer(self.writeBlockSizeInBytes);
      self.currentBufferLength = 0;
    }

    if (self.currentBufferLength + data.length <= self.writeBlockSizeInBytes) {
      data.copy(self.currentBuffer, self.currentBufferLength, self.currentBufferLength, self.currentBufferLength + data.length);
      self.currentBufferLength += data.length;
    } else {
      var currentIndex = 0;
      while ((data.length - currentIndex) > (self.writeBlockSizeInBytes - self.currentBufferLength)) {
        var writeSize = (self.writeBlockSizeInBytes - self.currentBufferLength);
        data.copy(self.currentBuffer, self.currentBufferLength, currentIndex, currentIndex + writeSize);
        currentIndex += writeSize;
        self.currentBufferLength += writeSize;

        self._sendBlock(true);
      }

      data.copy(self.currentBuffer, self.currentBufferLength, currentIndex, currentIndex + (data.length - currentIndex));
      self.currentBufferLength += (data.length - currentIndex);
    }
  } else {
    self.emit('error', new Error('Stream is no longer writable'));
  }
};

BlobWriteStream.prototype._sendBlock = function (isBlockList, isLastBlock) {
  var self = this;

  if (isBlockList) {
    this.blocks++;
  }

  if (this.currentBufferLength > 0) {
    this.currentUploads++;

    var callback = function (err) {
      self.currentUploads--;

      if (err) {
        self.emit('error', err);
      } else {
        if (isBlockList) {
          // TODO: should we check if we had a pause in the first place ??
          self.emit('drain');
        }

        if (self.currentUploads === 0 && isLastBlock) {
          self._sendCommit();
        }
      }
    };

    if (isBlockList) {
      this.sendBlock(this.currentBuffer, this.currentBufferLength, true, callback);
    } else {
      this.sendBlock(this.currentBuffer, this.currentBufferLength, false, callback);
    }

    this.currentBuffer = new Buffer(this.writeBlockSizeInBytes);
    this.currentBufferLength = 0;
  }
};

BlobWriteStream.prototype._sendCommit = function () {
  var self = this;

  self.emit('end');

  // TODO: after the commit is done emit the close
  self.emit('close');
};

module.exports = BlobWriteStream;