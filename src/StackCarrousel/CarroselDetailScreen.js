import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');
import { SharedElement } from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';

const DURATION = 400;
const DELAY = 200;

const fadeInBottom = {
    0: {
        opacity: 0,
        translateY: 100,
    },
    1: {
        opacity: 1,
        translateY: 0
    }
}

const EventDetailScreen = ({ navigation, route }) => {
    const { item } = route.params;
    console.log('id imagen detalle:  ',`item.${item.key}.image` );
    return (
        <View style={{ flex: 1 }}>
            <SharedElement id={`item.${item.key}.image`}
                style={[
                    StyleSheet.absoluteFill
                ]}
            >
                <Image 
                    source={{ uri: item.poster }}
                    style={[
                        StyleSheet.absoluteFill,
                    ]}
                />
            </SharedElement>
            
            <Animatable.View 
                duration={DURATION * 1.5}
                delay={DELAY }
                animation='fadeIn'
                style={[
                    StyleSheet.absoluteFillObject,
                    {  
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        opacity: 0.3
                    }
                ]}
            />
            <AntDesign
                name="close"
                size={28}
                style={{ 
                    padding: 10,
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    zIndex: 2,
                }}
                color="#FFF"
                onPress={() => {
                    navigation.goBack();
                }}
            />
            <SharedElement id='general.bg'
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    transform: [{
                        translateY: height
                    }],
                  }
                ]}
              >
                <View style={[
                    StyleSheet.absoluteFillObject,
                    {
                        backgroundColor: '#fff',
                        transform: [{
                            translateY: -height * 0.3
                        }],
                        padding: 20,
                        borderRadius: 16
                    }
                ]}>
                    <Animatable.Text 
                        animation={fadeInBottom}
                        duration={DURATION}
                        delay={DELAY}
                        style={{
                        fontWeight: '900',
                        fontSize: 30
                    }}>
                        {item.title}
                    </Animatable.Text>
                    <Animatable.Text 
                        animation={fadeInBottom}
                        duration={DURATION}
                        delay={DELAY + 200}
                        style={{
                        fontWeight: '500',
                        fontSize: 16
                    }}>{item.location}</Animatable.Text>
                    <Animatable.Text 
                        animation={fadeInBottom}
                        duration={DURATION}
                        delay={DELAY + 300}
                        style={{
                            fontSize: 12
                        }}
                    >{item.date}</Animatable.Text>
                </View>
              </SharedElement>
            
        </View>
    )
}

EventDetailScreen.sharedElements = (route, otherRoute, showing) => {
    const { item } = route.params;
    return [
      {
        id:`item.${item.key}.image`
      },
      {
        id:`general.bg`
      },
    ]
  }

export default EventDetailScreen;