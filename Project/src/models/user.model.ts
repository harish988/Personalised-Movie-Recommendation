export class  User {
    _id: String;
    password: string;
    name: string;
    email: String;

    constructor(id: String, name: string ,  email: String,  password: string) {
        this._id = id;
        this.password = password;
        this.name = name;
        this.email = email;
    }
}
