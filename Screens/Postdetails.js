import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, FlatList , SectionList,SafeAreaView} from 'react-native';
import {Button, Card} from "react-native-paper"
import  {AuthContext}  from '../App'
import { useNavigation } from '@react-navigation/native';
import Comment from './comment';

function Postdetail(props) {
    const anonymous = props.route.params.anonymous;
    const data = props.route.params.data;
    console.log(data)
    console.log(data)
    console.log(data)
    console.log(data)
    console.log(data)
    const [{signUp}, state] = React.useContext(AuthContext);
    const groupname = props.route.params.group;
    const {id, title} =props.route.params.data;
    const [text, changeText] = React.useState(null);
    const [comment, changeComment] = React.useState([{text:"Comment"}]);
  
    useEffect(()=>{
      console.log(data)
      console.log(data)
      fetch(`http:/10.62.2.249/comment/${data.id}/`,{
        method:"GET"
      })
      .then(resp => resp.json())
      .then(data => {
        changeComment(data)
       
      })    

    },[])
  
    const deletedData = (data) => {
      fetch(`http:/10.62.2.249/snippets/${data.id}/`,{
        method:"DELETE",
        headers: { 
          "Content-type":"application/json"
        }
      })
      .then(
        data =>{
          
          props.navigation.navigate("Home")
          
        }
      )
    
    }
    const loadData = () =>{
      fetch(`http:/10.62.2.249/comment/${data.id}/`,{
        method:"GET"
      })
      .then(resp => resp.json())
      .then(data => {
        changeComment(data)
       
      })    

   }
    const addComment = () =>{
      fetch("http:/10.62.2.249/comment/",{
          method:"POST",
          headers : {   
              "Content-Type":"application/json"
          },  
          body: JSON.stringify({text:text, postid:id, username:state.username, school:state.school})
      })
      .then(resp => resp.json())
      .then(()=>{changeText("")})
      .then(()=>{loadData()})
      
      
   }
   const renderdata = (item) =>{
    return (  
    <View style={{ flex: 1}}>
    <Comment postid = {data.id} id = {item.id} username={item.username} replies={item.data} text={item.text} changeComment={changeComment}/>
    </View>
    )}

   return ( 
  
   <View>
    <View style = {styles.detailStyle}>
       <Card>
       {anonymous == true ?
          null : <Text onPress={()=>{props.navigation.navigate('profile',{username:data.username})}}>{data.username}</Text>}
        
        <Text style = {{fontSize:25}}>
        
           
          {data.title}
        </Text>
       </Card>
        <View>
          {state.username == data.username ?
          <View style={{justifyContent:"row"}}>
          <Button icon = "delete"
          mode = "contained" onPress={() => deletedData(data)} style = {{marginTop:30}}>Delete</Button>
          <Button icon = "Edit"
          mode = "contained" onPress={() => props.navigation.navigate("Edit",{data:data})} style = {{marginTop:30}}>Edit</Button>
          </View>
          : null}
        </View>

    </View>
    <View style = {styles.commentStyle}>
      <TextInput 
        style={styles.input}
        onChangeText={(text) => {
          changeText(text)
        }}
        value={text}
        placeholder="Enter comment here"
      />
      <Button icon = "comment" 
          style = {styles.inputStyle}
          mode = "contained" 
          onPress={() => addComment()}
           >Comment</Button>
    </View>
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.flatListWrapper}>
      <FlatList
      data = {comment}
      renderItem={({item})=>{
        return renderdata(item)
      }}
      keyExtractor={item => `${item.id}`}
      style={{flex:1,minHeight:400}}
      
      />
    </View>
    </SafeAreaView>
   </View>
      
     
    )
}  

const styles = StyleSheet.create({ 

    detailStyle: {
        margin:10,
        padding:10,

    },
    flatListWrapper: {
      flex: 1,
      flexGrow: 1
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      flex:3
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

}) 



export default Postdetail
