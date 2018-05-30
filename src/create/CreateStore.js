// @flow
import {observable, computed} from "mobx";
import moment from "moment";

import type {Task} from "../Model";
import {Firebase} from "../components";

export default class CreateStore {

    constructor() {
        this.loading = false;
        this.datetime = moment().format("YYYY-MM-DD HH:mm");
        this.done = false;
    }

    @observable _loading: boolean;
    @computed get loading(): boolean { return this._loading; }
    set loading(loading: boolean) { this._loading = loading; }

    @observable _title: string = "";
    @computed get title(): string { return this._title; }
    set title(title: string) { this._title = title; }

    @observable _project: string = "";
    @computed get project(): string { return this._project; }
    set project(project: string) { this._project = project; }

    @observable _datetime: string;
    @computed get datetime(): string { return this._datetime; }
    set datetime(datetime: string) { this._datetime = datetime; }

    @computed get time(): number { return parseInt(moment(this.datetime, "YYYY-MM-DD HH:mm").format("X"), 10); }

    @observable _done: boolean;
    @computed get done(): boolean { return this._done; }
    set done(done: boolean) { this._done = done; }

    async save(): Promise<void> {
        this.loading = true;
        const {title, time, project, done} = this;
        if (title === "") {
            this.loading = false;
            throw new Error("Title field required");
        }
        if (project === "") {
            this.loading = false;
            throw new Error("Project field required");
        }
        const task: Task = {title, time, project, participants: {}, done};
        await Firebase.userRef.child("tasks").push(task);
        this.loading = false;
    } 
       
}
