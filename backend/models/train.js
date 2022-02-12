const Sequelize=require("sequelize");
const db=require("../config/database")

const Train=db.define("train",{
    t_no:{
        type:Sequelize.INTEGER,
        primaryKey: true,
    },
    t_name:{
        type:Sequelize.STRING
    },
    fromstn:{
        type:Sequelize.STRING
    },
    tostn:{
        type:Sequelize.STRING
    },
    arrival:{
        type:Sequelize.STRING
    },
    departure:{
        type:Sequelize.INTEGER
    },
    seat_avail:{
        type:Sequelize.INTEGER
    },
    cost:{
        type:Sequelize.FLOAT
    },
},{
    timestamps:false
});

module.exports=Train;