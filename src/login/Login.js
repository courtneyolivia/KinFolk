// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {observer} from "mobx-react/native";
import {View, Image, StyleSheet, SafeAreaView} from "react-native";
import {H1, Button, Text, Spinner, Input, Content} from "native-base";
import {Constants} from "expo";

import LoginStore from "./LoginStore";

import {Small, Styles, Images, Field, WindowDimensions} from "../components";
import {AnimatedView} from "../components/Animations";
import type {ScreenProps} from "../components/Types";

import variables from "../../native-base-theme/variables/commonColor";

@observer
export default class Login extends React.Component<ScreenProps<>> {

    store = new LoginStore();
    password: Input;

    @autobind
    setPasswordRef(password: Input) {
        this.password = password._root;
    }

    @autobind
    goToPassword() {
        this.password.focus();
    }

    @autobind
    async signIn(): Promise<void> {
        try {
            await this.store.login();
        } catch(e) {
            alert(e.message);
        }
    }

    @autobind
    signUp() {
        this.props.navigation.navigate("SignUp");
    }

    @autobind
    forgotPassword() {
        this.props.navigation.navigate("ForgotPassword");
    }

    render(): React.Node {
        return (
            <View style={Styles.flexGrow}>
                <Image source={Images.login} style={[StyleSheet.absoluteFill, style.img]} />
                <View style={[StyleSheet.absoluteFill, Styles.imgMask]} />
                <SafeAreaView style={StyleSheet.absoluteFill}>
                    <Content style={style.content}>
                        <AnimatedView
                            style={{ height: height - Constants.statusBarHeight, justifyContent: "center" }}
                        >
                        <View style={style.logo}>
                            <View>
                              <H1 style={style.title}>Memories Cherished!</H1>
                            </View>
                        </View>
                        <View style={style.blur}>
                            <Field
                                label="Email"
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                                returnKeyType="next"
                                onChange={email => this.store.email = email}
                                onSubmitEditing={this.goToPassword}
                                inverse
                            />
                            <Field
                                label="Password"
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="go"
                                onChange={password => this.store.password = password}
                                textInputRef={this.setPasswordRef}
                                onSubmitEditing={this.signIn}
                                last
                                inverse
                            />
                            <View>
                                <View>
                                    <Button success full onPress={this.signIn}>
                                    {this.store.loading ? <Spinner color="black" /> : <Text>Sign In</Text>}
                                    </Button>
                                </View>
                                <View>
                                    <Button transparent full onPress={this.signUp}>
                                        <Small style={{color: "black"}}>{"Don't have an account? Sign Up"}</Small>
                                    </Button>
                                </View>
                                    <View>
                                        <Button transparent full onPress={this.forgotPassword}>
                                            <Small style={{color: "black"}}>Forgot password?</Small>
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        </AnimatedView>
                    </Content>
                </SafeAreaView>
            </View>
        );
    }
}

const {height, width} = WindowDimensions;
const style = StyleSheet.create({
    img: {
        resizeMode: "cover",
        height,
        width
    },
    content: {
        flex: 1
    },
    logo: {
        alignSelf: "center",
        marginBottom: variables.contentPadding * 2
    },
    title: {
        marginTop: variables.contentPadding * 25,
        color: "white",
        textAlign: "center"
    },
    blur: {
        backgroundColor: "rgba(255, 255, 255, .2)"
    }
});
