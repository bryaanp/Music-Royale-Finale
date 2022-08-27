import 'react-native-gesture-handler';
// npm install @react-navigation/bottom-tabs
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, SignupScreen, MainScreen, LobbyScreen, ProfileScreen, FriendScreen, NomineeScreen, SearchScreen, ViewDetailsScreen, GeneratePromptScreen, CreateLobby, FindLobby, ViewLobby, Legacy, SearchProfile, ForgotPasswordScreen, MP3PlayerScreen} from './screens'
import { firebase } from './firebase'
import {decode, encode} from 'base-64'
import { Button } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {View, LogBox} from 'react-native'
import QuizApp from './src/QuizApp';
import PlayQuiz from './src/components/PlayQuiz';
import Result from './src/components/Result';


if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setUser(userData)
            setLoading(false)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {LogBox.ignoreAllLogs()}
      <Stack.Navigator initialRouteName={user ? 'Main Menu' : 'Login'}>
        { user ?  (
            <>
             <Stack.Screen name="Main Menu" options={{
               headerRight: () => (
                 <View styles={{flexdirection:'row'}}>
                    <Button
                      onPress ={() => {
                        firebase.auth()
                        .signOut()
                        .then(setUser(null))
                      }}
                      title='Logout'
                      color='blue'
                      >
                        Logout {""}
                        <MaterialIcons name="logout" color='blue'  size={14} backgroundColor="blue" style={{}}/>
                    </Button>
                    
                 </View>
               ),
             }}>
              {props => <MainScreen {...props} extraData={user}/>}
             </Stack.Screen>
             </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={SignupScreen} />
          </>
        )}
        <Stack.Screen name="HomeScreen">
          {props => <HomeScreen {...props} extraData={user}/>}
        </Stack.Screen>
        <Stack.Screen name='Lobby'>
          {props => <LobbyScreen {...props} extraData={user}/>}
        </Stack.Screen>

        <Stack.Screen name='Profile'>
        {props => <ProfileScreen {...props} extraData={user}/>}
        </Stack.Screen>

        <Stack.Screen name='FriendList' >
        {props => <FriendScreen {...props} extraData={user} />}
        </Stack.Screen>

        <Stack.Screen name='Nominee' >
        {props => <NomineeScreen {...props} extraData={user} />}
        </Stack.Screen>

        <Stack.Screen name='Details' >
        {props => <ViewDetailsScreen {...props} extraData={user} />}
        </Stack.Screen>

        <Stack.Screen name='Customize Prompt' >
        {props => <GeneratePromptScreen {...props} extraData={user} />}
        </Stack.Screen>

        <Stack.Screen name='ForgotPassword' >
        {props => <ForgotPasswordScreen {...props} extraData={user} />}
        </Stack.Screen>

        <Stack.Screen name='Search' >
        {props => <SearchScreen {...props} extraData={user} />}
        </Stack.Screen>
          
        <Stack.Screen name='Find Lobby' >
        {props => <FindLobby {...props} extraData={user} />}
        </Stack.Screen>

        <Stack.Screen name='Create Lobby' >
        {props => <CreateLobby {...props} extraData={user} />}
        </Stack.Screen>

        <Stack.Screen name='View Lobby' >
        {props => <ViewLobby {...props} extraData={user} />}
        </Stack.Screen>

        <Stack.Screen name='Lobby chat' >
        {props => <Legacy {...props} extraData={user} />}
        </Stack.Screen>
          
        <Stack.Screen name='SearchProfile'>
        {props => <SearchProfile {...props} extraData={user}/>}
        </Stack.Screen>

        <Stack.Screen name='MP3'>
        {props => <MP3PlayerScreen {...props} extraData={user}/>}
        </Stack.Screen>

        <Stack.Screen name='Quiz'>
        {props => <QuizApp {...props} extraData={user}/>}
        </Stack.Screen>

        <Stack.Screen name='PlayQuiz'>
        {props => <PlayQuiz {...props} extraData={user}/>}
        </Stack.Screen>

        <Stack.Screen name='Result'>
        {props => <Result {...props} extraData={user}/>}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
  
}
