const mongoose = require("mongoose");

const sellSchema = new mongoose.Schema({
    
    date:{
        type: String,
        required: [true, 'the date of the sell is required']
    },
    quantity_resource:{
        type: Number,
        required: [true, 'the quantity of the sell is needed']
    },
    total_price:{
        type: Number,
        required: [true, 'the total price is required']
    },
    resource: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource', required: true },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true }
 
},
{
    timestamps:true
});

const sellModel = mongoose.model("Sell", sellSchema);

module.exports = sellModel;
