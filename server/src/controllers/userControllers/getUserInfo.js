
export const getUserInfo = (req,res)=> {
    const user = req.session.user
    console.log(user)
}