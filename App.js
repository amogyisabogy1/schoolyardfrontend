import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput,Alert, ImageBackground, Image, TouchableOpacity } from 'react-native';
import Home from "./Screens/Home";
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import New from "./Screens/New"; 
import { Button} from 'react-native-paper';
import Bio from './Screens/Bio';
import Postdetail from './Screens/Postdetails';
import Age from './Screens/Age';
import Commentdetail from './Screens/commentdetail';
import Comment from './Screens/comment';
import SelectSchool from './Screens/SelectSchool';
import SeeProfile from './Screens/Seeprofile';
import Report from './Screens/Report';
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
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
  



export const AuthContext = React.createContext();


const Tab = createBottomTabNavigator();
const localimage = require("./assets/Verify.png")

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}
 
 




function Register({route}) {
  const email = route.params.email
  console.log(email)
  console.log(email)
  console.log(email)  
  const school = route.params.school
  const birth = route.params.birth
  console.log(school)
  console.log(school) 
  length = school.length 
  const localimage1 = require("./assets/schoolyard.png") 
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
      signUp({ username, password, email, school, birth})
    }
  } 


  return (
    <ImageBackground  source = {localimage}  style={{ backgroundColor: '#FFFFFF', height:'100%'}} >
      <Image style={{marginTop:50,marginLeft:50}}source={localimage1}/>
      <TextInput
        maxLength={500}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor = "black"
        style={{    
          height: 50,   
    margin: 12,
    borderWidth: 1,
    
    padding: 10,
    borderColor:"black", 
    borderRadius:10}}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor = "black" 
        
        secureTextEntry
        style={{  
          
          height: 50,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderColor:"black",  
      borderRadius:10}} 
      />



      <TouchableOpacity 
        style={{alignItems: "center",
    backgroundColor: "#5780FA",
    borderRadius:10,
    padding: 10,
    height:52, margin:10}}
        onPress={()=> {SignUp1234()}}
      >
        <Text style={{marginTop:8, color:"white"}}>Sign Up</Text>
      </TouchableOpacity>

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
    const res = await fetch("http:/192.168.86.141/getinfofromtoken/",{
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
         
          return fetch("http:/192.168.86.141/token/",{
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
        
        return fetch("http:/192.168.86.141/register/",{
          method:"POST",
          headers:{ 
            'Content-Type':"application/json"
          },
          body: JSON.stringify({'username':data.username,'password':data.password,'email':data.email, "school": data.school, "birth": data.birth})
          
        }).then(response => response.json());
      }
      const usertokens12 = await Signuplol();
      save("refreshtoken", usertokens12.refreshtoken)
      save("usertoken", usertokens12.accesstoken)
        
      dispatch({ type: 'SIGN_IN', refreshtoken: usertokens12.refreshtoken, accesstoken:usertokens12.accesstoken });
      console.log(state.refreshtoken)
      updateToken()
      console.log(state.refreshtoken)
      },
    }),
    []
  );


  React.useEffect(()=>{
    if(loading){
      updateToken()
     }

    let interval = setInterval(() => {
      if(state.refreshtoken != null){
        console.log(state.refreshtoken)
        updateToken()
        
      }
    }, 240000)
    return ()=> clearInterval(interval)
  },[state.refreshtoken,loading])


  let updateToken = async ()=> {
    console.log("hi")
    console.log(state)
    console.log(state)
    console.log(state.accesstoken)
    console.log(state.refreshtoken)
    console.log(state.refreshtoken)
    console.log(state.refreshtoken)
    console.log(state.refreshtoken)
    console.log(state.refreshtoken)
    console.log("hi")
    
    let response = await fetch('http://192.168.86.141/token/refresh/', {
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
      <Tab.Screen name="Home1" component={Home}   options={(route)=>({...headerstyles,title:state.school?state.school:"Home", color:"white",  tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Groups') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name="home" size={30} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          headerTitleStyle: {
            color: 'white'
          }
        })
        }/>
      <Tab.Screen name="Groups" component={Group}   options={(route)=>({...headerstyles,title:"groups ", tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Groups') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Vent') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Icon name="group" size={30} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}  />
       <Tab.Screen name="Vent" component={Vent}  options= {(route)=>({...headerstyles,title:"Vent ",tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Groups') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name="chatbubble-ellipses-outline" size={30} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}  />
    </Tab.Navigator>
  );
}



function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Prof" options={{headerShown:false}} component={Profile} />
      <Stack.Screen name="commentdetail" component={Commentdetail} />
    </Stack.Navigator>
  );
}


  return (
    <ActionSheetProvider>
    <AuthContext.Provider value={[authContext,state]}>
    <NavigationContainer>
      <Stack.Navigator>
      
         {state.accesstoken == null ? (
          // No token found, user isn't signed in
          <React.Fragment>
           
          <Stack.Screen name="VerifySchool" component = {VerifySchool}
          options = {{...headerstyles,title:"Verify school", headerShown:false}} /> 
         <Stack.Screen name="Age" component = {Age}
          options = {{...headerstyles,title:"Age"}} />  
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
          <Stack.Screen name="report" component = {Report}
          options = {{...headerstyles,title:"Report Post"}}/> 
          <Stack.Screen name="Seeprofile" component = {SeeProfile}
          options = {{...headerstyles,title:"Profile"}} /> 
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
          <Stack.Screen name="Profile" component = {MyStack}
          options = {{...headerstyles,title:"Profile"}} /> 
         </React.Fragment> 
            
        )}
      </Stack.Navigator>
    </NavigationContainer> 
  </AuthContext.Provider>
  </ActionSheetProvider>
  );
  }
  
  
  
  
  
  const headerstyles = StyleSheet.create({
    headerStyle: {
      
      backgroundColor: 'blue',
    },
    
    container: {
      flex: 1, 
      backgroundColor: '#eddfdf', 
    },
  });
  function SignInScreen() {
    
  const localimage1 = require("./assets/schoolyard.png") 
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [{signIn}, state] = React.useContext(AuthContext);
  function SignUp1234(){ 
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
    <ImageBackground  source = {localimage}  style={{ backgroundColor: '#FFFFFF', height:'100%'}} >
      <Image style={{marginTop:50,marginLeft:50}}source={localimage1}/>
      <TextInput
        maxLength={500}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor = "black"
        style={{    
          height: 50,   
    margin: 12,
    borderWidth: 1,
    
    padding: 10,
    borderColor:"black", 
    borderRadius:10}}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor = "black" 
        
        secureTextEntry
        style={{  
          
          height: 50,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderColor:"black",  
      borderRadius:10}} 
      />



      <TouchableOpacity 
        style={{alignItems: "center",
    backgroundColor: "#5780FA",
    borderRadius:10,
    padding: 10,
    height:52, margin:10}}
        onPress={()=> {SignUp1234()}}
      >
        <Text style={{marginTop:8, color:"white"}}>Log In</Text>
      </TouchableOpacity>

      </ImageBackground> 
  );
}

    
  