var mongoose = require('mongoose')
const url = 'mongodb://jasonkwong11:11jk11@ds127101.mlab.com:27101/sandbox'
mongoose.connect(url)

var db = mongoose.connection

db.on('error', (err) => {
  console.log('connection error', err)
});

db.once('open', () => {
  console.log('Database has çonnected')
})

// adding a Schema

var Schema = mongoose.Schema

var userSchema = new Schema({
  name : String,
  age : Number,
  DOB : Date,
  isAlive : Boolean
});

userSchema.methods.isYounger = function() {
  return this.model('User').age < 50 ? true : false;
}

var User = mongoose.model('User', userSchema)

var lebron = new User({
  name: 'Lebron James',
  age: 32,
  DOB: '12/30/1984',
  isAlive: true
})

lebron.save((err, data) => {
  if (err) console.log(err);
  else console.log('Saved Lebron', data);
});

console.log('LEBRON isYounger ? :', lebron.isYounger());
