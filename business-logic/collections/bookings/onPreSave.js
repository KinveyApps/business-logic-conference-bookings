/**
 * Copyright (c) 2014 Kinvey, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function onPreSave(request,response,modules){
  var rooms = modules.collectionAccess.collection('conferencerooms');

  // find the first available room, and set available = false if one is found.  
  rooms.findAndModify({"available":true}, {"lastUsed": 1}, {$set: {"available": false, "lastUsed": request.body.bookingTime}}, function(err, result) {
    if (err) {
      // Database query error, return an error response to the client and terminate the request
      response.error(err);
    } else {
      // If no rooms found, End the request without saving, with a message of "no rooms available"
      if (!result._id) {
        response.body = {message: "No Rooms Available"};
        response.complete();  // completes the request and returns the result to the client 
      } else {
        // If a room was found, add the room to the temp object store, 
        // and add the room ID and name to the request for saving to the bookings collection
        modules.utils.tempObjectStore.set("room", result);
        request.body.room = {id: result._id, name: result.name};
        response.continue();    // continues the request 
      }
    }
  }); 
}