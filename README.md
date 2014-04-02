# Conference Room Bookings Sample

Kinvey server-side business logic for demonstrating collection hook functionality.  Source code for the tutorial [Using Collection Hooks Effectively](http://devcenter.kinvey.com/tutorials/bl-using-collection-hooks-effectively).  This business logic takes a bookings request (a POST to a __bookings__ collection), and looks for an available room in the __conferencerooms__ collection.  If a room is found, it is added to the request so the room name and _id are saved to the __bookings__ collection.  This sample also makes use of the Business Logic `tempObjectStore` to store the room information between the pre- and post- save hooks, and returns a modified result.

## Setup

### Prerequisits

To use this sample, you first must have:

* [provisioned a Kinvey backend](https://console.kinvey.com)
* Downloaded the [Business Logic CLI](http://devcenter.kinvey.com/bl-cli-downloads) and [configured it for use](http://devcenter.kinvey.com/android/tutorials/bl-using-collection-hooks-effectively).  

### Setup the backend

In the backend, you should add two collections, __bookings__ and __conferencerooms__.  To seed the __conferencerooms__ collection, POST the following entities to the __conferencerooms__ collection (using the API console, cURL, or another HTTP tool):

```
{
    "name": "Conference Room B",
    "building": "Building 2",
    "available": true,
    "lastUsed": 1396011600
}
```

and 

```
{
    "available": true,
    "building": "Building 1",
    "lastUsed": "1396010640",
    "name": "Conference Room A"
}
```

### Deploy the Business Logic

In the root directory of this project, deploy the BL using the kinvey deploy command:

```
kinvey deploy -e <your_kinvey_console_user_name> -p <your_kinvey_console_password> --app <your_app_name> --environment <your_app_environment_name>
```







