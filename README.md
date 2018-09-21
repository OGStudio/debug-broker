# Table of contents

* [Overview](#overview)
* [Debug protocol](#protocol)
    * [Application side](#app-side)
    * [Debug UI side](#ui-side)
* [Internal logic](#logic)
    * [Value prioritization](#values)
    * [HTTP requests](#requests)
* [Installation](#installation)
    * [Localhost](#localhost)
    * [Heroku](#heroku)
* [Installation verification](#verification)
* [Debug UI](#debug-ui)
* [Sample application](#application)

<a name="overview"/>

# Overview

debug-broker

* was created to simplify debugging of cross-platform applications that run on desktop, mobile, and web
* is a mediator between debugged application and debug UI
* is a [Node.js][nodejs] server
* should be hosted on a dedicated server

<a name="protocol"/>

# Debug protocol

Since `debug-broker` is a mediator between application and debug UI, both
application and debug UI should exchange messages using the same protocol.

<a name="app-side"/>

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

<a name="ui-side"/>

## Debug UI side

Debug UI either queries debug page items, or alters debug page item(s).

Here's how debug UI query JSON looks like:

```
{
  "title": "Ex03"
}
```

Here's how debug UI alteration JSON looks like:

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

<a name="logic"/>

# Internal logic

<a name="values"/>

## Value prioritization

We have both application and debug UI sending values to `debug-broker`. Which
value does `debug-broker` prefer? `debug-broker` accepts complete new items
from Application, and values from UI.

<a name="requests"/>

## HTTP requests

`debug-broker` only accepts POST requests with a body as JSON listed above.
`7999` port is used by default.

If sent message contains `isWritable` property, such message is considered to
originate from application. Otherwise, from debug UI.

Once message has been received and processed, `debug-broker` returns
message containing values that are now valid.

<a name="installation"/>

# Installation

[Node.js][nodejs] is the only dependency of `debug-broker`. So you only need to have
Node.js to run `debug-broker`.

<a name="localhost"/>

## Localhost

To start `debub-broker`, run the following command:

```
$ node index.js
```
```
Server listening at port 7999
```

**Notes**:

* localhost is usually unreachable by Android emulators and iOS devices
* we recommend to host `debub-broker` at a machine available to all your devices

<a name="heroku"/>

## Heroku

[Heroku][heroku] provides free hosting for Node.js apps. If you host
`debug-broker` there, you can access `debug-broker` from virtually anywhere.

**Warning**: `debug-broker` has no authentication, so anyone would be able to
access your `debug-broker` instance.

**Note**: read [Getting started with Node.js][heroku-nodejs-bootstrap] guide to understand how to deploy Node.js applications to Heroku.

Here's a brief information on how to host `debug-broker` at Heroku:

* go to `debug-broker` directory

    ```
    $ cd /path/to/debug-broker
    ```

* create Heroku application

    ```
    $ heroku create app-name
    ```
    ```
    Creating ⬢ app-name... done
    https://app-name.herokuapp.com/ | https://git.heroku.com/app-name.git
    ```

* deploy `debub-broker` application:

    ```
    $ git push heroku master
    ```

<a name="verification"/>

# Installation verification

Run the following command:

```
$ curl <debug-broker-http(s)-address>
```

You should get `DebugBroker` as a response to GET request.

<a name="debug-ui" />

# Debug UI

Debug UI implemented as an HTML page is available [here][debug-ui].

<a name="application" />

# Sample application

Sample application that you can alter using this debug UI is available [here][ex03].

[nodejs]: https://nodejs.org
[heroku]: https://www.heroku.com
[heroku-nodejs-bootstrap]: https://devcenter.heroku.com/articles/getting-started-with-nodejs
[debug-ui]: https://github.com/OGStudio/debug-ui
[ex03]: https://github.com/OGStudio/openscenegraph-cross-platform-examples/tree/master/03.RemoteDebugging
