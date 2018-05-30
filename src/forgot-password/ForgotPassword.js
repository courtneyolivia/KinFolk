// @flow
import autobind from "autobind-decorator";
import {observer} from "mobx-react/native";
import * as React from "react";
import {StyleSheet, Image, View} from "react-native";
import {Button, Spinner, Text} from "native-base";
import ForgotPasswordStore from "./ForgotPasswordStore";
import {Images, WindowDimensions, Field, Small, Styles} from "../components";
import type {ScreenProps} from "../components/Types";

@observer
export default class ForgotPassword extends React.Component<ScreenProps<>> {

    store = new ForgotPasswordStore();

    @autobind
    login() {
        this.props.navigation.navigate("Login");
    }

    @autobind
    async submit(): Promise<void> {
        try {
            await this.store.submit();
            // eslint-disable-next-line no-alert
            alert("We send you an email so you can reset your password.");
            this.props.navigation.navigate("Login");
        } catch (e) {
            // eslint-disable-next-line no-alert
            alert(e.message);
        }
    }

    render(): React.Node {
        return (
            <View style={Styles.flexGrow}>
                <Image source={Images.login} resizeMode="cover" style={style.img} />
                <View style={[StyleSheet.absoluteFill, Styles.imgMask]} />
                <View style={style.container}>
                    <Field
                        label="Email"
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        returnKeyType="go"
                        onChange={email => this.store.email = email}
                        onSubmitEditing={this.submit}
                        inverse
                    />
                    
                  
                    <Button success full onPress={this.submit}>
                        {this.store.loading ? <Spinner color="white" /> : <Text>Reset Password</Text>}
                    </Button>
                    <Button transparent full onPress={this.login}>
                        <Small style={Styles.whiteText}>Login</Small>
                    </Button>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    img: {
        ...WindowDimensions,
        ...StyleSheet.absoluteFillObject,
        
    },
    container: {
        justifyContent: "center",
        ...StyleSheet.absoluteFillObject,
        paddingTop: 150
    },

});
