var ref;
var app = {
    /*
    Application constructor
    */
    initialize: function() {
        this.bindEvents();
        console.log("Starting NFC Reader app");
    },
    /*
    bind any events that are required on startup to listeners:
    */
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    /*
    this runs when the device is ready for user interaction:
    */
    onDeviceReady: function() {
        window.open = cordova.InAppBrowser.open;
        //ref = cordova.InAppBrowser.open('http://www.google.be', '_blank', 'location=no,hidden=yes');

        nfc.addTagDiscoveredListener(
            app.onNfc, // tag successfully scanned
            function (status) { // listener successfully initialized
                app.display("Tap a tag to read its id number.");
            },
            function (error) { // listener fails to initialize
                app.display("NFC reader failed to initialize " +
                JSON.stringify(error));
            }
        );
    },
    /*
    displays tag ID from @nfcEvent in message div:
    */
    onNfc: function(nfcEvent) {
        var tag = nfcEvent.tag;
        //app.display("Read tag: " + nfc.bytesToHexString(tag.id));
        var url = 'http://e-table.be/admin/soep.php?cid=' + nfc.bytesToHexString(tag.id);

        ref = cordova.InAppBrowser.open(url, '_blank', 'location=no,hidden=no');
        /*ref.executeScript({
            code: "window.location = '"+url+"';"
            }, function() {
                ref.show();
            }
        );*/
        
    },
    /*
    appends @message to the message div:
    */
    display: function(message) {
    var label = document.createTextNode(message),
    lineBreak = document.createElement("br");
    messageDiv.appendChild(lineBreak); // add a line break
    messageDiv.appendChild(label); // add the text
    },
    /*
    clears the message div:
    */
    clear: function() {
    messageDiv.innerHTML = "";
    }
}; // end of app
