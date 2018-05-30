// @flow
import * as React from "react";
import {View, StyleSheet} from "react-native";
import {Spinner} from "native-base";

import WindowDimensions from "./WindowDimensions";

// eslint-disable-next-line react/prefer-stateless-function
export default class LoadingIndicator extends React.PureComponent<{}> {

    render(): React.Node {
        return (
            <View style={style.spinner}>
                <Spinner color="white" />
            </View>
        );
    }
}

const style = StyleSheet.create({
    spinner: {
        width: 80,
        backgroundColor: "rgba(0, 0, 0, .8)",
        position: "absolute",
        top: (WindowDimensions.height / 2) - 40,
        left: (WindowDimensions.width / 2) - 40,
        borderRadius: 5,
        zIndex: 1000
    }
});
