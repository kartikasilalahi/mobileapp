import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducers from './src/redux/reducers'
import AppInit from './AppInit'
import OneSignal from 'react-native-onesignal'; // Import package from node modules

export default class App extends Component {

  constructor(properties) {
    super(properties);
    OneSignal.init("158cee86-e10d-43cb-b06b-e04b52976262", { kOSSettingsKeyAutoPrompt: true });// set kOSSettingsKeyAutoPrompt to false prompting manually on iOS

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  render() {
    console.disableYellowBox = true
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(reduxThunk))}>
        <AppInit />
      </Provider>
    );
  }
}