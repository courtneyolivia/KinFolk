// @flow
/* eslint-disable no-console */
import * as React from "react";
import {Dimensions} from "react-native";
import {StyleProvider} from "native-base";
import {StackNavigator, DrawerNavigator} from "react-navigation";
import {Font, AppLoading} from "expo";
import {useStrict, observable, computed} from "mobx";
import {observer, Provider} from "mobx-react/native";
import {Login} from "./src/login";
import {SignUp} from "./src/sign-up";
import {Images, Firebase} from "./src/components";
import {ForgotPassword} from "./src/forgot-password"; 
import {Chat} from "./src/chat";
import {Drawer} from "./src/drawer";
import {Home} from "./src/home";
import {Lists} from "./src/lists";
import {Timeline} from "./src/timeline";
import {Settings} from "./src/settings";
import {Create} from "./src/create";
import MainStore from "./src/MainStore";
import {ToDoList} from "./src/ToDoList";

import getTheme from "./native-base-theme/components";
import variables from "./native-base-theme/variables/commonColor";

@observer
export default class App extends React.Component<{}> {

    store = new MainStore();

    @observable _ready: boolean = false;
    @observable _authStatusReported: boolean = false;
    @observable _isLoggedIn: boolean = false;

    @computed get ready(): boolean { return this._ready; }
    set ready(ready: boolean) { this._ready = ready; }

    @computed get authStatusReported(): boolean { return this._authStatusReported; }
    set authStatusReported(authStatusReported: boolean) { this._authStatusReported = authStatusReported; }

    @computed get isLoggedIn(): boolean { return this._isLoggedIn; }
    set isLoggedIn(isLoggedIn: boolean) { this._isLoggedIn = isLoggedIn; }

    componentWillMount() {
        const promises = [];
        promises.push(
            Font.loadAsync({
                "Avenir-Book": require("./fonts/Avenir-Book.ttf"),
                "Avenir-Light": require("./fonts/Avenir-Light.ttf")
            })
        );
        Promise.all(promises.concat(Images.downloadAsync()))
            .then(() => this.ready = true)
            .catch(error => console.error(error))
        ;
        useStrict(true);
        Firebase.init();
        Firebase.auth.onAuthStateChanged(async user => {
            this.isLoggedIn = !!user;
            if (this.isLoggedIn) {
                this.store.init();
            }
            this.authStatusReported = true;
        });
    }

    render(): React.Node {
        const {ready, authStatusReported, isLoggedIn, store} = this;
        const onNavigationStateChange = () => undefined;
        return <Provider {...{store}}>
            <StyleProvider style={getTheme(variables)}>
                {
                    ready && authStatusReported ?
                        (
                            isLoggedIn ?
                                <PublicNavigator {...{onNavigationStateChange}} />
                                :
                                <PrivateNavigator {...{onNavigationStateChange}} />
                        )
                        :
                        <AppLoading startAsync={null} onError={null} onFinish={null} />
                }
            </StyleProvider>
        </Provider>;
    }
}

// $FlowFixMe
console.ignoredYellowBox = [
    "Setting a timer"
];

const MainNavigator = DrawerNavigator({
    Home: { screen: Home },
    Lists: { screen: Lists },
    Timeline: { screen: Timeline },
    Settings: { screen: Settings },
    Create: { screen: Create },
    ToDoList: { screen: ToDoList },
    Chat: { screen: Chat }

}, {
    drawerWidth: Dimensions.get("window").width,
    contentComponent: Drawer
});

const navigatorOptions = {
    headerMode: "none",
    cardStyle: {
    backgroundColor: "white"
    }
};

const PrivateNavigator = StackNavigator({
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    ForgotPassword: { screen: ForgotPassword }
}, navigatorOptions);

const PublicNavigator = StackNavigator({
    Main: { screen: MainNavigator },
}, navigatorOptions);

export {PublicNavigator};


