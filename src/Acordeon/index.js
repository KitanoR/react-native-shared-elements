import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { StatusBar } from 'expo-status-bar';
import data from './data';
import { Transitioning, Transition  } from 'react-native-reanimated';

const transition = (
    <Transition.Together>
        <Transition.In type="fade" durationMs={200} />
        <Transition.Change />
        <Transition.Out type="fade" durationMs={200} />
    </Transition.Together>
);

const Acordeon = () => {
    const [currentId, setCurrentId] = React.useState(null);
    const ref = React.useRef();
    return (
        <Transitioning.View
            ref={ref}
            transition={transition}
            style={styles.container}
        >
            <StatusBar hidden />
            {
                data.map(({ bg, color, category, subCategories}, index) => {
                    return (
                        <TouchableOpacity 
                            key={category}
                            style={styles.cardContainer}
                            onPress={() => {
                                ref.current.animateNextTransition();
                                setCurrentId(index === currentId ? null : index);
                            }}
                            activeOpacity={0.9}
                        >
                            <View style={[ styles.card, { backgroundColor: bg }]}>
                                <Text style={[ styles.heading, { color }]}> { category } </Text>
                                {
                                    index === currentId && (
                                        <View style={styles.subCategoriesList}>
                                            {
                                                subCategories.map(subCategory => {
                                                    return (
                                                        <Text key={subCategory} style={[ styles.body,  { color  } ]}>
                                                            {subCategory}
                                                        </Text>
                                                    );
                                                })
                                            }
                                        </View>
                                    )
                                }
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
        </Transitioning.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
      },
      cardContainer: {
        flexGrow: 1,
      },
      card: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      heading: {
        fontSize: 38,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: -2,
      },
      body: {
          fontSize: 20,
          lineHeight: 20 * 1.5,
          textAlign: 'center',
      },
      subCategoriesList: {
          marginTop: 20,
      }
});

export default Acordeon;