/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import Login from './src/Components/Authentication/Login';
import SignUp from './src/Components/Authentication/SignUp';
import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  ActivityIndicator, 
  Image,
  Dimensions
} from 'react-native';
import { AuthContext } from './src/context';
import DrawerNavigator from './src/Navigations/DrawerNavigator';

import HeaderBackground from './src/Components/Common/imgs/header-background.png'
const Stack = createStackNavigator();

const App: () => React$Node = () => {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
        userToken=null;
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        var token='dummy-auth-token';
        try {
          await AsyncStorage.setItem('userToken', token)
        } catch (e) {
          // saving error
          console.log(e);
        }

        dispatch({ type: 'SIGN_IN', token: token });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          // saving error
          console.log(e);
        }
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        var token='dummy-auth-token';
        try {
          await AsyncStorage.setItem('userToken', token)
        } catch (e) {
          // saving error
          console.log(e);
        }

        dispatch({ type: 'SIGN_IN', token: {token} });
      },
    }),
    []
  );

  if( state.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.userToken == null ? (
          <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
            <Stack.Screen name="SignUp" component={SignUp} 
                options={{
                  headerTitle: props => <Image resizeMode='cover'
                  style={{ width:Dimensions.get('screen').width, height: 70}} source={HeaderBackground}/>,
                  headerStyle: {
                    height: 70, // Specify the height of your custom header
                  },
                  headerTintColor: '#000'
                }}
            />
          </Stack.Navigator>
        ) : (
          <DrawerNavigator />
        )}
    </NavigationContainer>
    </AuthContext.Provider>
    
  )
};

export default App;
