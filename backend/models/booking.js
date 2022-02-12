const Sequelize=require("sequelize");
const db=require("../config/database")

const Booking=db.define("booking",{
    b_id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    t_no:{
        type:Sequelize.INTEGER
    },
    id:{
        type:Sequelize.INTEGER
    },
    pay_status:{
        type:Sequelize.STRING
    },
},{
    timestamps:false
});

module.exports=Booking;