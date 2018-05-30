// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {View, Image, StyleSheet, Dimensions, StatusBar, Platform} from "react-native";
import {Text, Button, Header, Left, Right, Body, Icon, Title, Spinner, Input, Content} from "native-base";
import {observer} from "mobx-react/native";

import SignUpStore from "./SignUpStore";

import {Container, Styles, Images, Field} from "../components";

import type {ScreenProps} from "../components/Types";

import variables from "../../native-base-theme/variables/commonColor";

@observer
export default class SignUp extends React.Component<ScreenProps<>> {

    componentDidMount() {
        StatusBar.setBarStyle("dark-content");
        if (Platform.OS === "android") {
            StatusBar.setBackgroundColor("white");
        }
    }

    store = new SignUpStore()
    email: Input;
    password: Input;

    @autobind
    setEmailRef(email: Input) {
        this.email = email._root;
    }

    @autobind
    goToEmail() {
        this.email.focus();
    }

    @autobind
    setPasswordRef(password: Input) {
        this.password = password._root;
    }

    @autobind
    goToPassword() {
        this.password.focus();
    }

    @autobind
    setName(name: string) {
        this.store.name = name;
    }

    @autobind
    setEmail(email: string) {
        this.store.email = email;
    }

    @autobind
    setPassword(password: string) {
        this.store.password = password;
    }

    @autobind
    back() {
        this.props.navigation.navigate("Login");
    }

    @autobind
    async signIn(): Promise<void> {
        try {
            await this.store.signIn();
        } catch (e) {
            // eslint-disable-next-line no-alert
            alert(e.message);
        }
    }

    render(): React.Node {
        return (
            <Container bottomColor="white" safe>
                <Content style={style.content}>
                    <Header noShadow>
                        <Left>
                            <Button onPress={this.back} transparent>
                                <Icon name="close" />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Sign Up</Title>
                        </Body>
                        <Right />
                    </Header>
                    <View>
                        <Image source={Images.signUp} resizeMode="cover" style={style.img.center} />
                        <View style={[Styles.imgMask, Styles.center]}>
                    </View>
                    </View>
                    <Field
                        label="Name"
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChange={this.setName}
                        onSubmitEditing={this.goToEmail}
                        returnKeyType="next"
                    />
                    <Field
                        label="Email"
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChange={this.setEmail}
                        textInputRef={this.setEmailRef}
                        onSubmitEditing={this.goToPassword}
                        returnKeyType="next"
                    />
                    <Field
                        label="Password"
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChange={this.setPassword}
                        secureTextEntry
                        textInputRef={this.setPasswordRef}
                        onSubmitEditing={this.signIn}
                        returnKeyType="go"
                    />
                   
                    <Button success full onPress={this.signIn} style={{height: variables.footerHeight}}>
                        {this.store.loading ? <Spinner color="white" /> : < Text > Create Account </Text >}
                    </Button>
                    
                </Content>
            </Container>
        );
    }
}

const {width} = Dimensions.get("window");
const style = StyleSheet.create({
    content: {
        backgroundColor: "white"
    },
    
    img: {
        height: width * 0.62,
    },
   
    icon: {
        fontSize: 75,
        color: variables.brandInfo
    }
});