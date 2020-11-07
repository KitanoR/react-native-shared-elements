import React from 'react'
import {
    findNodeHandle,
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    Animated,
    TouchableOpacity,
} from 'react-native';
const { width, height } = Dimensions.get('screen');
import { StatusBar } from 'expo-status-bar';


const images = {
    man: 'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    woman: 'https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    kids: 'https://images.pexels.com/photos/3771510/pexels-photo-3771510.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    skullcandy: 'https://images.pexels.com/photos/5600421/pexels-photo-5600421.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    help: 'https://images.pexels.com/photos/775943/pexels-photo-775943.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
};

const data = Object.keys(images).map((i) => ({
    key: i,
    title: i,
    image: images[i],
    ref: React.createRef(),
}))



const Indicator = ({ measures, scrollX }) => {
    const inputRange = data.map((_, i) => i * width);
    const indicatorWidth = scrollX.interpolate({
        inputRange,
        outputRange: measures.map((measure) => measure.width)
    });
    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: measures.map((measure) => measure.x)
    })
    return (
        <Animated.View 
            style={{
                position: 'absolute',
                height: 4,
                width: indicatorWidth,
                left: 0,
                backgroundColor: 'white',
                bottom: -10,
                transform: [
                    { translateX }
                ],
                borderRadius: 10,
            }}
        />
    )
}

const Tab = React.forwardRef(({ item, onItemPress }, ref) => {
    return (
        <TouchableOpacity onPress={onItemPress}>
            <View ref={ref}>
                <Text style={{ 
                    color: 'white', 
                    fontSize: 84 / data.length,
                    fontWeight: '800',
                    textTransform: 'uppercase'
                }}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    )
})



const Tabs = ({ data, scrollx, onItemPress }) => {
    const [measures, setMeasures] = React.useState([]);
    const containerRef = React.useRef();

    React.useEffect(() => {
        const m = [];
        data.forEach((item) => {
           item.ref.current.measureLayout(
               containerRef.current,
               (x, y, width, height) => {
                   m.push({ x,y, width, height });
                   if(m.length === data.length) {
                       setMeasures(m);
                   }
               }
           )
        })
    }, []);
    return (
        <View style={{ position: 'absolute', top: 100, width }}>
            <View
                ref={containerRef}
                style={{ 
                    justifyContent: 'space-evenly', 
                    flex: 1, 
                    flexDirection: 'row' 
                }}
            >
                {data.map((item, index) => (
                    <Tab 
                        key={item.key} 
                        item={item}
                        ref={item.ref} 
                        onItemPress={() => onItemPress(index)}
                    />
                ))}
            </View>
            { measures.length > 0 && <Indicator measures={measures} scrollX={scrollx} />}
        </View>
    )
}
const IndicicadorScreen = ({}) => {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const ref = React.useRef();
    const onItemPress = React.useCallback( itemIndex => {
        ref?.current?.scrollToOffset({
            offset: itemIndex * width,
        })
    });
    return (
        <View>
            <StatusBar hidden />
            <Animated.FlatList 
                ref={ref}
                data={data}
                keyExtractor={item => item.key}
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                pagingEnabled
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                renderItem={({item}) => {
                    return (
                        <View 
                            style={{ width, height }}
                        >
                            <Image 
                                source={{ uri: item.image }}
                                style={{ flex: 1, resizeMode: 'cover' }}
                            />
                            < View style={[
                                StyleSheet.absoluteFillObject,
                                { backgroundColor: 'rgba(0, 0, 0, 0.3)' }
                            ]} />
                        </View>
                    )
                }}
            />
            <Tabs scrollx={scrollX} data={data} onItemPress={onItemPress}/>
            
        </View>
    );
};


export default IndicicadorScreen;