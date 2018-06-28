import Box from './Box';

export default class RemainingBox extends Box {
    static defaultProps = {
        enabled: true,
    };

    press = () => {
        const { enabled, boxValue, onPress } = this.props;
        if (enabled) {
            onPress(boxValue);
        }
    };

    render() {
        return super.render();
    }
}
