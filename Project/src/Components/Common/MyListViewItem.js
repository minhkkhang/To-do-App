
import React from 'react';
import { View, Text, StyleSheet,TouchableWithoutFeedback} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 20,
        backgroundColor: 'powderblue',
        elevation: 2,
    },
    title: {
        color:'steelblue',
        fontSize: 20,
        fontWeight:'bold',
        flex: 1, flexWrap: 'wrap',textAlign:'center'
    },
    container_title: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        marginBottom:10
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
    <TouchableWithoutFeedback onPress={()=>{onPress(id)}}>
        <View style={styles.container}>
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
            
        </View>

    </TouchableWithoutFeedback>
)};

export default MyListViewItem;