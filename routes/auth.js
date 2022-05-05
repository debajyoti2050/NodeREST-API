const router=require("express").Router();
const User = require("../models/User");



router.get("/register", async (req,res) => {
    const user=await new User({
        username:"debajyoti",
        email:"debajyoti0007@gmail.com",
        password:"12345678"
    })

    await user.save();
    res.send("ok")

});


module.exports = router;