/**
 * Inspiration: https://dribbble.com/shots/8257559-Movie-2-0
 *
 */
import React, { useState, useEffect, useRef } from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { getMovies } from './api';
import { Generos, Ratinkg } from './components';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Rect } from 'react-native-svg';
import MaskedView from '@react-native-community/masked-view';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Cargando...</Text>
  </View>
);


const Backdrop = ({ movies, scrollX }) => {
    return (
        <View
            style={{
                position: 'absolute',
                width,
                height: BACKDROP_HEIGHT
            }}
        >
                <FlatList 
                    data={movies}
                    keyExtractor={(item) => item.key }
                    renderItem={({item, index}) =>{
                        if (!item.backdrop) {
                            return null;
                        }
                        const inputRange = [
                            (index - 2) * ITEM_SIZE,
                            (index - 1) * ITEM_SIZE
                        ]
                        const translateX = scrollX.interpolate({
                            inputRange,
                            outputRange: [ -width, 0 ]
                        })
                        return (
                            <MaskedView
                                style={{ position: 'absolute' }}
                                maskElement={
                                    <AnimatedSvg
                                        width={width}
                                        height={height}
                                        viewBox={`0 0 ${width} ${height}`}
                                        style={{ transform: [{ translateX  }] }}
                                    >
                                        <Rect 
                                            x='0'
                                            y='0'
                                            width={width}
                                            height={height}
                                            fill="red"
                                        />
                                    </AnimatedSvg>
                                }    
                            >
                                <Image 
                                    source={{ uri: item.backdrop }}
                                    style={{
                                        width,
                                        height: BACKDROP_HEIGHT,
                                        resizeMode: 'cover'
                                    }}
                                />
                            </MaskedView>
                        )
                    }}
                />
                <LinearGradient 
                    colors={[ 'transparent', 'white' ]}
                    style={{
                        width,
                        height: BACKDROP_HEIGHT,
                        position: 'absolute',
                        bottom: 0
                    }}
                />
        </View>
    )
}


export default  () => {
    const [ movies, setMovies ] = useState([]);
    const scrollX = useRef(new Animated.Value(0)).current;

    const fetchData = async () => {
    const movies = await getMovies();
    setMovies([{key: 'left-spacer'}, ...movies, { key: 'right-spacer' } ]);
      // Add empty items to create fake space
    };
  

    useEffect(() => {
        
        if (movies.length === 0) {
            fetchData(movies);
        }
    }, [movies]);
    if (movies.length === 0) {
        return <Loading />
    }
    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <Backdrop movies={movies} scrollX={scrollX} />
            <Animated.FlatList
                showsHorizontalScrollIndicator={false}
                data={movies}
                keyExtractor={(item) => item.key}
                horizontal
                contentContainerStyle={{
                    alignContent: 'center'
                }}
                snapToInterval={ITEM_SIZE}
                decelerationRate={0}
                bounces={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                renderItem={({item, index}) => {
                    if (!item.poster) {
                        return(
                            <View 
                                style={{
                                    width: EMPTY_ITEM_SIZE,
                                }}
                            />
                        )
                    }
                    const inputRange = [
                        (index - 2) * ITEM_SIZE, //anterior
                        (index - 1) * ITEM_SIZE, //actual
                        (index) * ITEM_SIZE //siguiente
                    ]
                    const translateY = scrollX.interpolate({
                        inputRange,
                        outputRange: [100, 50, 100]
                    })
                    return (
                        <View style={{ width: ITEM_SIZE }}>
                            <Animated.View
                                style={{
                                    marginHorizontal: SPACING,
                                    padding: SPACING * 2,
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    borderRadius: 34,
                                    transform: [{ translateY  }]
                                }}
                            >
                                <Image
                                    source={{ uri: item.poster }}
                                    style={styles.posterImage}
                                />
                                <Text style={{ fontSize: 24 }} numberOfLines={1}>
                                    {item.title}
                                </Text>
                                <Ratinkg rating={item.rating} />
                                <Generos genres={item.genres} />
                                <Text style={{ fontSize: 12, textAlign: 'justify' }} numberOfLines={3}>
                                    {item.description}
                                </Text>
                            </Animated.View>
                        </View>
                    )
                }}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      container: {
        flex: 1,
        paddingTop: height * 0.2
      },
      paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      posterImage: {
        width: '100%',
        height: ITEM_SIZE * 1.2,
        resizeMode: 'cover',
        borderRadius: 24,
        margin: 0,
        marginBottom: 10,
      },
  });