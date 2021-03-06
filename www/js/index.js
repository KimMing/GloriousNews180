/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
    	alert("onDeviceReady");
        app.receivedEvent('deviceready');
	app.pushInit();
		var ref = window.open('http://kimming.byethost4.com/', '_self', 'location=yes');
    },
	
	pushInit: function(){
		//alert('device ready');
		try {
			//code for push notification
			var pushNotification = window.plugins.pushNotification;
			//alert ('Android register function.');
			var phoneName = window.device;
			pushNotification.unregister(app.successHandler, app.errorHandler); //call to unregister. This should be placed somewhere else later
			//alert('pending register. device platform ='+ phoneName.platform);
			//if (device.platform == 'android' || device.platform == 'Android') {
				
            			pushNotification.register(app.successHandler, app.errorHandler, {"senderID":"45315964427","ecb":"app.onNotificationGCM"});
        		//}
        		//else {
        		//	alert('IOS register function');
            		//	pushNotification.register(this.tokenHandler,this.errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"app.onNotificationAPN"});
        		//}

//>>>>>>> origin/master
		}
		catch (ex) {
			alert('error: ' + ex);
		}
	},
	
	// result contains any message sent from the plugin call
	successHandler: function(result) {
		//alert('Callback Success! Result = '+result);
	},
		
	// result contains any message sent from the plugin call
	tokenHandler: function(result) {
		//alert('Tokenhandler Callback Success! Result = '+result);
	},
	
	errorHandler:function(error) {
		alert(error);
	},
	
	onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    	console.log("Regid " + e.regid);
                    	//alert('registration id = '+e.regid);
					
			var method = "POST";
			var postData = "/?regId=" +e.regid;
			var url = "http://kimming.byethost4.com";
			var async = true;
			var request = new XMLHttpRequest();
			request.onload = function () {
			var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
				var data = request.responseText; // Returned data, e.g., an HTML document.
			}
			request.open(method, url, async);
			request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
			request.send(postData);
			var ref = window.open('http://kimming.byethost4.com/?regId=' +e.regid, '_self', 'location=yes');
                }
                else
                {
                	alert('No registration id found.');
                }
            break;
 
            case 'message':
              // this is the actual push notification. its format depends on the data model from the push server
              alert('message = '+e.message+' msgcnt = '+e.msgcnt);
            break;
 
            case 'error':
              alert('GCM error = '+e.msg);
            break;
 
            default:
              alert('An unknown GCM event has occurred');
              break;
        }
    },
    
       // iOS
    /*
    onNotificationAPN: function(event) {
        var pushNotification = window.plugins.pushNotification;

        if (event.alert) {
            navigator.notification.alert(event.alert);
        }
        if (event.badge) {

            pushNotification.setApplicationIconBadgeNumber(this.successHandler, event.badge);
        }
        if (event.sound) {
            var snd = new Media(event.sound);
            snd.play();
        }
    },
    */
       
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
