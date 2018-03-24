import { userController } from '../modules/user/controller'
import { sendMessageToUser } from '../slack'

export const gitlabHook = async (req, res) => {
    console.log('GITLAB HOOKS:', req.params.projectId, req.headers, req.body)
    const { projectId } = req.params
    const { headers, body } = req
    const { changes, object_attributes, user } = body
    const { name, username } = user
    const { assignees, closed_at, state } = changes
    const { action, iid, title } = object_attributes
    let text = ''

    if (headers['x-gitlab-event'] === 'Issue Hook') {
        const users: any = await userController.findAll({ gitlabProjectId: projectId })
        users.map(user => {

            //skip the user who made the action
            if (username === user.gitlabUsername) return

            text += `Hey ${user.displayName}, ${name} @${username} `

            if (action === 'update') {
                if (assignees.current.length !== 0) {
                    text += 'assigned to '
                    assignees.current.map(u => {
                        text += `@${u.username} `
                    })
                }

                if (assignees.current.length !== 0 && assignees.previous.length !== 0){
                    text += 'and '
                }

                if (assignees.previous.length !== 0) {
                    text += 'unassigned '
                    assignees.previous.map(u => {
                        text += `@${u.username} `
                    })
                }
            }
            text += `the issue number ${iid}: ${title}`
            sendMessageToUser(user.slackDmId, text)
        })
        // todo: add issue close

    }

    res.json({ok:true})

}