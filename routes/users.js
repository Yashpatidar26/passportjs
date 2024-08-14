var mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/passport1")
var passportLocalMongoose = require('passport-local-mongoose');

mongoose.set('strictQuery', true);
var userSchema = mongoose.Schema({
/* username and password important for passports */
username:String,
password:String,
name:String,
email:String,
desc:String,
friends:{
    type: Array,
    default:[]
}
});

userSchema.plugin(passportLocalMongoose);
var userModel= mongoose.model("users",userSchema);

module.exports = mongoose.model('user',userSchema);