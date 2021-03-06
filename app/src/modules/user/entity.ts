import { model, Document, Schema, Types } from "mongoose"
type ObjectId = Types.ObjectId

export interface User {
    _id?: ObjectId
    slackId: string
    slackUsername: string
    slackEmail: string
    slackDmId: string
    displayName: string,
    gitlabUserId: number,
    gitlabUsername: string,
    gitlabProjectId: number,
    isGitlabSubscribed: boolean,
    gitlab_access_token: string
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
    gitlabProjectId: {
        type: Schema.Types.Number
    },
    isGitlabSubscribed: {
        type: Schema.Types.Boolean
    },
    slackId: {
        type: String,
        required: true
    },
    slackUsername: {
        type: String
    },
    slackEmail: {
        type: String
    },
    slackDmId: {
        type: String
    },
    displayName: {
        type: String
    }
})

type UserType = User & Document
export const UserModel = model<UserType>("user", UserSchema)
