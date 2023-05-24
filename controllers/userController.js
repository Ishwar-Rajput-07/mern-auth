const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    try {
        const { password, email } = req.body
        const found = await User.findOne({ email })
        if (found) {
            return res.json({
                msg: "Email Already exist",
            })
        }

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
        const token = req.headers.authorization
        if (!token) {
            res.json({ msg: "Privide Token" })
        }
        jwt.verify(token, process.env.JWT_KEY)

        const result = await User.find()
        res.json({
            msg: "User Fetch Success",
            result
        })
    } catch (error) {
        res.json({ msg: " Something went Wrong " + error })
    }
}
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(req.body);
        const result = await User.findOne({ email })

        if (!result) {
            return res.json({ msg: "Email is not registered with us" })
        }
        console.log(result);
        const match = await bcrypt.compare(password, result.password)
        if (!match) {
            return res.json({ msg: "Password Do NOt Match" })
        }
        const token = jwt.sign({ name: "kate" }, process.env.JWT_KEY)
        res.json({ msg: "Login Successfuly", token })

    } catch (error) {
        res.json({ msg: " Something went Wrong login " + error })
    }
}
exports.destroy = async (req, res) => {
    try {
        await User.deleteMany()
        res.json({ msg: "user Destroy success" })

    } catch (error) {
        res.json({ msg: " Something went Wrong " + error })
    }
}