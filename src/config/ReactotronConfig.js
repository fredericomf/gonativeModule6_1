import Reactotron from 'reactotron-react-native';
import { reactotronRedux as reduxPlugin } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

// STUDY_NOTES: '__DEV__' is an envirionment variable (only disponible on NATIVE)
if (__DEV__) {
  const tron = Reactotron.configure() // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .use(reduxPlugin()) // add the reactrotron-redux plugin
    .use(sagaPlugin())
    .connect(); // let's connect!

  tron.clear();

  // STUDY_NOTES: The 'console' variable is global, then I can set values on it.
  console.tron = tron;
}
