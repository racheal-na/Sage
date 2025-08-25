
import { Text, TouchableOpacity, View } from "react-native";
import Background from "./Background";
import { darkGreen } from "./Welcome";
import Field from "./Field";
import Btn from "./Btn";
export default function Signup(props){

    return(
       <Background>
        <View style={{alignItems:'center',width: 400}}>

        <Text style={{color:'white',fontSize: 45, fontWeight:'bold',marginTop: 20}}>Register</Text>
        <Text style={{ color: 'white',fontSize:20,fontWeight:'bold',marginBottom:20}}>Create a new accunt</Text>
        <View style={{backgroundColor: 'white',height: 700,width:460,borderTopLeftRadius: 130,paddingTop:100, alignItems:"center",gap:15}}>
       
        <Field placeholder="First Name" />
        <Field placeholder="Last Name" />
        <Field placeholder="Email/Username"
        keyboardType={"email-address"}
         />
        <Field 
        placeholder="Contact Number"
        keyboardType={"number"}
        />
        <Field 
        placeholder="Password" 
        secureTextEntry={true}/>
        <Field 
        placeholder="Confirm Password" 
        secureTextEntry={true}/>
        <View 
        style={{
            display: 'flex',
            flexDirection:'row',
            width:'78%',
            paddingRight: 16 
            }}>
          <Text 
          style={{
            color: 'grey',
            fontWeight:'Blob'}}>By Signing in, you agree to our{""}
            <Text style={{color: darkGreen,fontWeight: 'bold',fontSize: 16}}>Terms & Conditions</Text>
          </Text>
        </View>
        <View 
        style={{
            
            display: 'flex',
            flexDirection:'row',
            width:'78%',
            justifyContent:'center',
            paddingRight: 16,
            marginBotom: 10 }}>
          <Text style={{color: 'grey',fontWeight:'Blob'}}>and{""}
            <Text style={{color: darkGreen,fontWeight: 'bold',fontSize: 16}}>Privacy Policy</Text>
          </Text>
        </View>
        <Btn textColor='white' bgColor={darkGreen} btnLabel='Signup' Press={()=>{alert("Account created")
            props.navigation.navigate('Login')
        }}/>
          <View style={{display: 'flex',flexDirection: 'row',justifyContent: 'center'}}>
          <Text style={{fontSize: 16,fontWeight:'bold'}}>Already have account ? </Text>
          <TouchableOpacity
          onPress={()=>props.navigation.navigate("Login")}
          >
          <Text style={{color:darkGreen,fontWeight:'bold' }}>Login</Text>
          </TouchableOpacity>
          </View>
        </View>
        </View>
       </Background>
    );
}