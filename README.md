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

### ads.get(path, streamName, cb, cyrillic)

Get Alternate Data Stream `streamName` from file at `path`.

`streamName` is a string that will be the file name of 

`cb` is a callback that will be called with `(err, val)`.

`cyrillic` is a boolean variable, that allows you to get stream without any specified encoding. It helps you to work correctly with cyrillic character, because if you will specify `utf-8` encoding, it will corrupt cyrillic data.

### ads.getSync(path, streamName, cyrillic)

Synchronous version of `ads.get`

### ads.set(path, streamName, value, cb)

Set Alternate Data Stream `streamName` to `value` on file at `path`.

`value` can be either a string or a `Buffer`.

`cb` is a callback that will be called with `(err)`.

### ads.setSync(path, streamName, value)

Synchronous version of `ads.set`

### ads.remove(path, streamName, cb)

Remove Alternate Data Stream `streamName` on file at `path`.

`cb` is a callback that will be called with `(err)`.

### ads.removeSync(path, streamName)

Synchronous version of `ads.remove`
