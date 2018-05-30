// @flow
import moment from "moment";
import * as _ from "lodash";
import {observable, computed} from "mobx";

import {Firebase} from "./components";
import type {User, Task} from "./Model";

export default class MainStore {

    @observable _user: User;
    @computed get user(): User { return this._user; }
    set user(user: User) { this._user = user; }

    init() {
        Firebase.userRef.on("value", snapshot => {
            this.user = snapshot.val();
        });
    }

    get taskCount(): number {
        return this.user ? Object.keys(this.user.tasks || {}).length : 0;
    }

    get completedTaskCount(): number {
        return this.user ? _.map(this.user.tasks || {}, task => task).filter(task => task.done).length : 0;
    }

    get overdueTaskCount(): number {
        const now = (new Date()).getTime() / 1000;
        return this.user ? _.map(this.user.tasks || {}, task => task)
            .filter(task => !task.done)
            .filter(task => task.time <= now).length
            : 0;
    }

    getTasksOfDay(day: number, month: number): Task[] {
        return this.user
            ?
            _.map(this.user.tasks || {}, task => task)
                .filter(task => {
                    const time = moment.unix(task.time);
                    return day === time.date() && month === time.month();
                })
            :
            [];
    }

    getTasksOfWeek(week: number): Task[] {
        return this.user
            ?
            _.map(this.user.tasks || {}, task => task)
                .filter(task => moment.unix(task.time).week() === week)
            :
            [];
    }

    getTasksOfMonth(month: number): Task[] {
        return this.user
            ?
            _.map(this.user.tasks || {}, task => task)
                .filter(task => moment.unix(task.time).month() === month)
            :
            [];
    }
}
