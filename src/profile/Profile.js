// @flow
import * as React from "react";
import * as _ from "lodash";
import {View, ScrollView} from "react-native";
import {H1} from "native-base";
import {inject, observer} from "mobx-react/native";

import {BaseContainer, Avatar, TaskOverview, Styles, Task} from "../components";

import type {ScreenProps, StoreProps} from "../components/Types";

import variables from "../../native-base-theme/variables/commonColor";

@inject("store")
@observer
export default class Profile extends React.Component<ScreenProps<> & StoreProps> {
    render(): React.Node {
        const {store} = this.props;
        return (
            <BaseContainer title="Profile" navigation={this.props.navigation} scrollable>
                {
                    store.user && (
                        <View>
                            <View style={[Styles.header, Styles.whiteBg, Styles.center]}>
                                <Avatar size={100} />
                                <H1 style={{ marginTop: variables.contentPadding * 2 }}>
                                    {store.user.profile.name}
                                </H1>
                            </View>
                            <TaskOverview completed={store.completedTaskCount} overdue={store.overdueTaskCount} />
                            <ScrollView>
                                {
                                    _.map(store.user.tasks, (task, key) => <Task {...{task, key}} />)
                                }
                            </ScrollView>
                        </View>
                    )
                }
            </BaseContainer>
        );
    }
}
