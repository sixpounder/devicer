# DeviceR

Easily get informations about client devices over http requests.

**We are adding more detections over time, there is a lot of stuff to keep track of.**

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

# DeviceR API

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

# Output API

## Class Device
A Device instance is what a call to ```detect```, ```parseUserAgent``` methods returns and the DeviceR middleware sets on the request ```device``` property.

### Properties

- ```Device.match``` The user agent string matched as valid
- ```Device.compliance``` The user agent compliance level. Usually "Mozilla/5.0" in modern browsers
- ```Device.platform``` The platform on which the client is running
- ```Device.build``` The platform build, if specified
- ```Device.additional``` Any further specification on the user agent
- ```Device.engine``` A ```BrowserEngine``` instance

### Methods
- ```Device#isIPad``` Returns ```true``` if the device is likely to be an iPad
- ```Device#isIPhone``` Returns ```true``` if the device is likely to be an iPhone
- ```Device#isAndroid``` Returns ```true``` if the device is likely to be an android device
- ```Device#isDesktop``` Returns ```true``` if the device is likely to be a desktop computer
- ```Device#isMobile``` Returns ```true``` if the device is likely to be a mobile device
- ```Device#isWin``` Returns ```true``` if the device is running Windows
- ```Device#isOSX``` Returns ```true``` if the device is running MAC OSX
- ```Device#isLinux``` Returns ```true``` if the device is running Linux

## Class BrowserEngine

### Properties
- ```BrowserEngine.name``` The browser name string

### Methods
- ```BrowserEngine#isChrome``` Returns ```true``` if it is a Chrome browser
- ```BrowserEngine#isWebKit``` Returns ```true``` if it is a WebKit based browser
- ```BrowserEngine#isFirefox``` Returns ```true``` if it is a Firefox browser
- ```BrowserEngine#isOpera``` Returns ```true``` if it is an Opera browser
- ```BrowserEngine#isSafari``` Returns ```true``` if it is a Safari browser
- ```BrowserEngine#isIE``` Returns ```true``` if it is an Internet Explorer or Microsoft Edge browser
