# fs-ads

Js module to manipulate NTFS Alternate Data Stream (ADS) on windows.

Alternate data streams allow more than one data stream to be associated with a filename (a fork),

using the format `filename:streamname` (e.g., `text.txt:extrastream`).

You can store extended attributes by ADS in NTFS on windows as an alternative form of [fs-xattr](https://github.com/LinusU/fs-xattr)

## Installation

```sh
npm install --save fs-ads
```

## Usage

```javascript
const ads = require('fs-ads')
```

## API

### ads.get(path, streamName[, options], cb)

Get Alternate Data Stream `streamName` from file at `path`.

`options` is an object that used to set the `encoding` of ads. The default `encoding` is `utf-8`. You can set some custom [encoding](https://nodejs.org/docs/latest/api/buffer.html#buffer_buffers_and_character_encodings).

```js
options = { encoding: 'utf-8' } // default
options = { encoding: 'ascii' } // use ascii
options = { encoding: null } // the raw buffer is returned
```

`cb` is a callback that will be called with `(err, val)`.

### ads.getSync(path, streamName[, options])

Synchronous version of `ads.get`

### ads.set(path, streamName, value[, options], cb)

Set Alternate Data Stream `streamName` to `value` on file at `path`.

`value` can be either a string or a `Buffer`.

`options` is an object that used to set the `encoding` of ads. The encoding option is ignored if data is a `Buffer`. It defaults to `utf-8`.

```js
options = { encoding: 'utf-8' } // default
options = { encoding: 'hex' } // use hex
```

`cb` is a callback that will be called with `(err)`.

### ads.setSync(path, streamName[, options], value)

Synchronous version of `ads.set`

### ads.remove(path, streamName, cb)

Remove Alternate Data Stream `streamName` on file at `path`.

`cb` is a callback that will be called with `(err)`.

### ads.removeSync(path, streamName)

Synchronous version of `ads.remove`
