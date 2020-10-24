import {Dimensions} from 'react-native';

export const _styles = {
    container: {
      backgroundColor: 'white',
      flex:1,
      flexDirection: 'column'
    },
    floatingbutton: {
      //Here is the trick
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      left: 20,
      bottom: 20,
   },
    floatingbuttonstyle: {
      resizeMode:'contain',
      width: 50,
      height: 50,
      //backgroundColor:'black'
    },
    centeredView: {
      position: 'absolute',
      height:350,
      width:Dimensions.get('screen').width-40,
      left: 20,
      bottom: 80
    },
    textcontainer1:{
      borderWidth:1,
      marginVertical:5,
      height:50,
      borderRadius:20,
      width:Dimensions.get('screen').width-100,
      backgroundColor:'red'
    },
    textcontainer2:{
      borderWidth:1,
      marginVertical:5,
      height:170,
      width:Dimensions.get('screen').width-100,
      borderRadius:20
    },
    modalView: {
      flex:1,
      flexDirection:'column',
      backgroundColor: "white",
      borderRadius: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderWidth:2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "left",
    },
    titleStyle: {
      color: "black",
      fontWeight: "bold",
      textAlign: "left",
      fontSize:24
    },
    modalText: {
      marginBottom: 15,
      textAlign: "left"
    },
    modalbuttonscontainer:{
      marginTop:10,
      flexDirection:'row',
      height: 50
    },
    modalOptionButton:{
      borderRadius: 10,
      padding: 20,
      justifyContent:'center',
      elevation: 2,
      height:36,
      marginRight:5,
      backgroundColor:'#17c'
    }
  }