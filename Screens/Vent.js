import react from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, Button, FlatList, Alert, Modal, Pressable, TouchableOpacity, ImageBackground, TextInput, Image} from 'react-native';
import {Card, Title, FAB} from "react-native-paper"; 
import postdetails from './Postdetails';
import * as SecureStore from 'expo-secure-store';
import  {AuthContext}  from '../App'
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialHeaderButtons } from './MyHeaderbutton';
import { Item } from 'react-navigation-header-buttons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import RNPoll, { IChoice } from "react-native-poll";
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 


function Home({props, navigation}) {

    const [modalVisible, setModalVisible] = useState(false);
    const [text, onChangeText] = React.useState("");
    const [data,setData] = useState("")
    const [loading,setLoading] = useState(true)
    const [{signUp}, state] = React.useContext(AuthContext);
    const localimage = require("../assets/schoolyardbg.png")
    const [polls1, setpolls1] = React.useState(false)
    const [choice1, setchoice1] = React.useState("yes")
    const [choice2, setchoice2] = React.useState("no")
    const [ hi,sethi] = React.useState("hi")
    const { showActionSheetWithOptions } = useActionSheet();
    const [allvotes, setallvotes] = React.useState()
    //get all upvoted posts from the user, render data will check if its the current post which is being rendered, when the user upvotes it will update list causing rerender
    
    
    const Upvote =(item) =>{
      fetch("http:/192.168.29.189/Upvote/",{
        method:"POST",
        headers : {    
            "Content-Type":"application/json"
        },  
        body: JSON.stringify({ id:item.id, school:state.school, username:state.username})
    })
    .then(resp => resp.json())
    .then(data =>{ 
      
        setallvotes(data.vote)
        console.log(allvotes)
        console.log(allvotes) 
        console.log(allvotes) 
       
        
        
     })  
  
    }
    const Downvote =(item,userVoteValue) =>{
      
      fetch("http:/192.168.29.189/Downvote/",{
        method:"POST",
        headers : {    
            "Content-Type":"application/json"
        },  
        body: JSON.stringify({ id:item.id, school:state.school, username:state.username})
    })
    .then(resp => resp.json())
    .then(data =>{ 
      
        setallvotes(data.vote)
        console.log(allvotes)
        console.log(allvotes) 
        console.log(allvotes) 
       
        
        
     })  
  
    }


    const onPress = (id) =>{
      

    showActionSheetWithOptions(
      {
        options: ["Cancel","Why are you reporting this post? Select the reason below",'Harrasment', 'Bullying', 'Threatening', 'Sexual Content', 'Hate Speech', 'Other',],
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark',
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          fetch("http:/192.168.29.189/reportpost/",{
            method:"POST",
            headers : {   
                "Content-Type":"application/json"
            },  
            body: JSON.stringify({ id:id, type:"Harrasment"})
        })
          
        } else if (buttonIndex === 2) {
          fetch("http:/192.168.29.189/reportpost/",{
            method:"POST",
            headers : {   
                "Content-Type":"application/json"
            },  
            body: JSON.stringify({ id:id, type:"Bullying"})
        })
        }else if (buttonIndex === 3) {
          fetch("http:/192.168.29.189/reportpost/",{
            method:"POST",
            headers : {   
                "Content-Type":"application/json"
            },  
            body: JSON.stringify({ id:id, type:"Threatening"})
        })
        }else if (buttonIndex === 4) {
          fetch("http:/192.168.29.189/reportpost/",{
            method:"POST",
            headers : {   
                "Content-Type":"application/json"
            },  
            body: JSON.stringify({ id:id, type:"Sexual Content"})
        })
        }else if (buttonIndex === 5) {
          fetch("http:/192.168.29.189/reportpost/",{
            method:"POST",
            headers : {   
                "Content-Type":"application/json"
            },  
            body: JSON.stringify({ id:id, type:"Hate Speech"})
        })
        }else if (buttonIndex === 6) {
          fetch("http:/192.168.29.189/reportpost/",{
            method:"POST",
            headers : {   
                "Content-Type":"application/json"
            },  
            body: JSON.stringify({ id:id, type:"Other"})
        })
        }
      }
    );
    }


    React.useLayoutEffect(() => {
      navigation.setOptions({
        // use MaterialHeaderButtons with consistent styling across your app
        headerRight: () => ( 
          <MaterialHeaderButtons>
            <Item title="profile" onPress={() => navigation.navigate("Profile")} />
          </MaterialHeaderButtons>
        ),
      });
    }, [navigation]);
    const loadData = () => {
      

      fetch(`http:/192.168.29.189/vent/`,{
        method:"POST",
        headers : { 
          "Content-Type":"application/json",
      }, 
      body: JSON.stringify({school:state.school})
    })
    .then(resp => resp.json())
    .then(data =>{
        console.log(data)
        setData(data)
        setLoading(false)
     })
    

  }
    const insertData = () =>{
      if(polls1==false){
        if(text==""){
          Alert.alert("cannot create blank post!")
        }else{
       
        setModalVisible(!modalVisible)
        fetch(`http:/192.168.29.189/addposttovent/`,{
            method:"POST",
            headers : { 
                "Content-Type":"application/json",
            },     
            body: JSON.stringify({title:text, username:state.username, school:state.school})
        })
        
         loadData()
         onChangeText("")
      }}else{
        if(text==""){
          Alert.alert("cannot create blank post!")
        }else{
        
        
       
          fetch(`http:/192.168.29.189/createchoice/`,{
            method:"POST",
            headers : { 
                "Content-Type":"application/json",
            },     
            body: JSON.stringify({title:text, username:state.username, school:state.school, choice1: choice1, choice2:choice2 })
    
    
          })
          setModalVisible(!modalVisible)   
          loadData()
          onChangeText("")
      }

        
      }
    
    }
  
   
   const openItem = (data) => {
        navigation.navigate("detail", {data:data, numberofcomments:data.numberofcomments})
    }
    useEffect(()=>{
     
      if (state.school != null){
     
       fetch(`http:/192.168.29.189/vent/`,{
        method:"POST",
        headers : { 
          "Content-Type":"application/json",
      }, 
      body: JSON.stringify({school:state.school})
    })
    .then(resp => resp.json())
    .then(data =>{
  
        setData(data)
        setLoading(false)
     })
     fetch(`http:/192.168.29.189/UserVotes/`,{
      method:"POST",
      headers : { 
        "Content-Type":"application/json",
    }, 
    body: JSON.stringify({school:state.school, username:state.username})
  })
  .then(resp => resp.json())
  .then(data =>{ 

      setallvotes(data[0].vote)
      setLoading(false)
   })  
 
        } 
     },[state.school,state.username]) 
 
