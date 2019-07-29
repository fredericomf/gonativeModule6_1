import '~/config/ReactotronConfig';
import '~/config/StatusBarConfig';

import React from 'react';
import { Provider } from 'react-redux';

import Player from '~/components/Player';

import Routes from '~/routes';
import store from '~/store';

const App = () => (
  <Provider store={store}>
    <Routes />
    <Player />
  </Provider>
);

export default App;
