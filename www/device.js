gitprojects / cordova-plugin-device.git / blob
? search:  re
summary | shortlog | log | commit | commitdiff | tree
history | raw | HEAD
CB-7168 Moving Device autotests to plugin (aka new-style tests)
[cordova-plugin-device.git] / www / device.js
   1 /*
   2  *
   3  * Licensed to the Apache Software Foundation (ASF) under one
   4  * or more contributor license agreements.  See the NOTICE file
   5  * distributed with this work for additional information
   6  * regarding copyright ownership.  The ASF licenses this file
   7  * to you under the Apache License, Version 2.0 (the
   8  * "License"); you may not use this file except in compliance
   9  * with the License.  You may obtain a copy of the License at
  10  *
  11  *   http://www.apache.org/licenses/LICENSE-2.0
  12  *
  13  * Unless required by applicable law or agreed to in writing,
  14  * software distributed under the License is distributed on an
  15  * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  16  * KIND, either express or implied.  See the License for the
  17  * specific language governing permissions and limitations
  18  * under the License.
  19  *
  20 */
  21 
  22 var argscheck = require('cordova/argscheck'),
  23     channel = require('cordova/channel'),
  24     utils = require('cordova/utils'),
  25     exec = require('cordova/exec'),
  26     cordova = require('cordova');
  27 
  28 channel.createSticky('onCordovaInfoReady');
  29 // Tell cordova channel to wait on the CordovaInfoReady event
  30 channel.waitForInitialization('onCordovaInfoReady');
  31 
  32 /**
  33  * This represents the mobile device, and provides properties for inspecting the model, version, UUID of the
  34  * phone, etc.
  35  * @constructor
  36  */
  37 function Device() {
  38     this.available = false;
  39     this.platform = null;
  40     this.version = null;
  41     this.uuid = null;
  42     this.cordova = null;
  43     this.model = null;
  44 
  45     var me = this;
  46 
  47     channel.onCordovaReady.subscribe(function() {
  48         me.getInfo(function(info) {
  49             //ignoring info.cordova returning from native, we should use value from cordova.version defined in cordova.js
  50             //TODO: CB-5105 native implementations should not return info.cordova
  51             var buildLabel = cordova.version;
  52             me.available = true;
  53             me.platform = info.platform;
  54             me.version = info.version;
  55             me.uuid = info.uuid;
  56             me.cordova = buildLabel;
  57             me.model = info.model;
  58             channel.onCordovaInfoReady.fire();
  59         },function(e) {
  60             me.available = false;
  61             utils.alert("[ERROR] Error initializing Cordova: " + e);
  62         });
  63     });
  64 }
  65 
  66 /**
  67  * Get device info
  68  *
  69  * @param {Function} successCallback The function to call when the heading data is available
  70  * @param {Function} errorCallback The function to call when there is an error getting the heading data. (OPTIONAL)
  71  */
  72 Device.prototype.getInfo = function(successCallback, errorCallback) {
  73     argscheck.checkArgs('fF', 'Device.getInfo', arguments);
  74     exec(successCallback, errorCallback, "Device", "getDeviceInfo", []);
  75 };
  76 
  77 module.exports = new Device();
Apache CordovaRSSAtom
