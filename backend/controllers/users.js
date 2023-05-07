import { User } from "../models/user.js"

export const getUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (e) {
        res.status(404).json({
            msg: e.message
        })
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        const friends = await Promise.all(user.friends.map((id) => User.findById(id)))
        const formatted = friends.map(({ _id, firstName, lastName, pictureUrl }) => {
            return { _id, firstName, lastName, pictureUrl }
        })
        res.status(200).json(formatted)
    } catch (e) {
        res.status(404).json({
            msg: e.message
        })
    }
}

export const addRemoveFriens = async (req, res) => {

    const { id, friendsId } = req.params

    const user = await User.findById(id)
    const friend = await User.findById(friendsId)

    if (!user.friends.includes(friendsId)) {
        user.friends.push(friendsId)
        friend.friends.push(id)
    } else {
        user.friends = user.friends.filter((id) => id !== friendsId)
        friend.friends = friend.friends.filter((id) => id !== id)
    }
    await user.save()
    await friend.save()
    const friends = await Promise.all((
        user.friends.map((id) => User.findById(id))
    ))
    res.json(friends)
}