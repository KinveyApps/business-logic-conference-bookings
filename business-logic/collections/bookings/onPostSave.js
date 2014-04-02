function onPostSave(request, response, modules) {
  var savedEntity = response.body;

  // Get the room building from the tempObjectStore
  var building = modules.utils.tempObjectStore.get("room").building;

  // set the response body to specific attributes of the saved entity
  response.body = {
    "_id": savedEntity._id,
    "room": savedEntity.room.name, 
    "bookedUntil": savedEntity.bookUntil,
    "building": building
  };
  response.complete(200);   
}