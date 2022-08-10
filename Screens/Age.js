
import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity, Alert,} from 'react-native';
import { Button } from 'react-native-paper';
import RNDateTimePicker from '@react-native-community/datetimepicker';
   const Age = (props) => {
    async function getValueFor(key) {
      let result = await SecureStore.getItemAsync(key);
      if (result) {
        alert("🔐 Here's your value 🔐 \n" + result);
      } else {
        alert('No values stored under that key.');
      }
    }
    getValueFor("refreshtoken")
    const school = props.route.params.school; 
    const email = props.route.params.email;
    console.log(school)
    console.log(email)
   const [date, setDate] = useState(new Date());
   const [show, setShow] = useState(true);
   const [disabledTrue,setdisabledTrue] = useState(false);
   calculate_age = (dob1) => {
    var today = new Date();
    var birthDate = new Date(dob1);  // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age_now--;
    }
    console.log(age_now);
    return age_now;
  }
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      alert("🔐 Here's your value 🔐 \n" + result);
    } else {
      alert('No values stored under that key.');
    }
  }
  getValueFor("refreshtoken")

   return (
    <View>
      <View>
  <Text style={{fontSize:30, marginRight:50,marginLeft:50,marginTop:100, margin:60, marginBottom:10}}> When were you born? </Text>
  </View>
 <View>
  <Text style={{margin:1, marginLeft:26}}> In order to use Schoolyard you must be 13 years or older, select your birthday below </Text>
  </View>
  <View>
  <RNDateTimePicker
    style={{ alignItems:'center',justifyContent:"center", margin:70,marginRight:140, marginBottom:100}}
    mode="date" 
    value={date}
    maximumDate={new Date()}
    minimumDate={new Date(1000, 10, 1)}
    onChange={(event, value) => {
      console.log('Selected-----------'+value);
      setDate(value)
      setdisabledTrue(true)
      console.log(disabledTrue)
    }}
  />
  <View>

  <Button
                   color="#0080FF"
                    mode = "contained"
                    onPress={()=> {if (calculate_age(date) >= 13){props.navigation.navigate("Register",{email:email, school:school, birth: date})}else{
                      Alert.alert("In order to you use Schoolyard you must be above 13! Please come back once you turn 13 :)")
                    }
                  
                  console.log(date)}}
                    style={{margin:2 ,margin:20, borderRadius:10}}
                    disabled={disabledTrue? false :true}>Next
                </Button>
  </View>
 </View>
 </View>
 

);};
export default Age;
