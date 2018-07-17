import React from 'react';
import { StyleSheet, View, Animated, Easing, Image, 
        TouchableHighlight, Text as RNText, Platform, 
        TextInput, KeyboardAvoidingView } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { Text } from 'react-native-svg'

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
            }]
        }
        this.spinValue = new Animated.Value(0)
        this.spin = this.spin.bind(this)
        this.toggleSpin = this.toggleSpin.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.clear = this.clear.bind(this)
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
                // this.spinValue.addListener((val)=> {console.log(val)})
            }
            else {
              this.spinValue.setValue(position)   //add decay? to make to slow down smoothly. make it obvious that it is slowing down
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
            if (this.state.data[0].key === 0) {
                this.state.data.pop()
            }
            this.setState({ 
                data: this.state.data.concat(                {
                    key: ++key,
                    amount: 50,
                    svg: { fill: '#600000' },
                    name: this.state.text
                })
            })
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
        }

      render() {
         console.log(this.state.text)
        // const data = [
        //     {
        //         key: 1,
        //         amount: 50,
        //         svg: { fill: '#600080' },
        //         name: 'McDonalds',
                
        //     },
            // {
            //     key: 2,
            //     amount: 50,
            //     svg: { fill: '#9900cc' }, 
            //     name: 'Make Food'
            // },
        //     {
        //         key: 3,
        //         amount: 50,
        //         svg: { fill: '#c61aff' }, 
        //         name: 'Chipotle'
        //     },
        //     {
        //         key: 4,
        //         amount: 50,
        //         svg: { fill: '#d966ff' },
        //         name: 'Hibachi'
        //     },
        //     {
        //         key: 5,
        //         amount: 50,
        //         svg: { fill: '#ecb3ff' },
        //         name: 'Chilis'
        //     }
        // ]
        let data = this.state.data
        const Labels = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <Text
                        key={index}
                        x={pieCentroid[ 0 ]}
                        y={pieCentroid[ 1 ]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={24}
                        stroke={'black'}
                        strokeWidth={0.2}
                        height={15}
                        width={15}
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
            <KeyboardAvoidingView behavior="position" enabled>
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
            <TouchableHighlight style={{backgroundColor: 'gray', height: 50, width: 150}} 
                onPress={this.toggleSpin }>
                <RNText>{this.state.isSpinning ? 'Stop' : 'Start'}</RNText>
            </TouchableHighlight>
            <TouchableHighlight style={{backgroundColor: 'yellow', height:50, width:150}}
                onPress={this.clear}>
                <RNText>Clear</RNText>
            </TouchableHighlight>
            <TextInput style={{height: 40}} placeholder="ENTER RESTAURANT HERE"  
                       onChangeText={(text) => this.setState({text})}
                       onSubmitEditing={this.handleSubmit}
                       value={this.state.text}/>
            </KeyboardAvoidingView>
        )
    }
}

//generate a random color for pie chart
//map through a list
//make it start and stop on the touchablehighlight
// add a "remove" dropdown list of what has been enterd
//store the data on whatever is equivalient to local storage for react native
//styleing
//