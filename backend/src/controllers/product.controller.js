import { v2 as cloudinary } from "cloudinary";
import Product from "../models/product.model.js";

//add product
export const addProduct = async (req, res) => {
  try {
    //parse data into json format
    const productData = JSON.parse(req.body.productData);
    if (
      !productData.name ||
      !productData.category ||
      !productData.price ||
      !productData.category ||
      !productData.description
    ) {
      return res.json({ success: false, message: "Please fill all fields" });
    }
    // get uploaded files
    const images = req.files;

    //craete a array of image links
    const imageUrls = [];
    //upload in cloudinary and populate imageUrls array to store in db
    for (const file of images) {
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: "image",
      });
      imageUrls.push(result.secure_url);
    }
    //create the product in db
    await Product.create({ ...productData, image: imageUrls });
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//get all product
export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllProductsByQuery = async (req,res)=>{
 const { search, categories, minPrice = 0, maxPrice = 1000 } = req.query;
  try {
    const filter  = {inStock:true}
    
    if(search){
      filter.name ={$regex:search , $options:"i"}
    }

    if(categories){
      filter.category = {$in: categories.split(",")}
    }

    filter.price = {
      $gte: parseFloat(minPrice),
      $lte: parseFloat(maxPrice),
    };
    
    const products = await Product.find(filter).sort({createdAt:-1});
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({error:"server error"})
  }
}

//get all product by category
export const productByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category: category });
    if (!products) return res.json({ message: "Not available" });
    res.json(products);
  } catch (error) {
    res.json({ message: error.message });
  }
};
// get single product
export const productById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    res.json({ succes: false, message: error.message });
  }
};

//change product stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.json({ success: true, message: "Stock Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// get all category
export const getAllCategory = async (req, res) => {
  try {
    const allCategory = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          image: { $first: { $arrayElemAt: ["$image", 0] } }
        },
      },
      {
        $project:{
          _id:0,
          category:"$_id",
          image:1
        }
      }
    ]);
    res.json(allCategory);
  } catch (error) {
    res.json(error.message);
  }
};
