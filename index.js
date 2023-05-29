const express = require("express")
require("dotenv").config({ path: "./.env" })
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URL)

const cors = require("cors")
const app = express()
// express.json() => BodyParser
app.use(express.json())
app.use(cors({
    // origin: "https://auth-4tev.onrender.com" ,
    origin: "http://localhost:5173"
}))

app.use("/api/user", require("./routes/userRoutes"))

const PORT = process.env.PORT || 5000

mongoose.connection.once("open", () => {
    console.log("DB Connected");
    app.listen(PORT, console.log(`http://localhost:${PORT}`))
})
