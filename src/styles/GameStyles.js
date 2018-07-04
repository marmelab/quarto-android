import { StyleSheet } from 'react-native';

const pageColor = 'white';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: pageColor,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    button: {
        display: 'flex',
        margin: 4,
    },
    buttonContainer: {
        alignItems: 'stretch',
        width: '100%',
        margin: 0,
    },
    tabContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
    },
    tabTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 50,
        height: '100%',
    },
});
