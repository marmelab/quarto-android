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

    handlePress = () => {
        const { enabled, x, y, onPress } = this.props;
        if (enabled) {
            onPress(x, y);
        }
    };

    render() {
        return super.render(
            styles.boxSize,
            'gridbox_x' + String(this.props.x) + '_y' + String(this.props.y),
        );
    }
}

const styles = StyleSheet.create({
    boxSize: {
        height: 60,
        width: 60,
    },
});
