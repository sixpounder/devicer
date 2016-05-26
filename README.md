# DeviceR

Easily get informations about client devices over http requests.

### Install and quick usage

```bash
npm install --save devicer
```

Test it if you want to
```bash
npm test
```

In any NodeJS module

```javascript
var devicer = require('devicer');
var details = devicer.parseUserAgent(userAgentString);

// or, if you have an http request object
details = devicer.detect(req);
```

Connect/Express middleware (see below for configuration options)
```javascript
var devicer = require('devicer');
var app = require('express');

// req.device will be available after this middleware
app.use(devicer.middleware());
```

### API

#### devicer.detect(request)
Searches the request object for a ```User-Agent``` header and parses it

**returns**: ```object```


#### devicer.parseUserAgent(userAgentString)
Parses the ```userAgentString```

**returns**: ```object```

### devicer.middleware(options)
A middleware to use in connect/express applications.
You may pass an ```options``` object to configure the middleware behaviour.
The following example also illustrates the default behaviour.
```javascript
var devicer = require('devicer');
var app = require('express');

app.use(devicer.middleware({
  // The property name on req that will hold the parse result
  propertyName: 'device',

  // If an error occurs
  onError: function(err, req, res, next) {
    next(err);
  },

  // If parse is succesfull
  onSuccess: function(req, res, next) {
    next(); // no-op
  }
}));
```

## Output
The output is an object holding informations about the user agent string. The ```match``` property specifies the string matched as a valid user agent.

An example with Chrome on OSX:

```javascript
{ match: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
  compliance: 'Mozilla/5.0',
  platform: 'Macintosh; Intel Mac OS X 10_11_5',
  build: '',
  engine: 'AppleWebKit/537.36 (KHTML, like Gecko)',
  additional: 'Chrome/50.0.2661.102' }
```
