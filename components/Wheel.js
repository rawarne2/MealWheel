import React from 'react';
import { StyleSheet, View, Animated, Easing, Image, TouchableHighlight, Text as RNText} from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { Text } from 'react-native-svg'

const timing = 1000
let position

export default class Wheel extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            isSpinning: false
        }
        this.spinValue = new Animated.Value(0)
        this.spin = this.spin.bind(this)
        this.toggleSpin = this.toggleSpin.bind(this)
      }
    
      spin () {
        console.log('IT SHOULD BE SPINNING!!!')
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
              this.spinValue.setValue(position)   //add decay? to make to slow down smoothly
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
      
      render() {
         
        const data = [
            {
                key: 1,
                amount: 50,
                svg: { fill: '#600080' },
                name: 'McDonalds',
                
            },
            {
                key: 2,
                amount: 50,
                svg: { fill: '#9900cc' }, 
                name: 'Make Food'
            },
            {
                key: 3,
                amount: 50,
                svg: { fill: '#c61aff' }, 
                name: 'Chipotle'
            },
            {
                key: 4,
                amount: 50,
                svg: { fill: '#d966ff' },
                name: 'Hibachi'
            },
            {
                key: 5,
                amount: 50,
                svg: { fill: '#ecb3ff' },
                name: 'Chilis'
            }
        ]

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
            <View>
            <Image source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Red_Arrow_Down.svg/600px-Red_Arrow_Down.svg.png'}}
                   style={{width: 40, height: 50, alignSelf: 'center'}}
                   />
            <Animated.View className="spinner" style={{  transform: [{'rotate': spin}],
            // perspective: 1000     // without this line this Animation will not render on Android while working fine on iOS. Make ternary for if its an Android
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
            <TouchableHighlight style={{backgroundColor: 'gray', height: 75, width: 250}} 
                onPress={this.toggleSpin }>
                <RNText>{this.state.isSpinning ? 'Stop' : 'Start'}</RNText>
            </TouchableHighlight>
            </View>
        )
    }
}

//generate a random color for pie chart
//map through a list
//make it start and stop on the touchablehighlight