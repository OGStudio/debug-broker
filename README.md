
# Overview

debug-broker

* was created to simplify debugging of cross-platform applications that run on desktop, mobile, and web
* is a mediator between debugged application and debug UI
* is a Node.js server
* should be hosted on a dedicated server

# Debug protocol

Since `debug-broker` is a mediator between application and debug UI, both
application and debug UI should exchange messages using the same protocol.

Here's how sample application side JSON looks like:

```
{
  "title": "Ex03",
  "pages": [
    {
      "title": "camera",
      "items": [
        {
          "title": "BGColor",
          "value": "51,51,102",
          "isWritable": 1
        },
        {
          "title": "Position/Rotation",
          "value": "0.000000,-6.883219,0.000000/90.000000,0.000000,-0.000000",
          "isWritable": 0
        }
      ]
    }
  ]
}

```

An application may host on or more so-called debuggers. Debugger is a
container of so-called debug pages.

In this case, we have:

* single debugger titled `Ex03`.
* single debug page titled `camera`.

Debug pages contain items to debug.

In this case, `camera` items are:

* `BGColor`
    * with a value of `51,51,102`
    * the value is allowed to be altered by UI
* `Position/Rotation`
    * with a value of `0.000000,-6.883219,0.000000/90.000000,0.000000,-0.000000`
    * the value is read-only



# Debug UI

TODO link to debug ui

# App sample

TODO link to Ex03
