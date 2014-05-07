Using AppLinks in PhoneGap
=================

AppLinks (http://applinks.org/) is an open source approach to unify linking between mobile apps and across platforms.
The project was announced and released at Facebook's F8 conference 2014 in San Francisco (https://www.fbf8.com/).

## Handling AppLinks in PhoneGap
Our first quick test method to handle the standard:
* Make a xHTTP request to the URL hosting the AppLinks Meta Tags
* Parse the response via JS DOMParser
* Read Meta Properties and try to open the app or go to the app store
* As Fallback call the original URL

## Requirements
The approach is using the cordova/phonegap plugin "InAppBrowser" (https://github.com/apache/cordova-plugin-inappbrowser)

## Example implementations
* */iconic-example/controller.js*: This approach is based on the use of the Ionic Framework (http://ionicframework.com/), however it should be usable with any AngularJS phonegap app
