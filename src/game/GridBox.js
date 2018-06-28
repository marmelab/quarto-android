import PropTypes from 'prop-types';
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
        return super.render();
    }
}
