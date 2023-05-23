const User = require("../models/User")
const bcrypt = require("bcrypt")

exports.register = async (req, res) => {
    try {
        const { password } = req.body
        const hashPass = await bcrypt.hash(password, 10)
        const result = await User.create({
            ...req.body,
            password: hashPass
        }) // req.body frontent date catch
        res.json({
            msg: "User Register Success",
            result
        })
    } catch (error) {
        res.json({ msg: " Something went Wrong ", error })
    }
}
exports.fetchUsers = async (req, res) => {
    try {
        const result = await User.find()
        res.json({
            msg: "User Fetch Success",
            result
        })
    } catch (error) {
        res.json({ msg: " Something went Wrong ", error })
    }
}
// exports.fetchUsers = async (req, res) => {
//     try {
//         const result = await User.findByIdAndUpdate()
//         res.json({
//             msg: "User Fetch Success",
//             result
//         })
//     } catch (error) {
//         res.json({ msg: " Something went Wrong ", error })
//     }
// }