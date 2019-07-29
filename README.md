# gonativeModule4

Module 4 of Rocketseat React Native Course

This work environment was prepared using the same tutorial of Module 1 and 2, reproduced below:

## Initial instructions

1. Read and follow the steps described on top level directory.

2. To create a react native new project run:

```bash
$ react-native init [NAME OF PROJECT]
```

### Point of attention

When a native library is linked to project, we must to run, again, "react-native run-android". Otherwise the project runs with: "react-native start"

Generally link library command is like this: "react-native link ..."

### RESETING CACHE

Sometimes, when a red message rose up in device, is necessary to reset our cache running the following command:

```bash
react-native start --reset-cache
```

_NOTICE: This command result a long time to deploy(almost the same of the first time)_

### LIVE RELOAD

To live reload, shake your device and set 'Enable Live Reload'

---

# PLUGINS

## PROP-TYPES

It's used to typed fields and methods

```bash
yarn add prop-types
```

## REACTOTRON FOR REACT NATIVE

Plugin for use with REACTOTRON. It's an inspect tool for React Native.

More informations about this plugin can be found on: https://github.com/infinitered/reactotron/blob/master/docs/quick-start-react-native.md

```bash
yarn add reactotron-react-native
```

This plugin is configured in /src/config/ReactotronConfig.js

Here is an example of Config file:

```javascript
import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";

// STUDY_NOTES: '__DEV__' is an envirionment variable (only disponible on NATIVE)
if (__DEV__) {
  const tron = Reactotron.configure({ host: "192.168.0.30" }) // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .use(reactotronRedux()) // add the reactrotron-redux plugin
    .connect(); // let's connect!

  tron.clear();

  // STUDY_NOTES: The 'console' variable is global, then I can set values on it.
  console.tron = tron;
}
```

If Reactotron don't connect with your development device, configure your machine ip in ReactotronConfig.js like this example:

```javascript
.configure({ host: '10.8.21.208'}) // controls connection & communication settings
```

## ESLINT

```bash
yarn add eslint -D
```

**Steps after install:**

1. Run:

```bash
sudo yarn eslint --init
```

2. Choose option named: 'To check syntax, find problems, and enforce code style'
3. Choose option named: 'Javascript modules (import/export)'
4. Choose option named: 'React'
5. Use space to deselect all selected options (generally are 'Browser' and 'Node')
6. Choose option named: 'Use a popular style guide'
7. Choose option named: 'Airbnb'
8. Choose option named: 'Json'
9. Confirm with 'Y' and wait the installation process
10. Delete package-lock.json from your project
11. Run yarn on your project
    NOTE: If you get a permission error to write on node_modules directory use:

```bash
sudo chown -R $USER [Path to your node_modules]
```

12. Install babel-eslint

```bash
yarn add babel-eslint -D
```

13. On VSCode press CTRL+SHIFT+P then write 'json' to Open Settings. The following statements must be present, if not set it:

```javascript
"editor.formatOnSave": true,
"prettier.eslintIntegration": true,
```

15. Configure .eslintrc.json like this:

```javascript
{
  "parser": "babel-eslint",
  "env": {
    "es6": true
  },
  "extends": "airbnb",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": ["react"],
  "rules": {
    "react/jsx-filename-extension": [
      "error",
      { "extensions": [".js", ".jsx"] }
    ],
    "import/prefer-default-export": "off"
  }
}
```

## REACT-DEVTOOLS

A tool to inspect code on React and React Native

```bash
yarn add react-devtools --dev
```

Add the following script to package.json:

```javascript
"react-devtool": "react-devtools"
```

Run the command (must be 'react-native run-android' running):

```bash
yarn run react-devtool
```

STUDY_NOTES: If devtools is waiting for connection and nothings happen, try to run this command. Then try restart 'react-native run-android':

```bash
adb reverse tcp:8097 tcp:8097
```

See configuration file to more details: **DevToolsConfig.js**

## BABEL-PLUGIN-ROOT-IMPORT

This plugin help us to work easily with imports

```bash
yarn add babel-plugin-root-import -D
```

Set the .babelrc to:

```javascript
{
  "presets": ["module:metro-react-native-babel-preset"],
  "plugins": [
    [
      "babel-plugin-root-import",
      {
        "rootPathSuffix": "src"
      }
    ]
  ],
  "env": {
    "production": {
      "plugins": [
        [
          "babel-plugin-root-import",
          {
            "rootPathSuffix": "src"
          }
        ]
      ]
    }
  }
}
```

STUDY_NOTES: This plugin let me able to use '~/path-to-implementation' than '../../../path/path2/etc...'. An example can be found at '/src/index.js'.

To resolve error warning of eslint (on using root plugin):

```bash
yarn add eslint-plugin-import eslint-import-resolver-babel-plugin-root-import -D
```

After installed this plugin, add "settings" node at '.eslintrc.json':

```javascript
  "settings": {
    "import/resolver":{
      "babel-plugin-root-import":{}
    }
  }
```

To use auto-complete paths on project using babel-root-import.

1. Create the file '/jsconfig.json'
2. Write the following content:

```javascript
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"]
    }
  }
}
```

## REACT-NAVIGATION

This package is used to manage routes in React Native

Installing:

```bash
yarn add react-navigation react-native-gesture-handler
```

