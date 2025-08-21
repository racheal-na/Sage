// import { StatusBar } from 'expo-status-bar';
// import { Button, StyleSheet, Text, View ,Image} from 'react-native';
// import { Camera, CameraView } from 'expo-camera';
// import { useEffect, useRef, useState } from 'react';
// export default function App() {
//   const[hasPermission,setHasPermission]=useState(null);
//   const[photo,setPhoto]=useState(null)
//   const CameraRef=useRef(null)
//   useEffect(async()=>{
//     Camera.requestCameraPermissionsAsync()
//          const{status}= await Camera.requestCameraPermissionsAsync()
//          setHasPermission(status == 'granted')
         
//         },[])
//         async function takePhoto() {
//           if(CameraRef.current){
//             const data =await CameraRef.current.takePictureAsync()
//             setPhoto(data.uri)
//           }
//         }
//         if(hasPermission==null){
//           return(<Text>Request permission...</Text>)
//         }
//   return (
//     <View>
//       <Text style={{}}>Hi</Text>
//       <CameraView style={{height:500}} ref={CameraRef}/>
//       <Button title='Take Photo' onPress={takePhoto}/>
//       {photo&& <Image source={{uri:photo}} style={{height:300}}/>}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
 
import React,{useRef,useEffect} from "react";
import { Animated,View,StyleSheet, Button } from "react-native";

export default function App(){
  const moveX= useRef(new Animated.Value(0)).current;
  const moveBox=()=>{
    Animated.spring(moveX,{
      toValue:200,
      useNativeDriver: true,

    }).start();
  }
    const moveBoxR=()=>{
    Animated.spring(moveX,{
      toValue:0,
      useNativeDriver: true,

    }).start();
  }
  const moveY= useRef(new Animated.Value(0)).current;
    const moveBoxV=()=>{
    Animated.spring(moveY,{
      toValue:200,
      useNativeDriver: true,

    }).start();
  }
    const moveBoxS=()=>{
    Animated.spring(moveY,{
      toValue:0,
      useNativeDriver: true,

    }).start();
  }
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn=()=>{
    Animated.timing(fadeAnim,{
      toValue:1,
    duration: 5000,
  useNativeDriver:true,
  }).start();
  }
  const fadeOut=()=>{
    Animated.timing(fadeAnim,{
      toValue:0,
    duration: 5000,
  useNativeDriver:true,
  }).start();
  }
  
    
  
  return(
    <View style={styles.container}>
     <Animated.View style={[styles.box,{opacity:fadeAnim}]}/>
    <Button title="fade In" onPress={fadeIn}/>
      <Button title="fade Out" onPress={fadeOut}/>
       <View style={styles.LogoBox}>
     <Animated.View style={[styles.boxS,{transform:[{translateX: moveX}]}]}/>
      <Button title="move box" onPress={moveBox}/>
      <Button title="move boxR" onPress={moveBoxR}/>
          </View>
           <View style={styles.VBox}>
     <Animated.View style={[styles.boxV,{transform:[{translateY: moveY}]}]}/>
      <Button title="move boxv" onPress={moveBoxV}/>
      <Button title="move boxR" onPress={moveBoxS}/>
          </View>
    </View>
  );
}
const styles=StyleSheet.create({
  container:{flex:1,justifyContent:"center",alignItems:"center"},
  box:{width:100,height:100,backgroundColor: "orangered"},

  LogoBox:{flex: 2,justifyContent: "center"},
  boxS:{width: 80,height:80,backgroundColor: "red"},

  VBox:{flex:1,justifyContent:"center",alignItems:"center"},
  boxV:{width:100,height:100,backgroundColor: "green"},
})
  

