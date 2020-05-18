const express = require('express')
const session = require('express-session');
const app = express()
const path = require('path')
const fs = require('fs')
var bodyParser = require('body-parser')
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views') )
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
var lol = "";

var port = process.env.PORT || 3000; 
app.listen(port, function(){
    console.log('server is running')
})
var movie =['darkknight','fightclub','godfather','godfather2','conjuring','scream'];

let loadU = function(){
    try {
        let bufferedData = fs.readFileSync('users.json')
        let dataString = bufferedData.toString()
        let users = JSON.parse(dataString)
        return users
    } catch (error) {
        return []
    }
   
}
let checkUsername = function (name){
    let bool = false;
    let users=loadU()
    users.forEach(user => {
        if (user.username==name)
            bool =true
           
        
    })
    ;return bool;


}
let addU = function(name,pass){
    //load tasks array
    var user ={
        username:name,
        password:pass,
        watchlist:[]
    }
    let users = loadU()
    //push new task in array
    users.push(user)
    //save array back in file
    fs.writeFileSync('users.json', JSON.stringify(users))
}


let checkLogin = function(name,password)
{
    let bool = false;
    let users = loadU()
    users.forEach(user => {
        if(user.username==name&&user.password==password){
            bool=true;
        }
        
    });return bool;
}
var succ = ""
app.get('/registration', function(req,res){
    res.render('registration',{
        msg:succ
    })
    succ="";
    })
var pass= "";
app.get('/', function(req,res){
   res.render('login',{
       wrong:pass
   });
   pass="";
})
app.get('/home',function(req,res)
{
    if(sess)
    {
      
        res.render('home');
    }
   
})
var sess;


app.post('/login',function(req,res){
    sess=req.session;
   sess.username=req.body.username; 
 
    if(checkLogin(req.body.username,req.body.password)==true)
    {
        res.redirect('/home');
    }
    else
    {
        pass="Username or Password Wrong"
        res.redirect('/');
    }
    
})

app.post('/register', function(req,res){
  

   if (checkUsername(req.body.username)==true)
   {
       succ="already exist "
     res.redirect('/registration')
   }
   else{

       addU(req.body.username,req.body.password)
       succ = "Successfully registered"
       res.redirect('/registration')

   }
 
    
   
})
let getwatchlist = function(user)
{
   var userx = user;
    var list = [];
    let users = loadU()
    for (i =0; i<users.length; i++)
    {
        if(users[i].username ==userx)
        {
            list = users[i].watchlist;
            return list;
        }
    }

}

let addW=function(user1,movie){
    var users =loadU()
    for (i=0; i<users.length; i++)
    {
        if(user1==users[i].username && !users[i].watchlist.includes(movie) )
        {
            users[i].watchlist.push(movie); 
          fs.writeFileSync('users.json', JSON.stringify(users));
        return;

        }
    }
    for (i=0; i<users.length; i++)
    {
        if(user1==users[i].username && users[i].watchlist.includes(movie) )
        {
            lol = "Movie already there" 
          return;

        }
    }
    
}

var watchlists = [];
var alreadyinW ;
app.get('/drama',function(req,res){
    res.render('drama');
})
app.get('/horror',function(req,res){
    res.render('horror');
})
app.get('/action',function(req,res){
    res.render('action');
})
app.get('/watchlist',function(req,res){
    watchlists=getwatchlist(req.session.username);
    res.render('watchlist',{
        watched :watchlists
     })
})
app.get('/godfather',function(req,res){
    res.render('godfather',{
        xdd:lol
    });
    lol="";
})
app.get('/scream',function(req,res){
    res.render('scream',{
        xdd:lol
    });
    lol="";
})
app.get('/horror',function(req,res){
    res.render('horror');
})
app.get('/godfather2',function(req,res){
    res.render('godfather2',{
        xdd:lol
    });
    lol="";
})
app.get('/fightclub',function(req,res){
    res.render('fightclub',{
        xdd:lol
    });
    lol="";
})
app.get('/action',function(req,res){
    res.render('watchlist');
})
app.get('/darkknight',function(req,res){
    res.render('darkknight',{
        xdd:lol
    });
    lol="";
})
app.get('/conjuring',function(req,res){
    res.render('conjuring',{
        xdd:lol
    });
    lol="";
    
})
app.get('/Addconjuring',function(req,res)
{
    addW(req.session.username,'Conjuring')  
    res.redirect('/conjuring')


})

app.get('/horror',function(req,res){
    res.render('horror');
})


app.get('/Adddarkknight',function(req,res)
{
    addW(req.session.username,'darkknight')
    res.redirect('/darkknight')

})
app.get('/Addfightclub',function(req,res)
{
    addW(req.session.username,'fightclub')
    res.redirect('/fightclub')

})
app.get('/Addgodfather',function(req,res)
{
    addW(req.session.username,'godfather')
    res.redirect('/godfather')

})
app.get('/Addgodfather2',function(req,res)
{
    addW(req.session.username,'godfather2')
    res.redirect('/godfather2')

})
app.get('/Addscream',function(req,res)
{
    addW(req.session.username,'scream')
    res.redirect('/scream')

})
var task1 = [];
var notff = "";
var enterp="";
app.post('/search',function(req,res){
     task1 = [];
    let bool = false;
    let s = req.body.Search;
    if (s.length !=0)
    {
    for (i=0; i<movie.length; i++)
    {
        if(movie[i].includes(s,0))
        {
     
            task1.push(movie[i]);
            bool = true;
       
     
        }
    }
}
 if (s.length==0)
 {
    bool=true;
    enterp = "Enter a text"
 }
    if ( bool==false)
    {
      notff="Movie not found";
 
    }
 
    res.render('searchresults',{
        searched:task1,
        notfound:notff,
        enter:enterp
    }
    ) 
       notff="";
       enterp="";
      

})