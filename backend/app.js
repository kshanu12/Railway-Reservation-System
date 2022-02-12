const express=require("express");
const app=express();
const path=require("path");
const db=require("./config/database")
const bodyParser = require("body-parser");
const encoder = express.urlencoded;

const User=require("./models/user")
const Train=require("./models/train")
const Passenger=require("./models/passenger")
const Booking=require("./models/booking")

var Name="",Email="",Age=0,Gender="",Mobile=0,Id=0,T_no="",Cost=0,B_id=0,No_of_pass=0;

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.set("view-engine","ejs")

app.use(express.static(path.join(__dirname,"public")))

db.authenticate() 
.then(()=>{console.log("Database connected....");})
.catch(err=>{console.log("ERROR"+err);})

app.get("/",(req,res)=>{
    res.render("home.ejs")
})

app.get("/sign-up",(req,res)=>{
    res.render("sign-up.ejs") 
})

app.get("/login",(req,res)=>{
    res.render("login.ejs",{message:""})
})

app.get("/home1",(req,res)=>{
    res.render("home1.ejs",{name:Name})
})

app.get("/find-train",(req,res)=>{
    res.render("find-train.ejs",{project:[]}) 
})

app.get("/find-trainbyno",(req,res)=>{
    res.render("find-trainbyno.ejs",{t_no:"",t_name:"",fromstn:"",tostn:"",arrival:"",departure:"",seat_avail:"",cost:""}) 
})

app.get("/find-trainbyname",(req,res)=>{
    res.render("find-trainbyname.ejs",{t_no:"",t_name:"",fromstn:"",tostn:"",arrival:"",departure:"",seat_avail:"",cost:""}) 
})

app.get("/find-train1",(req,res)=>{
    res.render("find-train1.ejs",{project:[],name:Name})
})

app.get("/find-train1byno",(req,res)=>{
    res.render("find-train1byno.ejs",{name:Name,t_no:"",t_name:"",fromstn:"",tostn:"",arrival:"",departure:"",seat_avail:"",cost:""}) 
})

app.get("/find-train1byname",(req,res)=>{
    res.render("find-train1byname.ejs",{name:Name,t_no:"",t_name:"",fromstn:"",tostn:"",arrival:"",departure:"",seat_avail:"",cost:""}) 
})

app.get("/profile",(req,res)=>{
    res.render("profile.ejs",{name:Name,email:Email,age:Age,gender:Gender,mobile:Mobile}) 
})

app.get("/pass-change",(req,res)=>{
    res.render("pass-change.ejs",{message:"",name:Name}) 
})

app.get("/pass-changed",(req,res)=>{
    res.render("pass-changed.ejs",{name:Name,email:Email,age:Age,gender:Gender,mobile:Mobile}) 
})

app.get("/reservation1",(req,res)=>{
    res.render("reservation1.ejs",{project:[],name:Name,message:""})
})

app.get("/reservation1byname",(req,res)=>{
    res.render("reservation1byname.ejs",{project:[],name:Name,message:""}) 
})

app.get("/reservation1byno",(req,res)=>{
    res.render("reservation1byno.ejs",{project:[],name:Name,message:""}) 
})

app.get("/book-ticket",(req,res)=>{
    res.render("book-ticket.ejs",{name:Name,t_no:"",t_name:"",fromstn:"",tostn:"",arrival:"",departure:"",seat_avail:"",cost:""}) 
})

app.get("/ticket-preview",(req,res)=>{
    res.render("ticket-preview.ejs",{p_details:[],name:Name}) 
})

app.get("/cost",(req,res)=>{
    res.render("cost.ejs",{cost:Cost,no:No_of_pass,total_cost:Cost*No_of_pass,name:Name}) 
})

app.get("/book-history",(req,res)=>{
    res.render("book-history.ejs",{no:No_of_pass,total_cost:Cost*No_of_pass,name:Name}) 
})

app.post("/login",async function(req,res){
    var email=req.body.email;
    var password=req.body.password; 

    const project = await User.findOne({ 
        where: {
            email: email,
            password:password,
        }});

    if (project === null) {
        res.render("login.ejs",{message:"*email/password not found"});
        console.log('Not found!');
    } else {
        Name=project.name;
        Email=project.email;
        Age=project.age;
        Gender=project.gender;
        Mobile=project.mobile;
        Id=project.id;
        res.render("home1.ejs",{name:Name});
    }
})

app.post("/sign-up",async (req,res)=>{
    try{
        User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            age:req.body.age,
            gender:req.body.gender,
            mobile:req.body.mobile,
        })
        res.redirect("/login")
    }
    catch{
        res.redirect("/sign-up")
    }
})

app.post("/find-train",async function(req,res){
    var from=req.body.from;
    var to=req.body.to;

    const project = await Train.findAll({ 
        where: {
            fromstn: from,
            tostn: to,
    }}); 

    var t_details=[];
    project.forEach(element => {
        t_details.push(element.dataValues);
    });

    if (project === null) {
        res.render("find-train.ejs",{project:t_details});
        console.log('Not found!');
    } else {
        res.render("find-train.ejs",{project:t_details,});
        console.log("inside else");
    }
})

