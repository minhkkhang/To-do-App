
import React from 'react';
import { View, Text, StyleSheet,TouchableWithoutFeedback, ImageBackground} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        marginTop: 5,
        marginBottom: 2,
        borderBottomWidth:1,
        elevation: 2,
    },
    title: {
        color:'steelblue',
        fontSize: 20,
        fontWeight:'bold',
        flex: 1, flexWrap: 'wrap',textAlign:'left'
    },
    container_title: {
        flex: 5,
        flexDirection: 'column',
        marginBottom:10,
    },
    container_status:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems:'center',
        
    },
    status: {
        backgroundColor:'red',
        borderRadius:20,
        elevation: 2,
        color:'white',
        padding:7,
        fontSize: 11,
        fontStyle: 'normal',
    },
});

const MyListViewItem = ({ title, status, id, onPress }) => {
    return (
    <TouchableOpacity onPress={()=>{onPress(id)}}>
        <ImageBackground style={styles.container}>
            <View style={styles.container_title}>
                <View style={{flex:1}}/>
                <View style={{flex:3}}>
                <Text style={styles.title}>
                    {title}
                </Text>
                </View>
                <View style={{flex:1}}/>
            </View>
            <View style={styles.container_status}>
                <Text style={styles.status}>
                    Trang thai: {status}
                </Text>
            </View>
            
        </ImageBackground>

    </TouchableOpacity>
)};

export default MyListViewItem;