import { useEffect, useState } from "react";
import { FlatList, View, Text, ActivityIndicator, Button } from "react-native";


export default function Posts() {
    const [posts, setPosts] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    function getPosts() {
        setLoading(true)
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((data) => {
                setPosts(data)
                setLoading(false)
                setError(null)
                console.log(data)
            })
            .catch((err) => {
                console.log("error", err)
                setError(err)
                setLoading(false)
            })
    }


    useEffect(() => getPosts(), [])
    if (loading == false) {
        return (error ?
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Error</Text>
                <Button title="Reload" onPress={()=>getPosts()}/>
            </View >
            :
            <View style={{ flex: 1 }}>
                <FlatList
                    data={posts}
                    keyExtractor={(post) => post.id}
                    renderItem={({ item }) => (
                        <Text style={{ padding: 10, fontSize: 30 }}>Title: {item?.title}</Text>
                    )}
                />
            </View>
        )
    } else {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator />
            </View>
        )
    }


}

