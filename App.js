import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput,Alert, ImageBackground } from 'react-native';
import Home from "./Screens/Home";
import New from "./Screens/New";
import { Button} from 'react-native-paper';
import Bio from './Screens/Bio';
import Postdetail from './Screens/Postdetails';
import Commentdetail from './Screens/commentdetail';
import Comment from './Screens/comment';
import SelectSchool from './Screens/SelectSchool';
import Edit from './Screens/Edit';
import VerifySchool from './Screens/VerifySchools';
import GroupDetails from './Screens/GroupDetails';
import Newgrouppost from './Screens/Newgrouppost';
import Vent from './Screens/Vent';
import Profile from './Screens/Profile';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import react from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Group from './Screens/Group';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';




export const AuthContext = React.createContext();

const Tab = createBottomTabNavigator();
const localimage = require("./assets/schoolyardbg.png")

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}
 
 




function Register({route}) {
  const email = route.params.email
  const school = route.params.school
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [{signUp}, state] = React.useContext(AuthContext);
  function SignUp1234(){
    if(username == ''){
      Alert.alert('Username is required');
    }
    else if (password== ''){
      Alert.alert('password is required');
    } 
    else{
      signUp({ username, password, email, school})
    }
  }


  return (
    <ImageBackground  source = {localimage} style={{ backgroundColor: '#FFFFFF', height:'100%'}}>
    
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{    
          marginTop: 10,
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,}}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{  
          marginTop: 1,  
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,}} 
      />
      <Button style = {{marginTop:200}}onPress={() => {SignUp1234()}} mode = "contained"> Register </Button>
      </ImageBackground> 
  );
}



const Stack = createStackNavigator();

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);

}



