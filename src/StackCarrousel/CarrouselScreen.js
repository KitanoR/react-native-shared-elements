import * as React from 'react';
import { useState } from 'react';
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
const { width, height } = Dimensions.get('screen');
import { EvilIcons } from '@expo/vector-icons';
import {
  FlingGestureHandler,
  Directions,
  State,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { SharedElement } from 'react-navigation-shared-element';

// https://www.creative-flyers.com
const DATA = [
  {
    key: "1",
    title: 'Afro vibes',
    location: 'Mumbai, India',
    date: 'Nov 17th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/07/Afro-vibes-flyer-template.jpg',
  },
  {
    key: "2",
    title: 'Jungle Party',
    location: 'Unknown',
    date: 'Sept 3rd, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2019/11/Jungle-Party-Flyer-Template-1.jpg',
  },
  {
    key: "3",
    title: '4th Of July',
    location: 'New York, USA',
    date: 'Oct 11th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/4th-Of-July-Invitation.jpg',
  },
  {
    key: "4",
    title: 'Summer festival',
    location: 'Bucharest, Romania',
    date: 'Aug 17th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/07/Summer-Music-Festival-Poster.jpg',
  },
  {
    key: "5",
    title: 'BBQ with friends',
    location: 'Prague, Czech Republic',
    date: 'Sept 11th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/BBQ-Flyer-Psd-Template.jpg',
  },
  {
    key: "6",
    title: 'Festival music',
    location: 'Berlin, Germany',
    date: 'Apr 21th, 2021',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/Festival-Music-PSD-Template.jpg',
  },
  {
    key: "7",
    title: 'Beach House',
    location: 'Liboa, Portugal',
    date: 'Aug 12th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/Summer-Beach-House-Flyer.jpg',
  },
];

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;


const OverFlowItems = ({ data, scrollXAnimated }) =>{
    const inputRange = [ -1, 0, 1 ]
    const translateY = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [ OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT ]
    });
    return (
        <View style={styles.overflowContainer}>
            <Animated.View
              style={{
                transform: [
                  { translateY }
                ]
              }}
            >
                {
                    data.map((item, index) => {
                        return (
                          <View key={index} style={styles.itemContainer}>
                            <Text style={[styles.title]} numberOfLines={1}>
                              {item.title}
                            </Text>
                            <View style={styles.itemContainerRow}>
                              <Text style={[styles.location]}>
                                <EvilIcons
                                  name='location'
                                  size={16}
                                  color='black'
                                  style={{ marginRight: 5 }}
                                />
                                {item.location}
                              </Text>
                              <Text style={[styles.date]}>{item.date}</Text>
                            </View>
                          </View>
                        )
                    })
                }
            </Animated.View>
        </View>
    )
}

const EventScreen =  ({ navigation }) => {
  const [data, setData] = useState(DATA);
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [ index, setIndex ] = useState(0);

  const setActiveIndex = React.useCallback((activeIndex) => {
    setIndex(activeIndex);
    scrollXIndex.setValue(activeIndex);
  });

  React.useEffect(() => {
    if (index === data.length - VISIBLE_ITEMS) {
      const newData = [...data, ...data];
      // setData(newData);
    }
  });

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();

  })
    return (
      <FlingGestureHandler
        key='left'
        direction={Directions.LEFT}
        onHandlerStateChange={ev => {
          if (ev.nativeEvent.state  === State.END) {
            if (index === data.length - 1) {
              return ;
            }
            // set active  index
            setActiveIndex(index + 1);
          }
        }}
      >
        <FlingGestureHandler
          key='right'
          direction={Directions.RIGHT}
          onHandlerStateChange={ev => {
            if (ev.nativeEvent.state  === State.END) {
              if (index === 0) {
                return ;
              }
              // set active  index
              setActiveIndex(index - 1);
            }
          }}
        >
            <SafeAreaView style={styles.container}>
              <StatusBar hidden />
              <OverFlowItems
                data={data}
                scrollXAnimated={scrollXAnimated}
              />
              <FlatList 
                data={data}
                keyExtractor={(item) => item.key}
                horizontal
                inverted
                scrollEnabled={false}
                removeClippedSubviews={false}
                contentContainerStyle={{
                  flex: 1,
                  justifyContent:'center',
                  padding: SPACING * 2,
                }}
                CellRendererComponent={({ item, index, children , style, ...props }) => {
                  const newState = [
                    style,
                    { zIndex: data.length - index }
                  ]
                  return (
                    <View style={newState} index={index} {...props}>
                      {children}
                    </View>
                  )
                }}
                renderItem={({ item, index: indice }) => {
                  const inputRange = [
                    indice - 1,
                    indice,
                    indice + 1
                  ];
                  const translateX = scrollXAnimated.interpolate({
                    inputRange,
                    outputRange: [ 50, 0, -10 ]
                  });
                  const scale = scrollXAnimated.interpolate({
                    inputRange,
                    outputRange: [ .8, 1, 1.3 ]
                  })
                  const opacity = scrollXAnimated.interpolate({
                    inputRange,
                    outputRange: [(1 -1 / VISIBLE_ITEMS), 1, 0 ]
                  })
                  console.log('id imagen general:  ',`item.${item.key}.image` );
                  return (
                    <Animated.View style={{ 
                        position: 'absolute',
                        left: -ITEM_WIDTH / 2,
                        opacity: opacity,
                        transform: [
                          { translateX },
                          { scale }
                        ]
                      }}>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          onPress={() => {
                            navigation.navigate('EventDetailScreen', {
                              item: data[index]
                            })
                          }}
                        >
                          <SharedElement id={`item.${item.key}.image`}>
                            <Image 
                              source={{ uri: item.poster }}
                              style={{
                                width: ITEM_WIDTH,
                                height: ITEM_HEIGHT
                              }}
                            />
                          </SharedElement>
                        </TouchableOpacity>
                    </Animated.View>
                  )
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
                      backgroundColor: 'white',
                      borderRadius: 16
                  }
              ]}/>
              </SharedElement>
          </SafeAreaView>
        </FlingGestureHandler>
      </FlingGestureHandler>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
      },
      title: {
        fontSize: 28,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: -1,
      },
      location: {
        fontSize: 16,
      },
      date: {
        fontSize: 12,
      },
      itemContainer: {
        height: OVERFLOW_HEIGHT,
        padding: SPACING,
      },
      itemContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      overflowContainer: {
        height: OVERFLOW_HEIGHT,
        overflow: 'hidden',
      },
})



export default EventScreen;