STUDY_NOTE: Note that has one more package being installed with react-navigation, this package will be used to manage the gestures from user's fingers.

After installed react-native-gesture-handler, is necessary to install it natively:

```bash
react-native link react-native-gesture-handler
```

Now, is necessary to edit MainActivity.java file, of Android package, to complete the plugin installation:

- Add this imports:

```java
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
```

- Now, add following function:

```java
@Override
protected ReactActivityDelegate createReactActivityDelegate() {
  return new ReactActivityDelegate(this, getMainComponentName()) {
    @Override
    protected ReactRootView createRootView() {
     return new RNGestureHandlerEnabledRootView(MainActivity.this);
    }
  };
}
```

More informations: https://kmagiera.github.io/react-native-gesture-handler/docs/getting-started.html

IMPORTANT: Linking a package is necessary run 'react-native run-android' even 'react-native start'. This allows native packages to be visible to our app.

STUDY_NOTE: If any error message rose up in android try to run: 'react-native start --reset-cache

## AXIOS

Plugin to manage requests

```bash
yarn add axios
```

STUDY_NOTE: An example of use can be found in ~/services/api.js

## REACT NATIVE STATUS BAR HEIGHT

It's a plugin used to define the sistema statusbar height

```bash
yarn add react-native-status-bar-height
```

## REACT NATIVE VECTOR ICONS

This is the best way to work with icons in React Native.

```bash
yarn add react-native-vector-icons
```

It's some dependencies that we must to link natively, then:

```bash
react-native link react-native-vector-icons
```

After:

```bash
react-native run-android
```

## REDUX and REACT-REDUX

Plugin to control state between components

```bash
yarn add redux react-redux
```

## REACTOTRON-REDUX

Plugin to catch Redux actions with reactotron

```bash
yarn add reactotron-redux
```

Now, we'll to edit ReactotronConfig.js and set the reactotron-redux plugin.
This is the final version of file:

```javascript
import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";

// STUDY_NOTES: '__DEV__' is an envirionment variable (only disponible on NATIVE)
if (__DEV__) {
  const tron = Reactotron.configure({ host: "10.8.21.208" }) // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .use(reactotronRedux()) // add the reactrotron-redux plugin
    .connect(); // let's connect!

  // STUDY_NOTES: The 'console' variable is global, then I can set values on it.
  console.tron = tron;

  tron.clear();
}
```

## STYLED-COMPONENTS

Used for stylization of components, for mobile or web:

```bash
yarn add styled-components
```

NOTE: An advantage is to use the same css syntax from Web into React-Native.

## REDUX-SAGA

Plugin used to easily manage async calls.

```bash
yarn add redux-saga
```

## REDUX-SAGA REACTOTRON

Plugin used to catch and inspect saga requests treatment

```bash
yarn add reactotron-redux-saga
```

Edit ReactotronConfig.js:

```javascript
import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";
import reactotronSaga from "reactotron-redux-saga";

// STUDY_NOTES: '__DEV__' is an envirionment variable (only disponible on NATIVE)
if (__DEV__) {
  const tron = Reactotron.configure({ host: "192.168.0.30" }) // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .use(reactotronRedux()) // add the reactrotron-redux plugin
    .use(reactotronSaga)
    .connect(); // let's connect!

  tron.clear();

  // STUDY_NOTES: The 'console' variable is global, then I can set values on it.
  console.tron = tron;
}
```

Edit store/index.js:

```javascript
import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import combinedReducers from "./reducers";
import rootSaga from "./sagas";

const middlewares = [];

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

middlewares.push(sagaMiddleware);

const composer = __DEV__
  ? compose(
      applyMiddleware(...middlewares),
      console.tron.createEnhancer()
    )
  : applyMiddleware(...middlewares);

const store = createStore(combinedReducers, composer);

sagaMiddleware.run(rootSaga);

export default store;
```

## IPHONE X HELPER

Used to return the statusbar dimensions

```bash
yarn add react-native-iphone-x-helper
```

## JSON SERVER

Must be globally installed

```bash
yarn add global json-server
```

or

```bash
sudo npm install -g json-server
```

The JSON used from this server is /server.json

How to run:

```bash
json-server server.json
```

If you get a "Cannot reach page" erro, then try this:

```bash
json-server --host YOUR_MACHINE_IP server.json
```

More informations about this issue: https://stackoverflow.com/questions/51026532/json-server-cannot-access-via-local-ip

## REDUXSAUCE SEAMLESS-IMMUTABLE

Reduxsauce implements some tools to make easy the development of ducks (that contains Reducers and Actions at same time)
**You can see a example use in /src/store/ducks/podcasts.js**

```bash
yarn add reduxsauce seamless-immutable
```

## REACT NATIVE VECTOR ICONS

```bash
yarn add react-native-vector-icons
```

after

```bash
react-native link react-native-vector-icons
```
## REACT NATIVE TRACK PLAYER

```bash
yarn add react-native-track-player
```
after

```bash
react-native link react-native-track-player
```

STUDY_NOTE: If you get an error while compiling the project, read about Breaking Changes of this library:https://github.com/react-native-kit/react-native-track-player/releases/tag/v1.2.0 
Is possible to revert version of the library to an older version to try to compile again.
