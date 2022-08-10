import React, {useState, useEffect} from 'react'
import {   View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  FlatList,
  TouchableWithoutFeedback, 
  
  Keyboard,
  Alert,} from 'react-native';
import { Button,Card} from "react-native-paper"
import Ionicons from '@expo/vector-icons/Ionicons';
import  {AuthContext}  from '../App'
import { useNavigation } from '@react-navigation/native';
import { MaterialHeaderButtons } from './MyHeaderbutton';
import { Item } from 'react-navigation-header-buttons';
import Comment from './comment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import moment from 'moment';
import { useActionSheet } from '@expo/react-native-action-sheet'; 
 
const Postdetails = (props) => {
  const anonymous = props.route.params.anonymous;
    const data = props.route.params.data;
    console.log(data)
    console.log(data)
    console.log(data)
    console.log(data)
    console.log(data)
    const [{signUp}, state] = React.useContext(AuthContext);
    const groupname = props.route.params.group;
    const [numberofreplies, changenumberofreplies] =React.useState();
    const {id, title} =props.route.params.data;
    const [text, changeText] = React.useState(null);
    const [comment, changeComment] = React.useState([{text:"Comment"}]);
    const { showActionSheetWithOptions } = useActionSheet();

    var posted = moment.utc(data.ctime).local().startOf('seconds').fromNow()

    const save = () =>{
      fetch("http:/192.168.29.189/AddToSaved/",{
        method:"POST",
        headers : {   
            "Content-Type":"application/json"
        },  
        body: JSON.stringify({ postid:id, username:state.username, school:state.school})
    })
    }
    const onPress1 = () =>{
     console.log("hi")
     if(data.username==state.username){
      showActionSheetWithOptions(
        {
          options: ['Cancel', 'Save','Delete', 'Edit'],
          cancelButtonIndex: 0,
          userInterfaceStyle: 'dark',
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            // cancel action
          } else if (buttonIndex === 1) {
            save()
          } else if(buttonIndex===2){
            deletedData(data)
          } else if(buttonIndex===3){
            props.navigation.navigate("Edit",{data:data})
          }
          
        }
      );
     }else{
     showActionSheetWithOptions(
      {
        options: ['Cancel', 'Save'],
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark',
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          save()
        } 
      }
    );}
    }
    React.useLayoutEffect(() => {
      props.navigation.setOptions({
        // use MaterialHeaderButtons with consistent styling across your app
        headerRight: () => ( 
          <MaterialHeaderButtons>
            <Item title="..." onPress={() => onPress1()} />
            <Item title="profile" onPress={() => props.navigation.navigate("Profile")} />
          </MaterialHeaderButtons>
        ),
      });
    }, [props.navigation]);
    useEffect(()=>{
      console.log(data)
      console.log(data)
      fetch(`http:/192.168.29.189/comment/${data.id}/`,{
        method:"GET"
      })
      .then(resp => resp.json())
      .then(data => {
        changeComment(data)
       
      })    

    },[])
  
    const deletedData = (data) => {
      fetch(`http:/192.168.29.189/snippets/${data.id}/`,{
        method:"DELETE",
        headers: { 
          "Content-type":"application/json"
        }
      })
      .then(
        data =>{

          state.delete = true
          props.navigation.navigate("Home")
          
        }
      )
    
    }
    const loadData = () =>{
      fetch(`http:/192.168.29.189/comment/${data.id}/`,{
        method:"GET"
      })
      .then(resp => resp.json())
      .then(data => {
        changeComment(data)
       
      })    

   }
    const addComment = () =>{
      if(text==""){
        Alert.alert("You Can't create a blank comment")
      }
      fetch("http:/192.168.29.189/comment/",{
          method:"POST",
          headers : {   
              "Content-Type":"application/json"
          },  
          body: JSON.stringify({text:text, postid:id, username:state.username, school:state.school})
      })
      .then(resp => resp.json())
      .then(()=>{changeText("")})
      .then(()=>{loadData()});

      data.numberofcomments = data.numberofcomments + 1
     
      
   }
   const renderdata = (item) =>{
    console.log("bruh")
    console.log(data.id)
    console.log(item.id)
    return (  
    <View style={{ flex: 1}}>
    <Comment postid = {data.id} id = {item.id} username={item.username} replies={item.data} text={item.text} changeComment={changeComment}/>
    </View>
    )}

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
   
        <View style={styles.inner}>
        <Card style={{margin:15}}>
       {anonymous == true ?
          null : <Text onPress={()=>{props.navigation.navigate('Seeprofile  ',{username:data.username})}}>{data.username}</Text>}
        
        <View style={{flexDirection:"row"}}>
        <Text style = {{fontSize:25}}>
        
           
          {data.title}
          
          
        </Text>
        
        </View>
        <View>
        <Text onPress={()=>{save()}}>Save</Text>
        <Text>{posted}</Text>
        </View>
       </Card>
       
        <View style={{borderTopWidth: 1, borderBottomWidth:1, borderColor:'grey', backgroundColor:"#D5D5D5"}}>
        <Text style={{fontSize:20,  
          borderColor: 'black'}}>
      {data.numberofcomments} Replies
    </Text>
    </View>
       <View style={styles.flatListWrapper}>
       
      <Card>
      <FlatList
      data = {comment}
      renderItem={({item})=>{
        return renderdata(item)
      }}
      keyExtractor={item => `${item.id}`}
      style={{flex:1,minHeight:400}}
      
      />
      </Card>
      </View>
      <Card>
       <View style = {styles.commentStyle}>
   
      <TextInput 
        style={styles.input}
        onChangeText={(text) => {
          changeText(text)
        }}
        value={text}
        placeholder="Enter comment here"
        multiline
        numberOfLines={4}
        maxLength={140}
      />
      <Button icon = "comment" 
          style = {styles.inputStyle}
          mode = "contained" 
          onPress={() => addComment()}
           >Comment</Button>
     
    </View>
    </Card>
        </View>
        <View style = {styles.commentStyle}>
    
           
    </View>
 
    </KeyboardAvoidingView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
 
  },
  inner: {
    padding: 2,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
    borderWidth: 1,
  margin: 12,
  borderWidth: 1,
  padding: 10,
  flex:3,
  marginBottom:50
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
  detailStyle: {
    margin:10,
    padding:10,

},
flatListWrapper: {
  flex: 1,
  flexGrow: 1,
  marginBottom:30,
},
input: {
  height: 40,
  margin: 12,
  borderWidth: 1,
  padding: 10,
  flex:3,
  marginBottom:86
},
commentStyle:{
flexDirection:"row"
},
inputStyle:{
height: 40,
marginTop:12,
flex:1
},
cardStyle:{
margin:10,
padding:10
}
});

export default Postdetails;