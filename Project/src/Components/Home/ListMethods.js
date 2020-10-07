import { useState } from 'react';
import * as React from 'react';

class ListMethods {
  static 
}
[list,setList]=useState([]);

const initiateList = async() =>{
  var newList=[
    {
      taskName: 'Hoc react native',
      status:'Doing',
      startDate:'01/10/2020',
      endDate:'Unknown',
      detail:'Hoc Hook, props, navigation, redux'
    },
    {
      taskName: 'Chuan bi giay to',
      status:'Not started',
      startDate:'Unknown',
      endDate:'Unknown',
      detail:`1: 4 ban photo CMND \n 2:3 anh the \n 3:Giay xac nhan o truong.`
    },
    {
      taskName: 'Di phong van thuc tap',
      status:'Done',
      startDate:'18/09/2020',
      endDate:'18/09/2020',
      detail:'Di phong van thuc tap tai MeU Solutions'
    },
    {
      taskName: 'Deadline do an mon Kien Truc Phan Mem',
      status:'Doing',
      startDate:'06/10/2020',
      endDate:'Unknown',
      detail:'Lop Kien Truc Phan Mem 17_32'
    },
    {
      taskName: 'Task 5',
      status:'Done',
      startDate:'01/09/2020',
      endDate:'20/09/2020',
      detail:'This is task 5'
    },
    {
      taskName: 'Task 6',
      status:'Not Started',
      startDate:'20/10/2020',
      endDate:'Unknown',
      detail:'This is task 6'
    }
  ];
  setList(newList);
}
const GetFullList = () =>{

}
const GetListByCategory = (category) => {
    const { signOut } = React.useContext(AuthContext);
    const userName='world';
    const logOut=async ()=>{
        signOut();
    }
  
    return (
        <View style={styles.parentView}>
        <View style={styles.buttonContainer}>
                <MyButton text="Dang xuat" onPress={() => logOut()} 
                source={loginImg} height={50} backgroundColor='steelblue'/>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>{userName}</Text>
        </View>
        
      </View>
    );
};
export default Home;
  

