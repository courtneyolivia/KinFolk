// @flow
export type Lists = { [string]:  List };
export type Tasks = { [string]:  Task };
export type ListItems = { [string]:  ListItem };
export type Participants = { [string]:  Participant };

export interface User {
  profile: Profile,
  lists: Lists,
  tasks: Tasks,
}

export interface Profile {
  name: string,
  birthday: number,
  emailNotifications: boolean,
  phoneNotifications: boolean,
}

export interface List {
  name: string,
  description: string,
  items: ListItems,
}

export interface ListItem {
  title: string,
  done: boolean,
}

export interface Task {
  title: string,
  time: number,
  project: string,
  participants: Participants,
  done: boolean,
}

export interface Participant {
  uid: string,
}

