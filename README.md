
# Overview

debug-broker

* was created to simplify debugging of cross-platform applications that run on desktop, mobile, and web
* is a mediator between debugged application and debug UI
* is a Node.js server
* should be hosted on a dedicated server

# Debug protocol

Since `debug-broker` is a mediator between application and debug UI, both
application and debug UI should exchange messages using the same protocol.

## Application side

Application publishes available debug information for `debug-broker` to
control. Here's how sample application side JSON looks like:

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

Applications may host one or more so-called debuggers. Debugger is a
container of so-called debug pages.

In this case, we have:

* single debugger named `Ex03`.
* single debug page named `camera`.

Debug pages contain items to debug.

In this case, `camera` items are:

* `BGColor`
    * with a value of `51,51,102`
    * the value is read-write
* `Position/Rotation`
    * with a value of `0.000000,-6.883219,0.000000/90.000000,0.000000,-0.000000`
    * the value is read-only

## Debug UI side

Debug UI either queries debug page items, or alters debug page item(s).

Here's how Debug UI query JSON looks like:

```
{
  "title": "Ex03"
}
```

Here's how Debug UI alteration JSON looks like:

```
{
  "title": "Ex03",
  "pages": [
    {
      "title": "camera",
      "items": [
        {
          "title": "BGColor",
          "value": "0,0,0"
        }
      ]
    }
  ]
}
```

# debug-broker processing

## Value prioritization

We have both application and debug UI sending values to `debug-broker`. Which
value does `debug-broker` prefer? `debug-broker` prefers the latest (by date)
value that is different from the one `debug-broker` currently keeps.

For example:

* when application is constantly publishing new values of an item, `debug-broker` prefers new values
* when application only publishes initial value once, debug UI gets a chance to send new values that are preferred by `debug-broker`

## HTTP requests

`debug-broker` only accepts POST requests with a body as JSON listed above.

If sent message contains `isWritable` property, such message is considered to
originate from application. Otherwise, from debug UI.

Once message has been received and processed, `debug-broker` returns
message containing values that are now valid.

# Installation

Localhost?

Heroku?

# Debug UI

TODO link to debug ui

# App sample

TODO link to Ex03
