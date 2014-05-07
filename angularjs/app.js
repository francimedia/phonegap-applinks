angular.module('MyApp.controllers', [])

.controller('MyCtrl', function ($scope, $http) {

    var parseXML = function (data) {

        var xml, tmp;
        if (!data || typeof data !== "string") {
            return null;
        }

        tmp = new DOMParser();
        return tmp.parseFromString(data, "text/xml");

    };

    var getMetaProperty = function (xml, key) {
        var metas = xml.getElementsByTagName('meta')
        for (var i = 0; i < metas.length; i++) {
            if (metas[i].getAttribute('property').toLowerCase() == key) {
                return metas[i].getAttribute('content');
            }
        }
        return null;
    };

    $scope.loadURL = function (url) {

        $http({
            method: 'GET',
            url: url
        }).
        success(function (data, status, headers, config) {

            // parse the HTML document 
            var xml = parseXML(data);

            // get the iOS url
            var ios_url = getMetaProperty(xml, 'al:ios:url');

            // if there is no iOS URL, open the link in the system browser
            if (!ios_url) {
                return window.open(url, '_system');
            }

            // Try to open the native app (hidden)
            var ref = window.open(ios_url, '_blank', 'hidden=yes');

            // if this is not working...
            ref.addEventListener('loaderror', function (event) {
                // close the hidden browser window
                ref.close();

                // The user could download the app from the app store?
                var app_store_id = getMetaProperty(xml, 'al:ios:app_store_id');

                // we got one...                
                if (app_store_id) {
                    window.open('itms-apps://itunes.apple.com/app/id' + app_store_id, '_system');
                    return;

                }

                // open the browser view
                window.open(url, '_system');

            });

        }).
        error(function (data, status, headers, config) {
            // fall back to the browser view
            window.open(url, '_system');
        });

    };


});