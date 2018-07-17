import React from 'react';
import { StyleSheet, View, Animated, Easing, Image, 
        TouchableHighlight, Text as RNText, Platform, 
        TextInput, KeyboardAvoidingView, Picker } from 'react-native';
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import styles from '../Styles'

const timing = 1000
let position
let key = 0

export default class Wheel extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            isSpinning: false,
            text: '',
            data: [{
                key: 0,
                amount: 50,
                svg: { fill: '#9900cc' }, 
                name: 'Enter Food'
            }],
            count: 1
        }
        this.spinValue = new Animated.Value(0)
        this.spin = this.spin.bind(this)
        this.toggleSpin = this.toggleSpin.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.clear = this.clear.bind(this)
        this.getRandomColor = this.getRandomColor.bind(this)
      }
    
      spin () {
        this.spinValue.setValue(0)
        Animated.timing(
          this.spinValue,
          {
            toValue: 1,
            duration: timing,
            easing: Easing.linear
          }
        ).start(() => {
            if (this.state.isSpinning) {
                this.spin()
            }
            else {
            Animated.timing(this.spinValue, {
                duration: 3000,
                easing: Easing.out(Easing.ease),
                toValue: position,
            }).start(() => console.log('animation complete'))
            }
        })
      }

        toggleSpin () {
            position = this.spinValue._value
            this.spin()
            this.setState(prevState => ({
                isSpinning: !prevState.isSpinning
            }))
        }

        handleSubmit() {
            if (this.state.data[0].key == 0 && this.state.text) {
                this.setState({data: [{
                    key: this.state.count,
                    amount: 50,
                    svg: { fill: this.getRandomColor() },
                    name: this.state.text}]})
            }
            else if (this.state.text) {
            this.setState({ 
                data: this.state.data.concat({
                    key: ++this.state.count,
                    amount: 50,
                    svg: { fill: this.getRandomColor() },
                    name: this.state.text
                })
            })
        }
            this.setState({ text: '' })
        } 
      
        clear() {
            this.setState({
                data: [{
                    key: 0,
                    amount: 50,
                    svg: { fill: '#9900cc' }, 
                    name: 'Enter Food'
                }]
            })
            this.spinValue.setValue(1)
        }

        getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
          }

      render() {
        let data = this.state.data
        const Labels = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { pieCentroid, data } = slice;
                return (
                    <Text
                        key={index}
                        x={pieCentroid[ 0 ]}
                        y={pieCentroid[ 1 ]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={24}
                    >
                        {data.name}
                    </Text>
                )
            })
        }
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
          })
        return (
            <KeyboardAvoidingView behavior="position" enabled style={styles.Wheel}>
            <RNText style={styles.Header}>MEAL WHEEL</RNText>
            <Image source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Red_Arrow_Down.svg/600px-Red_Arrow_Down.svg.png'}}
                   style={{width: 40, height: 50, alignSelf: 'center'}}
                   />
            <Animated.View className="spinner" style={{  transform: [{'rotate': spin}],
            ...Platform.select({ 
                android: { perspective: 1000 }  // without this line this Animation will not render on Android while working fine on iOS. Make ternary for if its an Android
            })     
            }}>
            <PieChart
                style={{ height: 350, width:350}}
                valueAccessor={({ item }) => item.amount}
                data={data}
                spacing={0}
                innerRadius={'20%'}
            >
                <Labels/>
            </PieChart>
            </Animated.View>
            <View style={styles.BtnRow}>
            <TouchableHighlight style={styles.ClearBtn}
            onPress={this.clear}>
            <RNText style={styles.Text}>Clear</RNText>
            </TouchableHighlight>
            <TouchableHighlight style={styles.SpinBtn} 
                onPress={this.toggleSpin}>
                <RNText style={styles.Text}>{this.state.isSpinning ? 'Stop' : 'Spin'}</RNText>
            </TouchableHighlight>
            </View>
            <TextInput style={styles.TextBox} placeholder="ENTER MEAL HERE"  
                       onChangeText={(text) => this.setState({text})}
                       onSubmitEditing={this.handleSubmit}
                       value={this.state.text}/>
            </KeyboardAvoidingView>
        )
    }
}

//spins backwards when it stops. Is that bad or does it make it more interesting???
// add a "remove" dropdown list (Picker) or click on a section to remove it
//store the data on whatever is equivalient to local storage for react native
//styling