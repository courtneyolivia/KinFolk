// @flow
import * as firebase from "firebase";

import {User} from "../Model";
import {DEFAULT_USER} from "../Constants";

const config = {
    apiKey: "AIzaSyBnALoZiUIh2rf_enZytFfgH-2IJwFgXgs",
    authDomain: "react-firebase-fb471.firebaseapp.com",
    databaseURL: "https://react-firebase-fb471.firebaseio.com",
    projectId: "react-firebase-fb471",
    storageBucket: "react-firebase-fb471.appspot.com",
    messagingSenderId: "545576119989"
};

export default class Firebase {

    static database: firebase.database.Database;
    static auth: firebase.auth.Auth;
    static storage: firebase.storage.Storage;

    static init() {
        firebase.initializeApp(config);
        Firebase.auth = firebase.auth();
        Firebase.database = firebase.database();
        Firebase.storage = firebase.storage();
    }

    static get userRef(): firebase.database.Reference {
        return Firebase.database.ref(`users/${Firebase.auth.currentUser.uid}`);
    }

    static async getUser(): Promise<User> {
        const snapshot = await Firebase.database.ref(`users/${Firebase.auth.currentUser.uid}`).once("value");
        return snapshot.val();
    }

    static async setDefaultUserIfEmpty(user: firebase.User): Promise<void> {
        const {uid, displayName} = user;
        const snapshot = await Firebase.database.ref(`users/${uid}`).once("value");
        if (snapshot.val() === null) {
            await Firebase.database.ref(`users/${uid}`).set(DEFAULT_USER(displayName));
        }
    }
}
