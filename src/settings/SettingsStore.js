// @flow
import {observable, computed} from "mobx";
import {debounce} from "throttle-debounce";

import {Profile} from "../Model";
import {Firebase} from "../components";

export default class SettingsStore {

    @observable _profile: Profile;

    @computed get profile(): Profile { return this._profile; }
    set profile(profile: Profile) { this._profile = profile; }

    setName = debounce(1000, (name: string) => {
        Firebase.userRef.child("profile/name").set(name);
    });

    constructor() {
        Firebase.getUser().then(user => this.profile = user.profile);
    }

    // eslint-disable-next-line class-methods-use-this
    toggleEmailNotifications(yes: boolean) {
        Firebase.userRef.child("profile/emailNotifications").set(yes);
    }

    // eslint-disable-next-line class-methods-use-this
    togglePhoneNotifications(yes: boolean) {
        Firebase.userRef.child("profile/phoneNotifications").set(yes);
    }
}
