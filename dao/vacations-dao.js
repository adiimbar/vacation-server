let connection = require("./connection-wrapper");

// Only by admin
async function addTour(tour) {
    let sql = 'INSERT INTO tours (destination, description, image_path, start_date, end_date, price) VALUES(?, ?, ?, ?, ?, ?)';
    let parameters = [tour.destination, tour.description, tour.image_path, tour.start_date, tour.end_date, tour.price];
    await connection.executeWithParameters(sql, parameters);
}

// Only by admin
async function updateTour(tour) {
    let sql = "UPDATE tours SET destination = ?, description = ?, image_path = ?, start_date = ?, end_date = ?, price = ? WHERE id = ? ";
    let parameters = [tour.destination, tour.description, tour.image_path, tour.start_date, tour.end_date, tour.price, tour.id];
    await connection.executeWithParameters(sql, parameters);
}

async function updateTourFollowers(tour) {
    let sql = "UPDATE tours SET followers = ? WHERE id = ? ";
    let parameters = [tour.followers, tour.id];
    await connection.executeWithParameters(sql, parameters);
}

async function getAllTours() {
    // let sql = "SELECT id, destination, description, image_path, start_date, end_date, price, followers FROM tours";
    let sql = "SELECT * FROM tours";
    let tours = await connection.execute(sql);
    return tours;
}

async function getTourById(tourId) {
    let sql = "SELECT * FROM tours WHERE id = ?";
    let parameters = [tourId];
    let tour = await connection.executeWithParameters(sql, parameters);
    return tour;
}

// async function getAllProductsByCategoryId(categoryId) {
//     let sql = "SELECT * FROM products WHERE category_id = ?";
//     let parameters = [categoryId];
//     let products = await connection.executeWithParameters(sql, parameters);
//     return products;
// }


// async function getProductByName(productName) {
//     let sql = "SELECT * FROM products WHERE product_name = ?";
//     let parameters = [productName];
//     let products = await connection.executeWithParameters(sql, parameters);
//     // console.log(products);
//     return products;
// }

// async function getNumberOfProducts() {
//     let sql = "SELECT COUNT(product_id) AS numOfProducts FROM products";
//     let orders = await connection.execute(sql);
//     return orders;
// }
  

// // Only by admin
// async function deleteProduct(id) {
//     let sql = "DELETE FROM products WHERE product_id=?";
//     let parameters = [id];
//     await connection.executeWithParameters(sql, parameters);    
// }


module.exports = {
    addTour,
    updateTour,
    getAllTours,
    getTourById,
    updateTourFollowers
};
