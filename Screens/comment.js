import React from 'react'
import { StyleSheet, Text, View, Button, FlatList, Alert, Modal, Pressable,ScrollView, TouchableOpacity, TextInput} from 'react-native';
import {Card, Title, FAB} from "react-native-paper"; 
import { useState } from 'react/cjs/react.production.min';
import  {AuthContext}  from '../App' 
function Comment({username,text,replies,id, changeComment, postid}) {
  const [{signUp}, state] = React.useContext(AuthContext);
  const [showItems, setShowItems] = React.useState(false)
  const [replies1,setReplies] = React.useState(replies)
  const [viewreplies, setViewReplies] = React.useState(true)
  const [modalVisible, setModalVisible] = React.useState(false);
  const [replyusername,setreplyusername] = React.useState("");
  const [text1, onChangeText] = React.useState(replyusername);
  console.log("look here")
  console.log(replies)
  console.log(replies)
  console.log(replies)
  console.log(replies)
  console.log(replies)
  console.log(replies)
  console.log(replies)
  console.log(replies)
  const [repliestocomments, setrepliestocomments] = React.useState(replies1?.map?.((reply) =>
  <Card style={{ marginLeft:25,
    margin:10,
    padding:10,
    flex: 1,
    }} >
     <Text>{reply.username}</Text>   
     <Text>{reply.text}</Text> 
     <Text onPress={()=>{setModalVisible(true)
     setreplyusername(reply.username)
    }}>Reply</Text>
     
     </Card>
));
  const insertData = () =>{
    setModalVisible(!modalVisible)
        
    fetch(`http:/192.168.29.189/addreply/`,{
        method:"POST",
        headers : { 
            "Content-Type":"application/json",
        },     
        body: JSON.stringify({text:text1, username:state.username, school:state.school,id:id})
    })
    loadData()
    
 }
 const loadData = () =>{
    fetch(`http:/192.168.29.189/getcommentfromid/`,{
        method:"POST",
        headers : { 
            "Content-Type":"application/json",
        },     
        body: JSON.stringify({postid:postid,id:id})
    }) 
    .then(resp => resp.json())
    .then(data =>{
        console.log("111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111")
        console.log(data)
        console.log("222222222222")
        console.log(data.data)
        var replies2 = data.data
        var bruh = replies2?.map?.((reply) =>
        <Card style={{ marginLeft:25,
          margin:10,
          padding:10,
          flex: 1,
          }} >
           <Text>{reply.username}</Text>   
           <Text>{reply.text}</Text> 
           <Text onPress={()=>{setModalVisible(true)      
           setreplyusername(reply.username)
}}>Reply</Text>
           
           </Card>
      );
      setrepliestocomments(bruh)

     })
 }

  return (
    <View style={{flex:1}}>
    <Card style={styles.cardStyle} >
    <Text>{username}</Text>   
    <Text>{text}</Text>
    {viewreplies?
    (
    <Text onPress={()=>{
        console.log(showItems)
        setShowItems(!showItems)
        setViewReplies(!viewreplies)
        }}>
            View replies
            
            </Text>):(<Text onPress={()=>{
        console.log(showItems)
        setShowItems(!showItems)
        setViewReplies(!viewreplies)
        }}>
             Hide replies
            
            </Text>)}
    <Text onPress={() => {setModalVisible(!modalVisible)}}>Reply</Text>
    </Card>
    {showItems ? (
    <View>{repliestocomments}</View>
    ):(
    null
    )}
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
  <Text style={{margin:5,padding:5}}>X</Text>
</Pressable> 
              <TextInput
              maxLength={140}
              multiline
              numberOfLines={4}
              placeholder="Enter your post"
         style={{margin:5,
            paddingHorizontal:20,
            justifyContent: 'center',
            borderWidth: 1,             
        }}

        onChangeText={onChangeText}
        value={text1}
      />  
          
              <Pressable
              style={[styles1.button, styles1.buttonClose]}
              onPress={() => { insertData() }}
            >
              <Text style={styles1.textStyle}>  Post</Text>
            </Pressable> 
            
          </View>

        </View>
        
           

      </Modal>




    </View>
  )
}

const renderdata1= (item) =>{
    return(
     <Card style={styles.cardStyle} >
     <Text>{item.username}</Text>   
     <Text>{item.text}</Text> 
     </Card>
    )
  }
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
  const styles = StyleSheet.create({ 

    detailStyle: {
        margin:10,
        padding:10,

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
    marginLeft:10,
    margin:10,
    padding:10,
    flex: 1,
  }

}) 
export default Comment