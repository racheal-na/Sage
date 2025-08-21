import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { add,subtract,reset } from '../Redux/counterSlice'


export default function CounterApp(){
     
     const count=useSelector(state=>state.counter.value);
  const dispatch = useDispatch();

    return(
      <View style={{flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
}}>
    <Text style={{fontSize: 32,
    marginBottom: 20}}>Count: {count}</Text>
     <View style={{width: '60%',
    justifyContent: 'space-between',
    height: 150
}}>
        <Button title="Add" onPress={() => dispatch(add())} />
        <Button title="Subtract" onPress={() =>dispatch(subtract()) } />
        <Button title="Reset" onPress={() => dispatch(reset())}/>
      </View>

</View>
    );
}