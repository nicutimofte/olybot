import { Model, model, Document, Schema, Types } from "mongoose"
type ObjectId = Types.ObjectId

export interface User {
    _id?: ObjectId
    slackId: string
    slackUsername: string
    slackEmail: string
    slackDmId: string
    displayName: string,
    gitlabUserId: number,
    gitlabUsername: string
}

const UserSchema = new Schema({
    gitlabUsername: {
        type: String
    },
    gitlabUserId: {
        type: Schema.Types.Number
    },
    gitlab_access_token: {
        type: String
    },
    slackId: {
        type: String,
        required: true,
    },
    slackUsername: {
        type: String,
    },
    slackEmail: {
        type: String,
    },
    slackDmId: {
        type: String,
    },
    displayName: {
        type: String,
    }
})

type UserType = User & Document
export const UserModel: Model<UserType> = model<UserType>("user", UserSchema)