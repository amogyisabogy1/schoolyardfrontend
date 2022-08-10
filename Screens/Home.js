import react from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, FlatList, Alert, Modal, Pressable, TouchableOpacity, ImageBackground, TextInput, Image} from 'react-native';
import {Card, Title, FAB, Button} from "react-native-paper"; 
import postdetails from './Postdetails';
import * as SecureStore from 'expo-secure-store';
import moment from 'moment';
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
import { EvilIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

function Home({props, navigation, route}) {
    const [newcolor, setnewcolor] = React.useState("#332710");
    const [topcolor, settopcolor] = React.useState("#F1F1F1");
    const [modalVisible, setModalVisible] = useState(false);
    const [text, onChangeText] = React.useState("");
    const [data1,setData] = useState("")
    const [loading,setLoading] = useState(true)
    const [type1,settype] = useState("")
    const [{signUp}, state] = React.useContext(AuthContext);
    const localimage = require("../assets/schoolyardbg.png")
    const [polls1, setpolls1] = React.useState(false)
    const [choice1, setchoice1] = React.useState("yes")
    const [choice2, setchoice2] = React.useState("no")
    const [ hi,sethi] = React.useState("hi")
    const { showActionSheetWithOptions } = useActionSheet();
    const [allvotes, setallvotes] = React.useState()
    const [numba, setnumba] = React.useState("1")
    //get all upvoted posts from the user, render data will check if its the current post which is being rendered, when the user upvotes it will update list causing rerender
    
    async function getValueFor(key) {
      let result = await SecureStore.getItemAsync(key);
      if (result) {
        alert("🔐 Here's your value 🔐 \n" + result);
      } else {
        alert('No values stored under that key.');
      }
    }
    getValueFor("refreshtoken")
  
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
            <EvilIcons name="user" onPress={() => navigation.navigate("Profile")} size={36} color="white" />
            
          </MaterialHeaderButtons>
        ),
      });
    }, [navigation]);
    const loadData = () => {
      setnumba(1)
      
      fetch(`http:/192.168.29.189/getposts`,{
        method:"POST", 
        headers : { 
          "Content-Type":"application/json",
      }, 
      body: JSON.stringify({school:state.school,pagenumber:1, type:type1})
    })
    .then(resp => resp.json())
    .then(data =>{
        setnumba(1)
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
        setnumba(1)
        setModalVisible(!modalVisible)
        fetch(`http:/192.168.29.189/newpost/`,{
            method:"POST",
            headers : { 
                "Content-Type":"application/json",
            },     
            body: JSON.stringify({title:text, username:state.username, school:state.school})
        })
        .then(resp => resp.json())
        .then(data =>{
            console.log(data)
            setData(data)
            setLoading(false)
         })
         onChangeText("")
        

   
      }}else{
        if(text==""){
          Alert.alert("cannot create blank post!")
        }else{
        
        
          setpolls1(false)
          fetch(`http:/192.168.29.189/createchoice/`,{
            method:"POST",
            headers : { 
                "Content-Type":"application/json",
            },     
            body: JSON.stringify({title:text, username:state.username, school:state.school, choice1: choice1, choice2:choice2 })
    
    
          })
          setModalVisible(!modalVisible)   
          
      setnumba(1)
      fetch(`http:/192.168.29.189/getposts`,{
        method:"POST",
        headers : { 
          "Content-Type":"application/json",
      }, 
      body: JSON.stringify({school:state.school,pagenumber:numba,type:type1})
    })
    .then(resp => resp.json())
    .then(data =>{
        console.log(data)
        setData(data)
        setLoading(false)
     })
          onChangeText("")
      }

        
      }
    
    }
  
     const loadmoredata=()=>{
      if (state.school != null){
        var numbas = parseInt(numba) + 1
        setnumba(numbas)
        console.log("hihihih123")
        console.log(numba)
        fetch(`http:/192.168.29.189/getposts`,{
         method:"POST",
         headers : { 
           "Content-Type":"application/json",
       }, 
       body: JSON.stringify({school:state.school, pagenumber:numbas, type:type1})
     })
     .then(resp => resp.json())
     .then(data =>{
        var cjar = data1.concat(data);
         setData(cjar)
         setLoading(false)
      })
    }}
   
   const openItem = (data) => {
        navigation.navigate("detail", {data:data, numberofcomments:data.numberofcomments})
    }
    useEffect(()=>{
     
      if (state.school != null){
       setnumba(1)

     
       fetch(`http:/192.168.29.189/getposts`,{
        method:"POST",
        headers : { 
          "Content-Type":"application/json",
      }, 
      body: JSON.stringify({school:state.school, pagenumber:numba, type:type1})
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
const Top123 =()=>(
  settype("Top")
)

const New123 =()=>(
  settype("New")
)
  
const IconButton1 = ({ item }) => (
  <TouchableOpacity style={{paddingLeft:1, }} onPress={()=>{onPress(item.id)}}>
    <View flexDirection="row">
    <Feather name="message-square" size={26} color="black" style={{marginBottom:3}} /> 
    <Text style={{marginLeft:0, marginRight:10, marginTop:3}}>{item.numberofcomments==1 ? <Text style = {{fontSize:12}}>{item.numberofcomments} </Text>  : <Text style = {{fontSize:12}}>{item.numberofcomments} </Text> }</Text> 
      
    
    </View>
  </TouchableOpacity>
);


    const IconButton = ({ title, icon, item }) => (
      <TouchableOpacity style={{paddingLeft:220, marginRight:10}} onPress={()=>{onPress(item.id)}}>
        <View justifyContent="row">
         
         <Ionicons name={icon} size={24} color="red"  />
        </View>
      </TouchableOpacity>
    );
    const renderdata = (item) =>{
      console.log("time")
      console.log(moment.utc(item.ctime).local().startOf('seconds').fromNow())
     
      var posted = moment.utc(item.ctime).local().startOf('seconds').fromNow()
        
        var poll1234 = false
        var choices = item.choice
        if(choices.length >= 1){
         poll1234 = true
        }
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
        
      
        <Text style = {{fontSize:12}} onPress={()=>{navigation.navigate("Seeprofile",{username:item.username})}}>{item.username}</Text>
        <Text style = {{fontSize:25}}>{item.title}</Text> 
      <View style={{flexDirection:'row', marginTop:12,marginBottom:2}}>
      <IconButton1 item={item}  />
      <AntDesign onPress={()=>{
      if(userVoteValue==-1){
      item.score = item.score + 1
       Upvote(item, userVoteValue)
      }else if(userVoteValue==0){
        item.score = item.score + 1
       Upvote(item, userVoteValue)
      }
  
 
  
   
  
  }} name={userVoteValue==1?"upcircle":"upcircleo"} size={24} color="black" />
        
     <Text style={{marginTop:2}}>{item.score}</Text>
   
     <AntDesign onPress={()=>{ 
       if(userVoteValue==1){
        item.score = item.score - 1
         Downvote(item, userVoteValue)
        }else if(userVoteValue==0){
          item.score = item.score - 1
         Downvote(item, userVoteValue)
        }
  
       

   
  }} name={userVoteValue==-1?"downcircle":"downcircleo"} size={24} color="black" />
     
        
        <IconButton  style={{paddingLeft:3, marginTop:1}} size={46} title="Report" item={item} icon="flag" />
  
   </View > 
   <Text style={{marginBottom:10}}>{posted}</Text>
   {poll1234?
   <RNPoll
        style={{marginBottom:10}}
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
/>:null}
        </Card>
         
        )}

      
    return (
        <View style={{backgroundColor:"white"}}>
<View style={{flexDirection:"row"}}>

<View style={{flexDirection:"row", alignItems: 'center',  flex: 1,
    justifyContent: "center",marginTop:5}}>

<Button color={newcolor} icon="party-popper" mode="contained" onPress={() => {
  
  settype('New')
  New123()
  loadData()
  setnewcolor("#332710")
settopcolor("#F1F1F1")
}}>

    New 
  </Button>  
  
  <Button color={topcolor} style={{buttonColor:"F1F1F1"}}icon="fire" mode="contained" onPress={() => {
settype("Top")
Top123()
loadData()
setnewcolor("#F1F1F1")
settopcolor("#332710")
}}>
  Top 
  </Button>

</View>

</View>
          
         <FlatList
            style={{marginTop:5}}
            data = {data1}
            renderItem={({item})=>{
                return renderdata(item)
            }}
            onRefresh={() => loadData()}
            refreshing = {loading}
            keyExtractor={item=>`${item.id}`}
            onEndReached={()=>{loadmoredata()}}
            onEndReachedThreshold={0}
           
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
  <Text style={{margin:5,padding:5, color:"red",marginRight:140}}>X</Text>
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
      {polls1==false? <Text></Text>:
      <View style={{borderRadius:1, borderWidth:1}}>
       <TextInput
       maxLength={500}
       placeholder="Choice one"
       placeholderTextColor = "black"
       onChangeText={setchoice1}
       style={{    
        width:200,
         height: 50, 
   margin: 12,
   borderWidth: 1,
   padding: 10,
   borderColor:"black", 
   borderRadius:10}}
     />
     <TextInput
       maxLength={500}
       placeholder="Choice two"
       placeholderTextColor = "black"
       onChangeText={setchoice2}
       style={{    
         height: 50, 
   margin: 12,
   borderWidth: 1,
   padding: 10,
   borderColor:"black", 
   borderRadius:10}}
     />
     <Text style={{marginLeft:70, color:"red"}}onPress={()=>{setpolls1(false)}}>Remove Poll</Text>
  </View>}
          <View style={{flexDirection:"row"}}>
         
            <FontAwesome5 name="poll-h" size={30} color="black" onPress={() => { setpolls1(true) }} style={{height:40,width:40}}/>
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
        </View>
        
       
    )
}

const styles = StyleSheet.create({
    cardStyle: {
      
      backgroundColor:"#F1F1F1",  
      margin: 5,
      marginRight:10,
      marginLeft:10,
      paddingLeft:10,
      paddingTop:10,
      paddingRight:10,
      borderRadius:10,
      borderWidth:1,
    },  
    fab: {
        position:"absolute",
        margin:16,
        right:0,
        bottom:10,
        marginBottom:40
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
