// @flow
import * as React from "react";
import {View} from "react-native";

type CircleProps = {
    size: number,
    color: string,
    children?: React.Node,
    style?: number
};

export default class Circle extends React.PureComponent<CircleProps> {
    render(): React.Node {
        const {size, color, style} = this.props;
        const circleStyle = {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
            alignItems: "center",
            justifyContent: "center"
        };
        return <View style={[circleStyle, style]}>{this.props.children}</View>;
    }
}
