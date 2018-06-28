import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import Box from './Box';

export default class GridBox extends Box {
    static propTypes = {
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    };

    static defaultProps = {
        enabled: true,
    };

    press = () => {
        const { enabled, x, y, onPress } = this.props;
        if (enabled) {
            onPress(x, y);
        }
    };

    render() {
        return super.render(styles.boxSize);
    }
}

const styles = StyleSheet.create({
    boxSize: {
        height: 60,
        width: 60,
    },
});
