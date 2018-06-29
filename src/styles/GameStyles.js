import { StyleSheet } from 'react-native';

var pageColor = 'white';

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
        width: '80%',
        margin: 4,
    },
});