app.post("/find-trainbyno",async function(req,res){
    var no=req.body.no;

    const project = await Train.findOne({ 
        where: {
            t_no:no
        }}); 

    if (project === null) {
        res.render("find-trainbyno.ejs",{t_no:"",t_name:"",fromstn:"*No ",tostn:"Train ",arrival:"found",departure:"",seat_avail:"",cost:""});
        console.log('Not found!');
    } else {
        res.render("find-trainbyno.ejs",{t_no:project.t_no,t_name:project.t_name,fromstn:project.fromstn,tostn:project.tostn,arrival:project.arrival,cost:project.cost,departure:project.departure,seat_avail:project.seat_avail});
        console.log("inside else");
    }
})  

app.post("/find-trainbyname",async function(req,res){
    var t_name=req.body.t_name;

    const project = await Train.findOne({ 
        where: {
            t_name:t_name
        }}); 

    if (project === null) {
        res.render("find-trainbyname.ejs",{t_no:"",t_name:"",fromstn:"*No ",tostn:"Train ",arrival:"found",departure:"",seat_avail:"",cost:""});
        console.log('Not found!');
    } else {
        res.render("find-trainbyname.ejs",{t_no:project.t_no,t_name:project.t_name,fromstn:project.fromstn,tostn:project.tostn,arrival:project.arrival,cost:project.cost,departure:project.departure,seat_avail:project.seat_avail});
        console.log("inside else");
    }
})

app.post("/find-train1",async function(req,res){
    var from=req.body.from;
    var to=req.body.to;

    const project = await Train.findAll({ 
        where: {
            fromstn: from,
            tostn: to,
        }});
    var t_details=[];
    project.forEach(element => {
    t_details.push(element.dataValues);
    });

    if (project === null) {
        res.render("find-train1.ejs",{project:t_details,name:Name});
        console.log('Not found!');
    } else {
        res.render("find-train1.ejs",{project:t_details,name:Name});
        console.log("inside else");
    }
}) 

app.post("/find-train1byno",async function(req,res){
    var no=req.body.no;

    const project = await Train.findOne({ 
        where: {
            t_no:no
        }}); 

    if (project === null) {
        res.render("find-train1byno.ejs",{name:Name,t_no:"",t_name:"",fromstn:"*No ",tostn:"Train ",arrival:"found",departure:"",seat_avail:"",cost:""});
        console.log('Not found!');
    } else {
        res.render("find-train1byno.ejs",{name:Name,t_no:project.t_no,t_name:project.t_name,fromstn:project.fromstn,tostn:project.tostn,arrival:project.arrival,cost:project.cost,departure:project.departure,seat_avail:project.seat_avail});
        console.log("inside else");
    }
})  

app.post("/find-train1byname",async function(req,res){
    var t_name=req.body.t_name;

    const project = await Train.findOne({ 
        where: {
            t_name:t_name
        }}); 

    if (project === null) {
        res.render("find-train1byname.ejs",{name:Name,t_no:"",t_name:"",fromstn:"*No ",tostn:"Train ",arrival:"found",departure:"",seat_avail:"",cost:""});
        console.log('Not found!');
    } else {
        res.render("find-train1byname.ejs",{name:Name,t_no:project.t_no,t_name:project.t_name,fromstn:project.fromstn,tostn:project.tostn,arrival:project.arrival,cost:project.cost,departure:project.departure,seat_avail:project.seat_avail});
        console.log("inside else");
    }
})

app.post("/pass-change",async function(req,res){
    var oldpass=req.body.oldpass;
    var newpass=req.body.newpass;
    var confirmpass=req.body.confirmpass;

    const project = await User.findOne({ 
        where: {
            id:Id,
            password:oldpass,
        }}); 

    if (project === null) {
        res.render("pass-change.ejs",{message:"*Wrong Password",name:Name});
        console.log('Not found!');
    } else if(newpass!=confirmpass) {
        res.render("pass-change.ejs",{message:"*Password did't match",name:Name})
    } else{
        await User.update({ password: newpass }, {
            where: {
                id: Id
            }
        })
        res.render("pass-changed.ejs",{name:Name,email:Email,age:Age,gender:Gender,mobile:Mobile})
    }
}) 

app.post("/reservation1",async function(req,res){
    var from=req.body.from;
    var to=req.body.to;

    const project = await Train.findAll({ 
        where: {
            fromstn: from,
            tostn: to,
        }});

    var t_details=[];
    project.forEach(element => {
    t_details.push(element.dataValues);
    });

    if (t_details.length === 0) {
        res.render("reservation1.ejs",{project:t_details,name:Name,message:"*No train found"});
        console.log('Not found!');
    } else {
        res.render("reservation1.ejs",{project:t_details,name:Name,message:""});
        console.log("inside else");
    }
})

