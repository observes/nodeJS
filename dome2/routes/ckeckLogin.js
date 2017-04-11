module.exports=function(req,res,next){
    if(!req.session.user){
        req.flash('error','未登录');
        res.redirect("/login")
    }else {
        next();
    }
};