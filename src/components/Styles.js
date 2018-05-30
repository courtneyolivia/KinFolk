// @flow
import {StyleSheet, Dimensions} from "react-native";

import variables from "../../native-base-theme/variables/commonColor";

const {width} = Dimensions.get("window");
const Styles = StyleSheet.create({
    
    headerMask: {
        backgroundColor: "rgba(0, 0, 0, .5)"
    },
    header: {
        width,
        height: width * (440 / 750)
    },
    flex: {
        flex: 1
    },
    flexGrow: {
        flex: 1
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
    textCentered: {
        textAlign: "center"
    },
    bg: {
        backgroundColor: "white"
    },
    row: {
        flexDirection: "row"
    },
    whiteBg: {
        backgroundColor: "white"
    },
    whiteText: {
        color: "white"
    },
    grayText: {
        color: variables.gray
    },
    listItem: {
        flexDirection: "row",
        borderBottomWidth: variables.borderWidth,
        borderColor: variables.listBorderColor
    }
});

export default Styles;