app.post("/reservation1byno",async function(req,res){
    var no=req.body.no;

    const project = await Train.findAll({ 
        where: {
            t_no:no
        }}); 

    var t_details=[];
    project.forEach(element => {
    t_details.push(element.dataValues);
    });

    if (t_details.length === 0) {
        res.render("reservation1byno.ejs",{project:t_details,name:Name,message:"*No train found"});
        console.log('Not found!');
    } else {
        res.render("reservation1byno.ejs",{project:t_details,name:Name,message:""});
        console.log("inside else");
    }
})  

app.post("/reservation1byname",async function(req,res){
    var t_name=req.body.t_name;

    const project = await Train.findAll({ 
        where: {
            t_name:t_name 
        }}); 

    var t_details=[];
    project.forEach(element => {
    t_details.push(element.dataValues);
    });

    if (t_details.length === 0) {
        res.render("reservation1byname.ejs",{project:t_details,name:Name,message:"*No train found"});
        console.log('Not found!');
    } else {
        res.render("reservation1byname.ejs",{project:t_details,name:Name,message:""});
        console.log("inside else");
    }
})

app.post('/book/:t_no', async function(req,res){
    let t_num=req.params.t_no;
    const project = await Train.findAll({ 
        where: {
            t_no:t_num
        }});
    Cost=project[0].dataValues.cost;
    T_no=project[0].dataValues.t_no;
    res.render("book-ticket.ejs",{name:Name,t_no:project[0].dataValues.t_no,t_name:project[0].dataValues.t_name,fromstn:project[0].dataValues.fromstn,tostn:project[0].dataValues.tostn,arrival:project[0].dataValues.arrival,cost:project[0].dataValues.cost,departure:project[0].dataValues.departure,seat_avail:project[0].dataValues.seat_avail})
})


// var p_detail=[];

app.post("/book-ticket",async function(req,res){
    try {
        let p_details=[];
        if(req.body.name1&&req.body.age1&&req.body.gender1){
            p_details.push({name:req.body.name1,age:req.body.age1,gender:req.body.gender1})
        }
        if(req.body.name2&&req.body.age2&&req.body.gender2){
            p_details.push({name:req.body.name2,age:req.body.age2,gender:req.body.gender2})
        }
        if(req.body.name3&&req.body.age3&&req.body.gender3){
            p_details.push({name:req.body.name3,age:req.body.age3,gender:req.body.gender3})
        }
        if(req.body.name4&&req.body.age4&&req.body.gender4){
            p_details.push({name:req.body.name4,age:req.body.age4,gender:req.body.gender4})
        }
        if(req.body.name5&&req.body.age5&&req.body.gender5){
            p_details.push({name:req.body.name5,age:req.body.age5,gender:req.body.gender5})
        }
        console.log(p_details);
        No_of_pass=p_details.length;
        console.log(No_of_pass);

        let book=await Booking.create({
            t_no:T_no,
            id:Id
        })
        console.log(book);

        B_id=book.dataValues.b_id;
        console.log(B_id);

        await p_details.forEach(async ele=>{
            await Passenger.create({
                b_id:B_id,
                name:ele.name,
                age:ele.age,
                gender:ele.gender
            })
            console.log(ele);
        })
        console.log("1");
        res.render("cost.ejs",{name:Name,cost:Cost,no:No_of_pass,total_cost:Cost*No_of_pass})
    }
    catch(err){
        console.log(err);
        res.redirect("/sign-up")
    }
})

app.post('/cost', async function(req,res){
    res.render("cost.ejs",{name:Name,cost:Cost,no:No_of_pass,total_cost:Cost*No_of_pass})
})

app.post('/preview-ticket',async function(req,res){

    let query = `CALL no_of_passengers(${B_id})`;
    const result = db.query(query);
    console.log(result);

    const project =await Passenger.findAll({ 
        where: {
            b_id:B_id
        }});
    console.log("project",project);
        
    console.log("2");
    p_detail=[];
    project.forEach(element => {
        p_detail.push(element.dataValues);
    });
    
    console.log("p_details",p_detail);

    res.render("preview-ticket.ejs",{project:p_detail,name:Name})
})

app.post("/book-history",async function(req,res){

    console.log("In Book");
    let query = `SELECT trains.t_no, trains.t_name, trains.fromstn, trains.tostn, bookings.passenger_no, trains.cost, bookings.b_id
    FROM bookings, trains
    WHERE bookings.t_no = trains.t_no
    AND bookings.id=${Id}`; 
    const [results] = await db.query(query);
    console.log(results);
    
    res.render("book-history.ejs",{project:results,name:Name})
})

app.post("/cancel/:b_id",async function(req,res){
    let des_id=req.params.b_id;
    console.log(des_id);

    await Booking.destroy({
        where: {
            b_id:des_id
        }
    });
    await Passenger.destroy({
        where: {
            b_id:des_id
        }
    });
    
    console.log("In Book");
    let query = `SELECT trains.t_no, trains.t_name, trains.fromstn, trains.tostn, bookings.passenger_no, trains.cost, bookings.b_id
    FROM bookings, trains
    WHERE bookings.t_no = trains.t_no
    AND bookings.id=${Id}`; 
    const [results] = await db.query(query);
    console.log(results);

    res.render("book-history.ejs",{project:results,name:Name})
})

app.listen(3000)
