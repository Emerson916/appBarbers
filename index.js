/**
 * @format
 */
// react-native-gesture-handler é responsavel pelos gestos do app
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
