
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


function SeeProfile(props) {

  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = React.useState("");
  const [posts,setPosts] = useState("")
  const [loading,setLoading] = useState(true)
  const [{signOut}, state] = React.useContext(AuthContext);
  const [comment, setComment] = React.useState("")
  const [poststate,setpoststate] = React.useState(true)
  const [bio,setBio] = React.useState("")
  username = props.route.params.username
  console.log(username)
  const loadData = () => {
    
    console.log(state.school)
    fetch(`http:/192.168.86.141/profile/`,{
      method:"POST",
          headers : { 
            "Content-Type":"application/json",
        }, 
        body: JSON.stringify({ username:username, school:state.school})
  })
  .then(resp => resp.json())
  .then(data =>{
      setPosts(data.posts)
      setComment(data.comments)
      setBio(data.bio)
      console.log(data.comments)
      console.log(comment)
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
          body: JSON.stringify({title:text, username:username, school:state.school})
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
     console.log(state.school)
     console.log(state.school)
     console.log(state.school)
     fetch(`http:/192.168.86.141/profile/`,{
          method:"POST",
          headers : { 
            "Content-Type":"application/json",
        }, 
        body: JSON.stringify({ username:username, school:state.school})
      })
      .then(resp => resp.json())
      .then(data =>{
        console.log(data.comments)
        console.log(data)
        setPosts(data.posts)
        setComment(data.comments)
          console.log(posts)
          setLoading(false)
       })
      }
   },[state.school,state.username]) 
  const renderdata = (item) =>{
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
        <View style = {{flexDirection:'row'}}>
         
        <Text style={{textAlign: 'center', fontSize:30}}>{username}'s Profile</Text>
        </View>
        <View style = {{flexDirection:'row'}}>
        <Button
                    icon = "pencil"
                    mode = "contained"
                    onPress={()=> setpoststate(true)}>Posts
        </Button>
        <Button
                    icon = "pencil"
                    mode = "contained"
                    onPress={()=> setpoststate(false)}>Comments
        </Button>
        </View>
        <Text>{username}'s bio: {bio}</Text>
        {poststate?
        <View>
        <Text>{username}'s posts</Text>

       <FlatList
          data = {posts}
          renderItem={({item})=>{
              return renderdata(item)
          }}
          onRefresh={() => loadData()}
          refreshing = {loading}
          keyExtractor={item=>`${item.id}`}
      />
      </View>:
      <View>
        <Text>{username}'s comments</Text>
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
            <Text style={styles1.textStyle}> Create 1Group</Text>
          </Pressable> 
          
        </View>

      </View>
      
         

    </Modal>
    
      </View>
     
      
     
  )
}

const styles = StyleSheet.create({
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





export default SeeProfile