import React from 'react';
import { View, FlatList, StyleSheet} from 'react-native';
import MyListViewItem from './MyListViewItem';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


const MyListview = ({ itemList,onPress }) => (
    <View style={styles.container}>
        <FlatList
                data={itemList}
                renderItem={({ item }) => (<MyListViewItem
                    title={item.taskName}
                    status={item.status}
                    id={item.id}
                    onPress={onPress}
                />)}
                keyExtractor={(item) => item.id.toString()}
            />

    </View>
);

export default MyListview;