//<Text>{title}</Text>
  
const IconButton1 = ({ item }) => (
  <TouchableOpacity style={{paddingLeft:100, }} onPress={()=>{onPress(item.id)}}>
    <View flexDirection="row">
    <Feather name="message-square" size={24} color="black" /> 
    <Text style={{marginTop:2, marginLeft:5}}>{item.numberofcomments==1 ? <Text style = {{fontSize:12}}>{item.numberofcomments} </Text>  : <Text style = {{fontSize:12}}>{item.numberofcomments} </Text> }</Text> 
     
    
    </View>
  </TouchableOpacity>
);


    const IconButton = ({ title, icon, item }) => (
      <TouchableOpacity style={{paddingLeft:100}} onPress={()=>{onPress(item.id)}}>
        <View justifyContent="row">
         
         <Ionicons name={icon}  color="red"  />
        </View>
      </TouchableOpacity>
    );
    const renderdata = (item) =>{
        
        
        
   
        var choices = item.choice
        var totalVotes = choices.reduce((acc, item) => acc + item.votes, 0);
        console.log(totalVotes)
        console.log(totalVotes)
        const findUserName = state.username
     
        console.log(allvotes)
        console.log("hi")
        
        var number = item.id
        var itemstr = number.toString() 
        const items = allvotes?.filter(res => res?.postid == item.id)
        var userVoteValue = items?.reduce((acc, item) => item?.type, 0);
        console.log("bruhtahi")
        console.log(item.id)
        console.log(userVoteValue)
        console.log(userVoteValue)
        console.log(userVoteValue)
        
                       

        return (  
        
        <Card style={styles.cardStyle}  onPress={()=> openItem(item)}>
        
      
       
        <Text style = {{fontSize:25}}>{item.title}</Text> 
      <View style={{flexDirection:'row'}}>
      <AntDesign onPress={()=>{
      item.score = item.score + 1
       Upvote(item, userVoteValue)
  
 
  
  
  
  }} name={userVoteValue==1?"upcircle":"upcircleo"} size={24} color="black" />
        
     <Text>{item.score}</Text>
   
     <AntDesign onPress={()=>{ 
      
      item.score = item.score - 1
      Downvote(item, userVoteValue)
  
       

   
  }} name={userVoteValue==-1?"downcircle":"downcircleo"} size={24} color="black" />
     
        <IconButton1 item={item}  />
        <IconButton  style={{paddingLeft:30}}title="Report" item={item} icon="flag" />
   </View>
        <RNPoll
  totalVotes={totalVotes}

  choices={item.choice}
  onChoicePress={(selectedChoice: IChoice) =>{
    fetch("http:/192.168.29.189/vote/",{
      method:"POST",
      headers : {   
          "Content-Type":"application/json"
      },  
      body: JSON.stringify({ choiceid:selectedChoice.id, school:state.school, username:state.username, postid:item.id})
  })
  .then(()=>{
    const findUserName = selectedChoice.id
    totalVotes = 0
    

    for (const item of item?.choice) {
      console.log(totalVotes)
      
      if (item.id === findUserName) {
          item.votes = item.votes + 1;
      }
      totalVotes = totalVotes + item.votes
    }
    

  })
  sethi(totalVotes)
  }
  } 
/>
        </Card>
        
        )}
    return (
        <ImageBackground source={localimage} style={{flex:1}}>
          
         <FlatList
             
            data = {data}
            renderItem={({item})=>{
                return renderdata(item)
            }}
            onRefresh={() => loadData()}
            refreshing = {loading}
            keyExtractor={item=>`${item.id}`}
        />

        <FAB
            style = {styles.fab}
            small = {false}
            icon = "plus"
            theme = {{colors:{accent:"blue"}}}
            onPress={() => {setModalVisible(!modalVisible)}}
        />
    
  <Modal
        style={{marginBottom:90}}
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
  <Text style={{margin:5,padding:5, color:"red",marginRight:100}}>X</Text>
</Pressable> 
              <TextInput
              maxLength={500}
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
      
          <View style={{flexDirection:"row"}}>
         
              <Pressable
              style={[styles1.button, styles1.buttonClose]}
              onPress={() => { insertData() }}
            >
              <Text style={styles1.textStyle}>  Post</Text>
            </Pressable> 
            </View>
            
          </View>

        </View>
        
           

      </Modal>
        </ImageBackground>
        
       
    )
}

const styles = StyleSheet.create({
    cardStyle: {
      margin: 10,
      padding: 10,
      borderRadius:10,
      borderWidth:1,
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
      marginTop: -200
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



export default Home
