import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FlatList, ImageBackground} from 'react-native';
import MyListViewItem from './MyListViewItem';




const MyListview = ({source,category,onPress,width}) => {
    //const dispatch = useDispatch()
    const list =useSelector(state => state.todo.list)
    const itemList=[];
    switch(category){
        case 'all':{
            for(i=0;i<list.length;i++){
                itemList.push(list[i]);
            }
            break;
        }
        default:{
            for(i=0;i<list.length;i++){
                if(list[i].status===category)itemList.push(list[i]);
            }
            break;
        }
    }

    return (
    <ImageBackground source={source} style={{flex:1,paddingHorizontal:20, paddingVertical:5}}>
        <FlatList
                data={itemList}
                renderItem={({ item }) => (<MyListViewItem
                    title={item.taskName}
                    status={item.status}
                    id={item.id}
                    onPress={onPress}
                    width={width-40}
                />)}
                keyExtractor={(item) => item.id.toString()}
            />

    </ImageBackground>
    )
};

export default MyListview;