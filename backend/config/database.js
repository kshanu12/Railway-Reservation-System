const Sequelize=require("sequelize")
module.exports=new Sequelize("rail","root","",{
    host:"localhost",
    dialect:"mysql",
    // logging:false,
})