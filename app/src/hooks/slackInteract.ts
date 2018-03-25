import { UserModel } from "../modules/user/entity"

export const slackInteract = async (req, res) => {
    const payload = JSON.parse(req.body.payload)
    const { callback_id, user, actions } = payload
    const action = actions[0]
    console.log("PAYLOAD:", payload)
    console.log('fullfilment: ', user, callback_id, action)
    switch (callback_id) {
        case 'confirm_project': {
            await UserModel.findOneAndUpdate(
                {slackId: user.id},
                {
                    gitlabProjectId: action.value,
                    isGitlabSubscribed: true
                },
                {new: true})

            res.send(`Project confirmed ✅`)
            break
        }
        default: {
            console.error('POST to /slackInteract had an unknown callback_id.')
        }
    }

}