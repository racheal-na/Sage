import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function CounterApp(){
     const [count, setCount] = useState(0);
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
        <Button title="Add" onPress={() => setCount(count + 1)} />
        <Button title="Subtract" onPress={() => setCount(count - 1)} />
        <Button title="Reset" onPress={() => setCount(0)} />
      </View>

</View>
    );
}