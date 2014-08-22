var appLinks = {

    init: function () {
        $('.app-link').click(appLinks.eventHandler);
    },

    eventHandler: function (event) {

        event.preventDefault();
        var url = $(event.target).attr('href');

        var jqxhr = $.ajax(url)
            .done(function (data) {
                appLinks.callback(data, url);
            })
            .fail(function () {
                window.open(url, '_system');
            });
    },

    callback: function (data, url) {
        // parse the HTML document 
        var xml = $.parseXML(data);

        // get the iOS url
        var ios_url = appLinks.getMetaProperty(xml, 'al:ios:url');

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
            var app_store_id = appLinks.getMetaProperty(xml, 'al:ios:app_store_id');

            // we got one...                
            if (app_store_id) {
                window.open('itms-apps://itunes.apple.com/app/id' + app_store_id, '_system');
                return;

            }

            // open the browser view
            window.open(url, '_system');

        });
    },

    getMetaProperty: function (xml, key) {
        return $(xml).find('meta[property=' + key + ']').attr('content');
    }

}

$(function () {
    appLinks.init();
});
