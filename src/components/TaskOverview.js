// @flow
import * as React from "react";
import {StyleSheet, View, Text} from "react-native";
import {H1} from "native-base";

import Styles from "./Styles";

import variables from "../../native-base-theme/variables/commonColor";

type TaskOverviewProps = {
    completed: number,
    overdue: number
};

export default class TaskOverview extends React.PureComponent<TaskOverviewProps> {
    render(): React.Node {
        const {completed, overdue} = this.props;
        return (
            <View style={Styles.row}>
                <View style={[style.count, Styles.center, style.left]}>
                    <Text style={Styles.whiteText}>COMPLETED</Text>
                    <H1 style={style.heading}>{`${completed}`}</H1>
                </View>
                <View style={[style.count, Styles.center, style.right]}>
                    <Text style={Styles.whiteText}>OVERDUE</Text>
                    <H1 style={style.heading}>{`${overdue}`}</H1>
                </View>
            </View>
        );
    }
}

const padding = variables.contentPadding * 2;
const style = StyleSheet.create({
    count: {
        flex: 0.5,
        padding
    },
    heading: {
        color: "white",
        paddingTop: padding
    },
    left: {
        backgroundColor: variables.brandInfo
    },
    right: {
        backgroundColor: variables.brandSecondary
    }
});
