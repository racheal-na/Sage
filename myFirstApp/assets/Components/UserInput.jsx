import { useState} from "react";
import{TextInput,View,Text, Button} from "react-native";
export default function UserInput(){
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    // const [formData,setFormData] =useState({
    //     email: " ",
    //     UserName: " ",
    //     lastName: " ",
    //     confirmPassword: " "
    // })
    // const handleChange=(name,value)=>{
    //     setFormData({
    //         ...formData,[name]:value
    //     });
    // };
    return(
        <View style={{padding:20}}>
        <TextInput
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
        style={{borderWidth:2, padding:10}}/>
        <Text>Your Name is:{name}</Text>
        <TextInput
        placeholder="Enter Password"
        securePassword
        value={password}
        onChangeText={setPassword}
        style={{borderWidth:2, padding:10}}/>
        <Text>Your Password is:{password}</Text>
        <Button title="Submit" onPress={()=>alert("name"+ name + "\nhint pass:" + "lur")}/>
    </View>
);
}
