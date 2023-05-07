import { Post } from "../models/posts.js"
import { User } from "../models/user.js"

export const createPosts = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body
        const user = await User.findById(userId)
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            userPicturePath: user.pictureUrl,
            location: user.location,
            description: description,
            picturePath: picturePath,
            likes: 0,
            comments: []

        })
        await newPost.save()
        const post = await Post.find()
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }



}
export const getMyposts = async (req, res) => {
    try {
        const post = await Post.find()

        res.status(201).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }


}
export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params
        const userPost = await Post.find({ userId })

        res.status(200).json(userPost)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

export const createComment = async (req, res) => {
    try {
        const { id } = req.params
        const { email } = req.body
        const post = await Post.findById(id)
        const user = await User.findOne({ email })
        post.comments.push({ user: user, comment: req.body.comment })
        post.save()
        res.json(post)

    } catch (error) {
        res.json(error)
    }
}
