// @flow
import * as _ from "lodash";
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, Image, View, Text} from "react-native";
import {H1, Button, Icon} from "native-base";
import {observer} from "mobx-react/native";

import ListsStore from "./ListsStore";

import {BaseContainer, Styles, Images} from "../components";

import type {ScreenProps} from "../components/Types";

import variables from "../../native-base-theme/variables/commonColor";

@observer
export default class Lists extends React.Component<ScreenProps<>> {

    store = new ListsStore();

    render(): React.Node {
        const {tasks, loading} = this.store;
        return (
            <BaseContainer title="Lists of Events" navigation={this.props.navigation} scrollable>
                {
                    !loading && (
                        <View>
                            <View style={[Styles.center, Styles.header]}>
                                <Image source={Images.lists} style={[StyleSheet.absoluteFill, Styles.header]} />
                                
                               
                            </View>
                            {
                                !tasks && (
                                    <View>
                                        <Text>You don&apos;t have any tasks yet. Please add one.</Text>
                                    </View>
                                )
                            }
                            {
                                _.map(
                                    tasks,
                                    (item, key) => (
                                        <Item
                                            key={key}
                                            title={item.title}
                                            done={item.done}
                                            onToggle={done => this.store.toggleItem(key, done)}
                                        />
                                    )
                                )
                            }
                        </View>
                    )
                }
            </BaseContainer>
        );
    }
}

type ItemProps = {
    title: string,
    // eslint-disable-next-line react/no-unused-prop-types
    done?: boolean,
    onToggle: boolean => void
};

type ItemState = {
    done: boolean
};

// eslint-disable-next-line react/no-multi-comp
class Item extends React.Component<ItemProps, ItemState> {

    state = {
        done: false
    };

    static getDerivedStateFromProps({done}: ItemProps): ItemState {
        return { done: !!done };
    }

    @autobind
    toggle() {
        const {onToggle} = this.props;
        const done = !this.state.done;
        this.setState({ done });
        onToggle(done);
    }

    render(): React.Node {
        const {title} = this.props;
        const {done} = this.state;
        const btnStyle = { backgroundColor: done ? variables.brandInfo : variables.lightGray };
        return (
            <View style={Styles.listItem}>
                <Button
                    transparent
                    onPress={this.toggle}
                    style={[Styles.center, style.button, btnStyle]}
                >
                    {done ? <Icon name="md-checkmark" style={Styles.whiteText} /> : undefined}
                </Button>
                <View style={[Styles.center, style.title]}>
                    <Text style={{ color: done ? variables.gray : variables.black }}>{title}</Text>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    mask: {
        backgroundColor: "rgba(0, 0, 0, .5)"
    },
    button: {
        height: 75, width: 75, borderRadius: 0
    },
    title: {
        paddingLeft: variables.contentPadding
    }
});
