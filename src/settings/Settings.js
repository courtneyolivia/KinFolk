// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {View, Text} from "react-native";
import {Switch, List, ListItem, Body, Right} from "native-base";
import { observer } from "mobx-react/native";

import SettingsStore from "./SettingsStore";

import {BaseContainer, Styles, Avatar, Field} from "../components";

import type {ScreenProps} from "../components/Types";

import variables from "../../native-base-theme/variables/commonColor";

@observer
export default class Settings extends React.Component<ScreenProps<>> {

    store = new SettingsStore();

    render(): React.Node {
        const {profile} = this.store;
        return (
            <BaseContainer title="Settings" navigation={this.props.navigation} scrollable>
                <View style={[Styles.header, Styles.center, Styles.whiteBg]}>
                    <Avatar size={100} />
                </View>
                {
                    profile && (
                        <List>
                            <ListItem itemDivider>
                                <Text>GENERAL</Text>
                            </ListItem>
                            <Field
                                label="Name"
                                defaultValue={profile.name}
                                onChange={value => this.store.setName(value)}
                            />
                            <ListItem itemDivider>
                                <Text>NOTIFICATIONS</Text>
                            </ListItem>
                            <ListItem>
                                <Body>
                                    <Text>Email Notification</Text>
                                </Body>
                                <Right>
                                    <SettingsSwitch
                                        defaultValue={profile.emailNotifications}
                                        onToggle={done => this.store.toggleEmailNotifications(done)}
                                    />
                                </Right>
                            </ListItem>
                            <ListItem last>
                                <Body>
                                    <Text>Phone Notification</Text>
                                </Body>
                                <Right>
                                    <SettingsSwitch
                                        defaultValue={profile.phoneNotifications}
                                        onToggle={done => this.store.togglePhoneNotifications(done)}
                                    />
                                </Right>
                            </ListItem>
                        </List>
                    )
                }
            </BaseContainer>
        );
    }
}

type SettingsSwitchProps = {
    defaultValue: boolean,
    onToggle: boolean => void
};

type SettingsSwitchState = {
    value: boolean
};

// eslint-disable-next-line react/no-multi-comp
class SettingsSwitch extends React.Component<SettingsSwitchProps, SettingsSwitchState> {

    state = {
        value: false
    };

    static getDerivedStateFromProps({ defaultValue: value }: SettingsSwitchProps): SettingsSwitchState {
        return { value };
    }

    @autobind
    toggle() {
        const {onToggle} = this.props;
        const {value} = this.state;
        this.setState({ value: !value });
        onToggle(!value);
    }

    render(): React.Node {
        const {value} = this.state;
        return (
            <Switch
                onValueChange={this.toggle}
                onTintColor="rgba(80, 210, 194, .5)"
                thumbTintColor={value ? variables.brandInfo : "#BEBEC1"}
                {...{value}}
            />
        );
    }
}
