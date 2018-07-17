import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
    App: {
        backgroundColor: 'skyblue',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    BtnRow: {
        flexDirection: 'row',
        alignSelf: 'center',
        padding: 25, 
        justifyContent: 'space-around'
    },
    SpinBtn: {
        backgroundColor: 'gray',
        height: 50,
        width: 120,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    ClearBtn: {
        backgroundColor: 'yellow',
        height:50,
        width:120, 
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    TextBox: {
        height: 50,
        width: 300,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'black', 
        backgroundColor: 'lightgray'
    },
    Text: {
        fontSize: 20
    },
    Header: {
        fontSize: 45,
        alignSelf: 'center',
        padding: 5
    }
})