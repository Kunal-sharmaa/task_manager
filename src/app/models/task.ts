export class Task {
    _id: string;
    title: string;
    _listId: string;
    completed: boolean;
    constructor(id: string,title: string,listId: string,completed: boolean){
        this._id = id;
        this.title = title;
        this._listId = listId;
        this.completed = completed;
    }
}