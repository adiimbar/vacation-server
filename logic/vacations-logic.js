let vacationsDao = require("../dao/vacations-dao");
const validation = require("../validation/validation");


async function addProduct(product) {

    delete product.productId;

    await validation.addProductValidation(product);

    await productsDao.addProduct(product);
}

// Only by admin
async function updateProduct(product) {

    let oldProductDetails = await productsDao.getProductById(product.productId);

    if(product.category == '') {
        console.log('first condition is true');
        product.category = oldProductDetails[0].category_id;
    }
    if(product.productImage == '') {
        product.productImage = oldProductDetails[0].image_path;
    }

    await validation.updateProductValidation(product);

    await productsDao.updateProduct(product);
}

async function getAllProducts() {
    // Validations
    let products = await productsDao.getAllProducts();
    return products;
}

async function getAllProductsByCategoryId(categoryId) {
    let products = await productsDao.getAllProductsByCategoryId(categoryId);
    // console.log(products);
    return products;
}

async function getProductByName(productName) {

    let obj = {
        productName: productName
    }

    await validation.getProductByNameValidation(obj);
    
    let product = await productsDao.getProductByName(productName);
    // console.log(product);
    return product;
}

async function getNumberOfProducts() {
    // Validations
    let numberOfProducts = await productsDao.getNumberOfProducts();
    return numberOfProducts
}

// async function deleteProduct(id) {
//     await usersDao.deleteProduct(id);
// }


module.exports = {
};