export default function App({ navigation }) {
  
  const [loading,setLoading] = React.useState(true);
   
  
  async function Verify(){    
    const res = await fetch("http:/10.62.2.249/getinfofromtoken/",{
      method:"GET",
      headers:{  
        'Authorization': state.accesstoken,
      },        
    }).then(response => response.json());

 console.log(res)
 console.log(res)
 dispatch({ type: 'SET_USER_DATA', school: res.school, username: res.username });
} 

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            accesstoken: action.accesstoken,
            refreshtoken: action.refreshtoken,
            isLoading: false,
          }; 
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            refreshtoken: action.refreshtoken,
            accesstoken: action.accesstoken
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            accesstoken: null,
            refreshtoken: null,
          };
        case 'SET_USER_DATA':
          return {
            ...prevState,
            username: action.username,
            school: action.school
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      refreshtoken: null,
      accesstoken: null,
      username: null,
      school: null,
    }
  );
   React.useEffect(() => {

    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
       // replenish
       
      try {
        userToken = await SecureStore.getItemAsync('accesstoken');
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
        console.log("error")
      }
      // After restoring token, we may need to validate it in production apps
     
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      if (userToken != null){
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      }
      
    };

    bootstrapAsync();
  }, []);

  
  
  React.useEffect(() => {

    // Fetch the token from storage then navigate to our appropriate plac

    if (state.accesstoken != null){
     Verify()
    }
  }, [state.accesstoken]);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        console.log(data)
        console.log(data)
        console.log(data.password)
        console.log(data.username)
        async function Signuplol(){
         
          return fetch("http:/10.62.2.249/token/",{
            method:"POST", 
            headers:{ 
              'Content-Type':"application/json"
            },
            body: JSON.stringify({'username':data.username,'password':data.password})
            
          }).then(response => response.json());
        }
        const usertokens12 = await Signuplol();
        save("refreshtoken", usertokens12.refresh)
        save("usertoken", usertokens12.access)
          
        dispatch({ type: 'SIGN_IN', refreshtoken: usertokens12.refresh, accesstoken:usertokens12.access });
        
        
        

      },
      signOut: () => {
        dispatch({ type: 'SIGN_OUT' })
        console.log(state.accesstoken)
      },
      signUp: async (data) => {
       async function Signuplol(){
        
        return fetch("http:/10.62.2.249/register/",{
          method:"POST",
          headers:{ 
            'Content-Type':"application/json"
          },
          body: JSON.stringify({'username':data.username,'password':data.password,'email':data.email, "school": data.school})
          
        }).then(response => response.json());
      }
      const usertokens12 = await Signuplol();
      save("refreshtoken", usertokens12.refreshtoken)
      save("usertoken", usertokens12.accesstoken)
        
      dispatch({ type: 'SIGN_IN', refreshtoken: usertokens12.refreshtoken, accesstoken:usertokens12.accesstoken });
      
      },
    }),
    []
  );


  React.useEffect(()=>{
    if(loading){
      updateToken()
     }

    let interval = setInterval(() => {
      if(state.refreshtoken){
        updateToken()
        
      }
    }, 240000)
    return ()=> clearInterval(interval)
  },[state.refreshtoken,loading])


  let updateToken = async ()=> {
    
    let response = await fetch('http://10.62.2.249/token/refresh/', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({'refresh': state.refreshtoken})
    })

    let data = await response.json()
    if (response.status === 200){
     
     dispatch({ type: 'RESTORE_TOKEN', accesstoken: data.access, refreshtoken: data.refresh });
    }else {
      console.log(data)
    }
    if(loading == true){
      setLoading(false)
  }
}

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home1';

  switch (routeName) {
    case 'Home1':
      return 'Home';
    case 'Groups':
      return 'Group';
    
  }
}
function Home1() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home1" component={Home}   options={{...headerstyles,title:"Home"}}/>
      <Tab.Screen name="Groups" component={Group}  options={{...headerstyles,title:"groups "}}  />
      <Tab.Screen name="Vent" component={Vent}  options={{...headerstyles,title:"Vent "}}  />
    </Tab.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="commentdetail" component={Commentdetail} />
    </Stack.Navigator>
  );
}


  return (
    <AuthContext.Provider value={[authContext,state]}>
    <NavigationContainer>
      <Stack.Navigator>
      
         {state.accesstoken == null ? (
          // No token found, user isn't signed in
          <React.Fragment>
          
          <Stack.Screen name="VerifySchool" component = {VerifySchool}
          options = {{...headerstyles,title:"Verify school", headerShown:false}} /> 
          <Stack.Screen name="SignInScreen" component = {SignInScreen}
          options = {{...headerstyles,title:"Sign in"}} /> 
          <Stack.Screen name="SelectSchool" component = {SelectSchool}
          options = {{...headerstyles,title:"Select Your School"}} /> 
          
          <Stack.Screen name="Register" component = {Register}
          options = {{...headerstyles,title:"Register"}} /> 
          
         </React.Fragment>
     
         ) : (
         <React.Fragment>
          <Stack.Screen name="Home" component = {Home1}
          options = {{headerShown:false}}/> 
          <Stack.Screen name="Edit" component = {Edit}
          options = {{...headerstyles,title:"Edit post"}} /> 
          <Stack.Screen name="ProfileSettings" component = {Bio}
          options = {{...headerstyles,title:"Profile Settings"}} /> 
          <Stack.Screen name="commentdetail" component = {Commentdetail} options = {{...headerstyles,title:"Comment detail"}} /> 
          <Stack.Screen name="new" component = {New}
          options = {{...headerstyles,title:"Create New Post"}} /> 
          <Stack.Screen name="detail" component = {Postdetail}
          options = {{...headerstyles,title:"View details"}} />
          <Stack.Screen name="Groupdetails" component = {GroupDetails}
          options = { ({ route }) => ({...headerstyles,title: route.params.name })} />
          <Stack.Screen name="Postingroup" component = {Newgrouppost}
          options = {{...headerstyles,title:"Post in Group"}} />
          <Stack.Screen name="Comment" component = {Comment}
          options = {{...headerstyles,title:"Post in Group"}} />
          <Stack.Screen name="Profile" component = {Profile}
          options = {{...headerstyles,title:"Profile"}} /> 
         </React.Fragment> 
            
        )}
      </Stack.Navigator>
    </NavigationContainer>
  </AuthContext.Provider>
  );
  }
  
  
  
  
  
  const headerstyles = StyleSheet.create({
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    container: {
      flex: 1, 
      backgroundColor: '#eddfdf', 
    },
  });
  function SignInScreen() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [{signIn}, state] = React.useContext(AuthContext);
  
    const [usernamestate, setusernamestate] = React.useState(username)
    function signInlol(){
        if(username == ''){
          Alert.alert('Username is required');
        }
        else if (password== ''){
          Alert.alert('password is required');
        } 
        else{
          signIn({ username, password})
        }
    }
    
    
    return (
      <ImageBackground  source = {localimage} style={{ backgroundColor: '#FFFFFF', height:'100%'}}>
      
        <TextInput 
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={{    
            marginTop: 10,
            height: 40,
            margin: 12,
            borderWidth: 1, 
            padding: 10,}}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{   
            marginTop: 1,  
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,}} 
        />
        <Button style = {{marginTop:200}}onPress={() => signInlol()} mode = "contained"> Sign In </Button>
        </ImageBackground> 
    );
  } 