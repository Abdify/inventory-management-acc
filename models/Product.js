const mongoose = require('mongoose')
// schema design
const productSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please provide a name for this product."],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 characters."],
      maxLenght: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      rquired: true,
      min: [0, "Price can't be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs"
      }
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "quantity cant be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true
          } else {
            return false
          }
        }
      },
      message: "Qunatity must be an integer"
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}"
      }
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   detfault: Date.now
    // }
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier"
    // },
    // categories: [{
    //   name: {
    //     type: String,
    //     required: true
    //   },
    //   _id: mongoose.Schema.Types.ObjectId
    // }]
  }, {
    timestamps: true,
  })
  
  
  
  // mongoose middlewares for saving data: pre / post 
  
   productSchema.pre('save',function(next){
  
    //this -> 
     console.log(' Before saving data');
       if (this.quantity == 0) {
        this.status = 'out-of-stock'
      }
  
     next()
   })
  
  
  //  productSchema.post('save',function(doc,next){
  //   console.log('After saving data');
  
  //   next()
  // })
  
  productSchema.methods.logger= function(){
    console.log(` Data saved for ${this.name}`);
  }
  
  
  // SCHEMA -> MODEL -> QUERY
  
  const Product = mongoose.model('Product', productSchema)

  module.exports = Product;