import React from 'react';
import { FlatList, ImageBackground} from 'react-native';
import MyListViewItem from './MyListViewItem';



const MyListview = ({source,itemList,onPress}) => (
    <ImageBackground source={source} style={{flex:1,paddingLeft:55}}>
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

    </ImageBackground>
);

export default MyListview;