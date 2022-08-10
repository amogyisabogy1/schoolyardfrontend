import React from 'react'
import { StyleSheet, Text, View, Button, FlatList, Alert, Modal, Pressable, TouchableOpacity, TextInput} from 'react-native';
import {Card, Title, FAB} from "react-native-paper"; 
import  {AuthContext}  from '../App' 
function Comment({username,text,replies,id}) {
  const [{signUp}, state] = React.useContext(AuthContext);
  const [showItems, setShowItems] = React.useState(false)
  const [viewreplies, setViewReplies] = React.useState(true)
  const [modalVisible, setModalVisible] = React.useState(false);
  const [text1, onChangeText] = React.useState("");
  const insertData = () =>{
        
    setModalVisible(!modalVisible)
    fetch(`http:/192.168.29.189/addreply/`,{
        method:"POST",
        headers : { 
            "Content-Type":"application/json",
        },     
        body: JSON.stringify({text:text1, username:state.username, school:state.school,id:id})
    })
    
 }

  return (
    <View>
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
    <FlatList
    style={{marginLeft:20}}
    data = {replies}
    renderItem={({item})=>{
      return renderdata1(item)
    }}
    keyExtractor={item => `${item.id}`}
    />
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
    margin:10,
    padding:10
  }

}) 
export default Comment