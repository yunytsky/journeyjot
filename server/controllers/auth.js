const returnUser = (req, res) => {
    try{        
        if(req.user){
            return res.status(200).json({ error: false, message: "Authenticated", user });
        }else{
            return res.status(401).json({ error: true, message: "Unauthorized"});
        }
    }catch(err){
        return res.status(500).json({ error: true, message: err.message });
    }  
}

export {returnUser};