module.exports=function(req,res,next){
    if(req.session.user){
        res.flash('error','已经登陆');
        res.redirect('back');
    }else {
        next();
    }
};