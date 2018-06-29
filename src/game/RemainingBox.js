import { StyleSheet } from 'react-native';
import Box from './Box';

export default class RemainingBox extends Box {
    static defaultProps = {
        enabled: true,
    };

    handlePress = () => {
        const { enabled, boxValue, onPress } = this.props;
        if (enabled) {
            onPress(boxValue);
        }
    };

    render() {
        return super.render(styles.boxSize, 'remainingbox');
    }
}

const styles = StyleSheet.create({
    boxSize: {
        height: 40,
        width: 40,
    },
});
