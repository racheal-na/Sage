import { Text, TouchableOpacity, View } from "react-native";
import Background from "./Background";

import Field from "./Feild";
import Btn from "./Btn";
import { darkBlue } from "./cl";
export default function Login(props){

    return(
       <Background>
        <View style={{alignItems:'center',width: 400}}>

        <Text style={{color:'white',fontSize: 45, fontWeight:'bold',marginVertical: 40}}>Login</Text>
        <View style={{backgroundColor: 'white',height: 700,width:460,borderTopLeftRadius: 130,paddingTop:100, alignItems:"center",gap:15}}>
          <Text style={{fontSize: 35, color:darkBlue, fontWeight:'bold'}}>Welcome Back</Text>
          <Text style={{color: 'grey',fontSize: 19, fontWeight:'bold',marginBottom: 20}}>
            Login to your account
          </Text>
        <Field placeholder="Email/UserName" keyboardType={"email-address"}/>
        <Field placeholder="Password" secureTextEntry={true}/>
        <View style={{alignItems:'flex-end',width:'78%', padding: 16,marginBottom: 50 }}>
          <Text style={{color: darkBlue,fontWeight:'Blob'}}>Forget Password ?</Text>
        </View>
        <Btn textColor='white' bgColor={darkBlue} btnLabel='Login' Press={()=>alert("Logged In")}/>
          <View style={{display: 'flex',flexDirection: 'row',justifyContent: 'center'}}>
          <Text style={{fontSize: 16,fontWeight:'bold'}}>Don't have account ? </Text>
          <TouchableOpacity
          onPress={()=>props.navigation.navigate("Signup")}
          >
          <Text style={{color:darkBlue,fontWeight:'bold' }}>Signup</Text>
          </TouchableOpacity>
          </View>
        </View>
        </View>
       </Background>
    );
}