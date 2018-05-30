// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {View, StyleSheet, Image, TouchableOpacity, SafeAreaView} from "react-native";
import {Button, H1, Icon, Header, Left, Right, Text} from "native-base";

import {Avatar, Images, Firebase, WindowDimensions, Styles} from "../components";

import type {NavigationProps} from "../components/Types";

import variables from "../../native-base-theme/variables/commonColor";

export default class Drawer extends React.Component<NavigationProps<>> {

    go(key: string) {
        this.props.navigation.navigate(key);
    }

    @autobind
    // eslint-disable-next-line class-methods-use-this
    logout() {
        Firebase.auth.signOut();
    }

    @autobind
    close() {
        this.go("DrawerClose");
    }

    @autobind
    profile() {
        this.go("Profile");
    }

    render(): React.Node {
        const navState = this.props.navigation.state;
        const currentIndex = navState.index;
        const items = navState.routes
            .filter(route => ["Settings", "Create"].indexOf(route.key) === -1)
            .map((route, i) => (
                <DrawerItem key={i} onPress={() => this.go(route.key)} label={route.key} active={currentIndex === i} />
            ));
        //
        return (
            <View style={Styles.flexGrow}>
                <Image source={Images.drawer} style={[StyleSheet.absoluteFill, style.img]} />
                <View style={[StyleSheet.absoluteFill, style.background]} />
                <SafeAreaView style={StyleSheet.absoluteFill}>
                    <View style={style.container}>
                        <Header style={style.header} noShadow>
                            <Left>
                                <Button transparent onPress={this.close}>
                                    <Icon name="ios-close-outline" style={style.closeIcon} />
                                </Button>
                            </Left>
                            <Right>
                                <Button transparent onPress={this.profile} style={style.button}>
                                    <Avatar size={50} style={style.avatar} />
                                </Button>
                            </Right>
                        </Header>
                        <View style={style.drawerItemsContainer}>
                            <View style={style.drawerItems}>{items}</View>
                        </View>
                        <View style={style.row}>
                            <DrawerIcon
                                label="settings"
                                icon="ios-settings-outline"
                                onPress={() => this.go("Settings")}
                            />
                            <DrawerIcon label="log out" icon="ios-log-out-outline" onPress={this.logout} />
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

type DrawerItemProps = {
    label: string,
    onPress: () => void,
    active?: boolean
};

// eslint-disable-next-line react/no-multi-comp
class DrawerItem extends React.PureComponent<DrawerItemProps> {
    render(): React.Element<React.ComponentType<Button>> {
        const {label, onPress, active} = this.props;
        const style = { color: active ? "white" : "rgba(255, 255, 255, .5)" };
        return (
            <Button onPress={onPress} full transparent>
                <H1 {...{style}}>{label}</H1>
            </Button>
        );
    }
}

type DrawerIconProps = {
    label: string,
    icon: string,
    onPress: () => void
};

// eslint-disable-next-line react/no-multi-comp
class DrawerIcon extends React.PureComponent<DrawerIconProps> {

    render(): React.Element<React.ComponentType<Button>> {
        const {label, icon, onPress} = this.props;
        return (
            <TouchableOpacity style={style.drawerIcon} onPress={onPress}>
                <Icon name={icon} style={style.drawerIconIcon} />
                <Text style={style.drawerIconLabel}>{label.toUpperCase()}</Text>
            </TouchableOpacity>
        );
    }
}

const style = StyleSheet.create({
    img: {
        ...WindowDimensions
    },
    container: {
        flexGrow: 1,
        justifyContent: "space-between"
    },
    header: {
        backgroundColor: "transparent"
    },
    background: {
        backgroundColor: "rgba(101, 99, 164, .9)"
    },
    closeIcon: {
        height: 50,
        fontSize: 50,
        color: "rgba(255, 255, 255, .5)"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: variables.contentPadding * 2
    },
    drawerItemsContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: variables.contentPadding * 6
    },
    drawerItems: {
        flex: 1,
        justifyContent: "space-between"
    },
    drawerIcon: {
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        height: 70
    },
    avatar: {
        marginTop: 12
    },
    drawerIconIcon: {
        color: "rgba(255, 255, 255, .5)",
        padding: variables.contentPadding
    },
    drawerIconLabel: {
        color: "white",
        fontSize: 12
    }
});
