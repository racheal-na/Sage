import { View,Text, TextInput, TouchableOpacity, FlatList} from "react-native";
import { IconButton } from "react-native-paper";

import React, { useState } from "react";
import Fallback from "../components/Fallback";

 
console.log(Date.now().toString());

export default function TodoScreen(){
     const[todo,setTodo]=useState("");
     const[todoList,setTodoList]=useState([]);
     const[editedTodo,setEditedTodo]=useState(null);
     const handleAddTodo=()=>{
        // {
        //     id:
        //     title:
        // }
        setTodoList([...todoList,{id: Date.now().toString(), title: todo}]);
        setTodo("");
        
    };

    const handleDeleteTodo=(id)=>{
             const updatedTodoList = todoList.filter((todo)=>todo.id !==id)
            
                 setTodoList(updatedTodoList);
        
            }
     //handl edited todo
         const handleEditTodo=(todo)=>{
                     setEditedTodo(todo);
                     setTodo(todo.title);
         };

         const handleUpdateTodo=()=>{
            const updatedTodos= todoList.map((item)=>{
                if (item.id===editedTodo.id) {
                    return{...item,title: todo}
                }
                return item
               
            });
            setTodoList(updatedTodos);
               setEditedTodo(null);
               setTodo("");
         }

     //render todo 
    const renderTodos=({item,index})=>{
return(
    <View style={{
        backgroundColor: '#1e90ff',
        borderRadius:6,
        paddingHorizontal:6,
        paddingVertical: 8,
        marginBottom: 12,
        marginHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#161515ff",
       shadowOfficet: {width: 0, height:2},
       shadowOpacity: 0.8,
       shadowRadius: 3,
      // elevation:
       
    }}
    >
       
     <Text style={{color: "#FFF",fontSize:20, fontWeight: "800", flex:1}}>{item.title}</Text>
     <IconButton icon="pencil"iconColor="#fff" onPress={()=>handleEditTodo(item)}/>
        <IconButton icon="trash-can" iconColor="#fff"onPress={()=>handleDeleteTodo(item.id)}/>
    </View>
);
    };
     return(
       
        

    <View>
        <Text>ToDo Screen</Text>
       
       <TextInput
       style={{borderWidth:2, borderColor:"#1e90ff", borderRadius: 6, paddingVertical: 12, paddingHorizontal: 16, marginHorizontal:16 }} placeholder="Add a task"
       value={todo}
       onChangeText={setTodo}
       onSubmitEditing={editedTodo? handleUpdateTodo:handleAddTodo}/>
    <TouchableOpacity style={{backgroundColor: '#000', 
    borderRadius: 6,
     paddingVertical: 12, 
     marginHorizontal:16,
      marginVertical: 34,
      alignItems:"center",
      
    }}
        onPress={editedTodo? handleUpdateTodo:handleAddTodo}
    >
        <Text style={{color:"#fff", fontWeight:"bold",fontSize: 18}}>{editedTodo? 'Save Changes':'Add Task'}</Text>
    </TouchableOpacity>
    {/* render todo list */}
    <FlatList data={todoList} renderItem={renderTodos} keyExtractor={(item)=>item.id}
        ListEmptyComponent={<Fallback/>}/>
   
    </View>

       
     );
}