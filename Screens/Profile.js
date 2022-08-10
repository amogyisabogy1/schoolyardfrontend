
import react from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, FlatList, Alert, Modal, Pressable, TouchableOpacity, TextInput} from 'react-native';
import {Card, Title, FAB,Button} from "react-native-paper"; 
import postdetails from './Postdetails';
import * as SecureStore from 'expo-secure-store';
import  {AuthContext}  from '../App'
import { useNavigation } from '@react-navigation/native';
import { MaterialHeaderButtons } from './MyHeaderbutton';
import { Item } from 'react-navigation-header-buttons';
import { useIsFocused } from '@react-navigation/native'
import { useActionSheet } from '@expo/react-native-action-sheet';



function Profile(props) {
  const isFocused = useIsFocused()
  const [modalVisible, setModalVisible] = useState(false);
  const [Join, setJoinDate] = useState("")
  const [postcolor, setpostcolor] = useState("")
  const [commentcolor, setcommentcolor] = useState("")
  const [savedcolor, setsavedcolor] = useState("")
  const [text, onChangeText] = React.useState("");
  const [posts,setPosts] = useState("")
  const [loading,setLoading] = useState(true)
  const [{signOut}, state] = React.useContext(AuthContext);
  const [comment, setComment] = React.useState("")
  const [poststate,setpoststate] = React.useState(true)
  const [commentstate,setcommentstate] = React.useState("")
  const [savedstate,setsavedstate] = React.useState("")
  const [saved,setsaved] = React.useState("")
  const [bio,setBio] = React.useState("")
  const { showActionSheetWithOptions } = useActionSheet();
  const onPress = () =>
    showActionSheetWithOptions(
      {
        options: ['Cancel', 'Generate number', 'Reset'],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark',
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          setResult(Math.floor(Math.random() * 100) + 1);
        } else if (buttonIndex === 2) {
          setResult('🔮');
        }
      }
    );


    React.useLayoutEffect(() => {
      props.navigation.setOptions({
        // use MaterialHeaderButtons with consistent styling across your app
        headerRight: () => ( 
          <MaterialHeaderButtons>
            <Item title="..." onPress={() => onPress()} />
            <Item title="profile" onPress={() => props.navigation.navigate("detail")} />
          </MaterialHeaderButtons>
        ),
      });
    }, [props.navigation]);

  
  const loadData = () => {
    
    fetch(`http:/192.168.29.189/profile/`,{
      method:"POST",
          headers : { 
            "Content-Type":"application/json",
        }, 
        body: JSON.stringify({ username:state.username, school:state.school})
  })
  .then(resp => resp.json())
  .then(data =>{
      console.log(data.users)
      user = data.users
      console.log(user[1])
      setJoinDate(data.users)
      setPosts(data.posts)
      console.log(data.posts)
      setComment(data.comments)
      setBio(data.users.bio)
      setLoading(false)
   })
  

}
  const insertData = () =>{
      
      setModalVisible(!modalVisible)
      fetch(`http:/192.168.86.141/newpost/`,{
          method:"POST",
          headers : { 
              "Content-Type":"application/json",
          },     
          body: JSON.stringify({title:text, username:state.username, school:state.school})
      })
      
       loadData()
   }

 
  const openItem = (data) => {
      props.navigation.navigate("detail", {data:data})
  }
  const opencomment = (data) => {
    props.navigation.navigate("commentdetail", {comment:data})
}


  useEffect(()=>{
    if (state.school != null){
    
     fetch(`http:/192.168.86.141/profile/`,{
          method:"POST",
          headers : { 
            "Content-Type":"application/json",
        }, 
        body: JSON.stringify({ username:state.username, school:state.school})
      })
      .then(resp => resp.json())
      .then(data =>{
        console.log(data)
        console.log(data['1'])
       setPosts(data.posts)
        setComment(data.comments)
        setLoading(false)
       })
       fetch(`http:/192.168.86.141/prof/`,{
        method:"POST",
        headers : { 
          "Content-Type":"application/json",
      }, 
      body: JSON.stringify({ username:state.username, school:state.school})
    })
    .then(resp => resp.json())
    .then(data =>{
      console.log(data)
     setBio(data[0].bio)
    
     });

     fetch(`http:/192.168.86.141/getSaved/`,{
      method:"POST",
      headers : { 
        "Content-Type":"application/json",
    }, 
    body: JSON.stringify({ username:state.username, school:state.school})
  })
  .then(resp => resp.json())
  .then(data =>{
    console.log("hi")
    console.log(data)
    console.log(data)
    console.log(data)
    console.log(data)
    console.log(data)
    console.log(data)
    console.log(data)
    console.log("hi")
   setsaved(data)
  
   })
      }
   },[]) 
   useEffect(() => {
    fetch(`http:/192.168.86.141/prof/`,{
      method:"POST",
      headers : { 
        "Content-Type":"application/json",
    }, 
    body: JSON.stringify({ username:state.username, school:state.school})
  })
  .then(resp => resp.json())
  .then(data =>{
    console.log(data)
   setBio(data[0].bio)
  
   })

  } , [isFocused])
  const renderdata = (item) =>{  
       console.log(item)
      return (  
      <Card style={styles.cardStyle}  onPress={()=> openItem(item)}>
      <Text style = {{fontSize:8}}>{item.username}</Text>
      <Text style = {{fontSize:25}}>{item.title}</Text> 
      <Text style = {{fontSize:25, justifyContent:'center'}}>{item.numberofcomments}</Text>
      </Card>
      )}
    const rendercomment = (item) =>{
        return (  
        <Card style={styles.cardStyle}  onPress={()=> opencomment(item)}>
        <Text style = {{fontSize:8}}>{item.username}</Text>
        <Text style = {{fontSize:25}}>{item.text}</Text> 
        </Card>
        )}
  return (
      <View style={{flex:1}}> 
        <View style={{flexDirection:"column"}}>
        <Text style={{textAlign: 'center', fontSize:20, marginTop:65, color:"#332710"}}>  {state.username}</Text>

        <View style = {{flexDirection:'row', marginTop:30, marginLeft:20, marginRight:20, alignItems: 'center',  flex: 1,
    justifyContent: "center",}}>
         
        <Text style={{ marginTop:10, fontSize:12, flex:1,}}> {posts.length} posts</Text>
        <Text style={{ marginTop:10, fontSize:12, flex:1,}}> {comment.length} comments</Text>
        
        
        </View>
      </View>
        <View>
        <Text>{Join}</Text>
        </View>
        {bio?
        <Text style={{marginTop:22, marginBottom:12}}>{state.username}'s bio: {bio}</Text>:null}
        <View sttyle={{marginLeft:30, marginRight:30}}>
        <Button   style = {{marginTop:12, marginLeft:32, marginRight:32}}mode="contained"onPress={()=>{props.navigation.navigate("ProfileSettings",{bioprop:bio})}}>Profile settings</Button>

        </View>
        <View style = {{flexDirection:'row'}}>
        <Button 
                    color={poststate ? "#332710":"#0080FF"}
                    style={{ flex:3, margin: 10,
                      padding: 10,
                      borderRadius:25}}
                    icon = "pencil"
                    mode = "contained"
                    onPress={()=> setpoststate(true)}>Posts
        </Button>
        <Button
                    color={commentstate ? "#332710":"#0080FF"}
                     style={{flex:3,margin: 10,
                      padding: 10,
                      borderRadius:25}} 
                    icon = "pencil"
                    mode = "contained"
                    onPress={()=> {setpoststate(false)
                                  setsavedstate(false)
                                  setcommentstate(true)}}>Comments
        </Button>
        <Button
                    color={savedstate ? "#332710":"#0080FF"}
                     style={{ flex:3, margin: 10,
                      padding: 10,
                      borderRadius:25}}
                    icon = "pencil"
                    mode = "contained"
                    onPress={()=> {
                      setcommentstate(false)
                      setpoststate(false)
                      setsavedstate(true)
                      }}>Saved
        </Button>
        </View>
        
        {poststate?
        <View style={{marginTop:20,color:'beige'}}>
        <Text style={{fontSize:25}}>{state.username}'s posts:</Text>
        {posts.length==0?
       <FlatList
          data = {posts}
          renderItem={({item})=>{
              return renderdata(item)
          }}
          
          onRefresh={() => loadData()} 
          refreshing = {loading}
          keyExtractor={item=>`${item.id}`}
      />:<Text>You have no posts :(</Text>}
      </View>: commentstate ?
      <View>
        <Text style={{fontSize:25}}>{state.username}'s comments:</Text>
      <FlatList
      data = {comment}
      renderItem={({item})=>{
          return rendercomment(item)
      }}
      onRefresh={() => loadData()}
      refreshing = {loading}
      keyExtractor={item=>`${item.id}`}
  />
  </View>
  :
  <View>
  <Text style={{fontSize:25}}>{state.username}'s saved posts:</Text>
<FlatList
data = {saved}
renderItem={({item})=>{
    return renderdata(item)
}}
onRefresh={() => loadData()}
refreshing = {loading}
keyExtractor={item=>`${item.id}`}
/>
</View>
  }

      
<Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles1.centeredView}>
      
        
        <View style={styles1.modalView}> 
        <Pressable onPress={() => setModalVisible(!modalVisible)}>
<Text style={{margin:5,padding:5}}>X1</Text>
</Pressable> 
            <TextInput
            multiline
            numberOfLines={4}
            placeholder="Enter your post"
       style={{margin:5,
          paddingHorizontal:20,
          justifyContent: 'center',
          borderWidth: 1,             
      }}

      onChangeText={onChangeText}
      value={text}
    />  
        
            <Pressable
            style={[styles1.button, styles1.buttonClose]}
            onPress={() => { insertData() }}
          >
            <Text style={styles1.textStyle}> Create Group</Text>
          </Pressable> 
          
        </View>

      </View>
      
         

    </Modal>
    
      </View>
     
      
     
  )
}

const styles = StyleSheet.create({
  ButtonStyle: {
    margin: 10,
    padding: 10,
    
  },  
  cardStyle: {
    margin: 10,
    padding: 10,
    
  },  
  fab: {
      position:"absolute",
      margin:16,
      right:0,
      bottom:0,
  }
});
const styles1 = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});





export default Profile