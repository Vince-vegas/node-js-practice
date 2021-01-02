const Product = require('../models/productModel');

exports.homepage = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: 'Homepage',
  });
};

//products/top-sales
exports.getTopSales = (req, res, next) => {
  req.query.sort = '-rating';
  req.query.page = 1;
  next();
};

exports.getProducts = async (req, res) => {
  try {
    console.log(req.query);
    let queryObj = { ...req.query };
    let fieldsArr = ['page', 'sort', 'limit', 'fields'];
    fieldsArr.forEach((el) => delete queryObj[el]);

    let query = Product.find(queryObj);

    // SORTING
    // sort=-rating,-price
    if (req.query.sort) {
      const sortQuery = req.query.sort.split(',').join(' ');
      query = query.sort(`${sortQuery}`);
    }

    // LMT
    // fields=name,price,rating
    if (req.query.fields) {
      const fieldsQuery = req.query.fields.split(',').join(' ');
      query = query.select(fieldsQuery);
    } else {
      query = query.select('-__v');
    }

    // PAGINATION
    // page=1
    if (req.query.page) {
      query = query.skip(parseInt(req.query.page) - 1).limit(3);
    }

    let products = await query;

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const createdProduct = await Product.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        product: createdProduct,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        updatedProduct,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: {},
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

exports.getTopRatings = async (req, res) => {
  try {
    const topRate = await Product.aggregate([]);

    // const topRate = await Product.aggregate([
    //   {
    //     $group: {
    //       _id: '$rating',
    //       maxStock: { $max: '$stock' },
    //       numCount: { $sum: 1 },
    //     },
    //   },
    // ]);

    res.status(200).json({
      status: 'success',
      // results: topRate.length,
      topRate,
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};
