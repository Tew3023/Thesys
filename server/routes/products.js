const router = require('express').Router();
const ProductSchema = require('../models/product');

router.get('/products', async (req, res) => {
  try {
    const products = await ProductSchema.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
});

router.get('/:id', async (req,res)=>{
  const {id} = req.params
  try{
    const product = await ProductSchema.findById(id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  }catch(error){
    res.status(500).json({ error: error.message }); 
  }
})


module.exports = router;
