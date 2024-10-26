const returnUser = (req, res) => {
    try{        
        if(req.user){
            const user = {username: req.user.username, isPremium: req.user.isPremium};
            return res.status(200).json({ error: false, message: "Authenticated", user });
        }else{
            return res.status(401).json({ error: true, message: "Unauthorized"});
        }
    }catch(err){
        return res.status(500).json({ error: true, message: err.message });
    }  
}

const logout = (req, res) => {
    try {
        req.logout(req.user, err => {
            if(err) return next(err);
            return res.status(200).json({ error: false, message: "Logged out successfully." });
          });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: true, message: err.message });
    }
}



export {returnUser, logout};