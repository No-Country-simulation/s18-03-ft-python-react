
export const getUserInfo = (req,res)=> {
    const user = req.session.user
    res.json({user})
}