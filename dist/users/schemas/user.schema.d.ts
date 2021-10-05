import { Document, ObjectId } from 'mongoose';
export declare type UsersDocument = User & Document;
export declare class User {
    _id: ObjectId;
    role: string;
    username: string;
    password: string;
}
export declare const UserSchema: import("mongoose").Schema<Document<User, any, any>, import("mongoose").Model<Document<User, any, any>, any, any, any>, {}>;
