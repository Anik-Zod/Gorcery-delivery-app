import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, required:true,ref:'user'},
    items : [{
        product:{type:mongoose.Schema.Types.ObjectId, required:true, ref:'product'},
        quantity:{type:Number, required:true}
    }],
    amount:{type:Number, required:true},
    address:{type:mongoose.Schema.Types.ObjectId, required:false, ref:'address'},
    status:{type:String, default:'Order Placed'},
    paymentType:{type:String, required:true},
    isPaid:{type:Boolean, required:true, default:false}
},{timestamps:true})

const Order = mongoose.model('order',orderSchema)

export default Order