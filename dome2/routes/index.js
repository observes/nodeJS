var crypto = require('crypto');
var User = require('../models/user.js');
var Post=require('../models/post.js');
var Comment=require('../models/comment.js');
var multer  = require('multer');
var path =require('path');
var fs =require('fs');
var upload = multer({
    dest: path.normalize(__dirname +'/../public/uploads/')
});
module.exports =function(app){
    app.get('/',function(req,res){
        var page = req.query.page? parseInt(req.query.page):1;
        var pageNum =3;
        Post.get(null,page,pageNum,function(err,posts,total){
            res.render('index',{
                title:'主页',
                user:req.session.user,
                success:req.flash('success').toString(),
                error:req.flash('error').toString(),
                posts:posts,
                page:page,
                isFirstPage:(page-1)==0,
                isLastPage:(((page-1)*pageNum)+posts.length)==total,
                total:Math.ceil(total/pageNum),
                current:0
            })
        });
    });
    app.get('/reg',ckeckNotLogin);
    app.get('/reg',function(req,res){
        res.render('reg',{
            title:'注册',
            user:req.session.user,
            success:req.flash('success').toString(),
            error:req.flash('error').toString(),
            current:1
        })
    });
    app.post("/reg",ckeckNotLogin);
    app.post('/reg',function(req,res){
        //判断两次密码是否一致
        if(req.body['password-repeat']!=req.body.password){
            req.flash('error','两次密码不一致！');
            return res.redirect('/reg');
        }
        var md5 = crypto.createHash('md5');
        //创建用户信息
        var newUser = new  User({
             name:req.body.name,
            password:md5.update(req.body.password).digest('hex'),
            email:req.body.email
        });
        // 检查用户的存在性
          User.get(newUser.name,function(err,user){
              if(user.length){
                    req.flash('error','用户已经存在！');
                    return res.redirect('/reg');
              }
              //保存用户注册数据
              newUser.save(function(err,user){
                    if(err){
                        req.flash('error',err);
                        return res.redirect('/reg');
                    }
                    req.session.user=newUser.name;
                    req.flash('success','注册成功');
                    res.redirect('/') ;
              })
          })


    });
    app.get('/login',ckeckNotLogin);
    app.get('/login',function(req,res){
        res.render('login',{
            title:'登陆',
            user:req.session.user ,
            success:req.flash('success').toString(),
            error:req.flash('error').toString(),
            current:2
        })
    });
    app.post('/login',ckeckNotLogin);
    app.post('/login',function(req,res){
        var md5 =crypto.createHash('md5'),
            password=md5.update(req.body.password).digest('hex');
        // 检查用户是否存在
        User.get(req.body.name,function(err,user){
            if(!user.length){
                req.flash('error','用户不存在存在！');
                return res.redirect('/login');
            }
            if(user[0].password !=password){
                req.flash('error','密码错误');
                return res.redirect('/login')
            }
            req.session.user = user[0].name;
            req.flash("success",'登陆成功');
            res.redirect("/")
        });
    });
    app.get('/post',ckeckLogin);
    app.get('/post',function(req,res){
        res.render('post',{
            title:'发表',
            user:req.session.user,
            success:req.flash('success').toString(),
            error:req.flash('error').toString(),
            current:3
        })
    });
    app.post('/post',ckeckLogin);
    app.post('/post',function(req,res){
        var newPost = new Post({
            name:req.session.user,
            title:req.body.title,
            post:req.body.post
        });
        newPost.save(function(err,result){
            if(err){
                req.flash('error',err);
                return res.redirect("/")
            }
            req.flash("success",'发布成功');
            res.redirect('/');
        })
    });
    app.get('/logout',ckeckLogin);
    app.get('/logout',function(req,res){
        req.session.user =null;
        req.flash('success','注销登陆成功');
        res.redirect("/");
    });
    app.get('/upload',ckeckLogin);
    app.get('/upload',function(req,res){
        res.render('upload',{
            title:'文件上传',
            user:req.session.user,
            success:req.flash('success').toString(),
            error:req.flash('error').toString(),
            current:4
        })
    });
    app.post('/upload',upload.array('file', 3),function(req,res){
        for(var attr in req.files){
            if(req.files[attr].size==0){
                fs.unlinkSync(res.files[attr].path);
                console.log('Suceessfully remove an empty file!')
            }else{
                var target_path = path.normalize(__dirname+'/../uploads/')+req.files[attr].originalname;
                fs.renameSync(req.files[attr].path,target_path);
                console.log('Suceessfully renamed a file!')
            }
        }
        req.flash("suceess",'文件上传成功');
        res.redirect('/');
    });
    app.get('/u/:name',ckeckLogin);
    app.get('/u/:name',function(req,res){
        var page = req.query.page? parseInt(req.query.page):1;
        var pageNum =4;
        var user = req.params['name'];
        User.get(user,function(err,result){
            if(err){
                throw err;
            }
            if(result.length){
                Post.get(user,page,pageNum,function(err,docs,total){
                    if(!err){
                        res.render('user',{
                            title:'用户信息',
                            user:req.session.user,
                            userMsg:result[0],
                            success:req.flash('success').toString(),
                            error:req.flash('error').toString(),
                            posts:docs,
                            page:page,
                            isFirstPage:(page-1)==0,
                            isLastPage:(((page-1)*pageNum)+docs.length)==total,
                            total:Math.ceil(total/pageNum),
                            current:500
                        });
                    }
                });
            }else {
                req.flash('error','用户不存在');
                return res.redirect('/');
            }
        })
    });
    app.get('/article/:id',function(req,res){
        Post.getOneById(req.params['id'],function(err,doc){
              if(err){
                  req.flash('error',err);
                  return res.redirect("back");
              }
            res.render('article',{
                'title':'文章详情',
                user:req.session.user,
                success:req.flash('success').toString(),
                error:req.flash('error').toString(),
                posts:doc,
                current:500
            });
        })
    });
    app.post('/article/:id',function(req,res){
        var date =new Date();
        var comment={
            content:req.body.content,
            time:date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
            name:req.body.username
        };
      var newComment =new Comment(req.params["id"],comment);
        newComment.save(function(err,result){
            if(err){
                req.flash('error',err);
                return res.redirect("/article/"+req.params["id"]);
            }
            req.flash("success",'留言成功');
            res.redirect("back");
        });
    });
    app.get('/edit/:id',ckeckLogin);
    app.get('/edit/:id',function(req,res){
        Post.getOneById(req.params['id'],function(err,doc){
            if(err){
                req.flash('error',err);
                return res.redirect("back");
            }
            res.render('edit',{
                title:'编辑',
                user:req.session.user,
                success:req.flash('success').toString(),
                error:req.flash('error').toString(),
                post:doc,
                current:500
            });
        })
    });
    app.post('/updata/:id',ckeckLogin);
    app.post('/updata/:id',function(req,res,next){
        Post.update(req.params["id"],{$set:{post:req.body.post}},function(err,result){
            if(err){
                req.flash('error',err);
                return res.redirect("back");
            }
            req.flash("success","修改成功");
            res.redirect('/article/'+req.params['id']);
        })
    });
    app.get('/del/:id',ckeckLogin);
    app.get('/del/:id',function(req,res,next){
        Post.remove(req.params['id'],function(err, result){
            if(err){
                req.flash('error',err);
                return res.redirect("back");
            }
            req.flash("success","删除成功");
            res.redirect('/');
        })
    });
    app.post("/search",function(req,res){
        Post.search(req.body.key,function(err,docs){
            if(err){
                req.flash("error",err);
                return res.redirect("back");
            }
            res.render('search',{
                title:"搜索内容:"+req.body.key,
                current:500,
                posts:docs,
                user:req.session.user,
                success:req.flash("sucees").toString(),
                error:req.flash("error").toString()
            });
        })
    });
    function ckeckNotLogin(req,res,next){
        if(req.session.user){
            req.flash('error','已经登陆');
            res.redirect('back');
        }else {
            next();
        }
    }
    function ckeckLogin(req,res,next){
        if(!req.session.user){
            req.flash('error','未登录');
            res.redirect("/login")
        }else {
            next();
        }
    }
};
