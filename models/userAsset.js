const mongoose=require('mongoose');
const userAssetSchema=mongoose.Schema({
    userId:Number,
    fridge:{
        type: Boolean,
        default:false
    },
    AC:{
        type: Boolean,
        default:false
    },
    Car:{
        type:Boolean,
        default:false
    },
    Bike:{
        type:Boolean,
        default:false
    }

})
module.exports=mongoose.model("UserAsset",userAssetSchema);