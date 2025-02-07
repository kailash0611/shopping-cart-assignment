const axios = require("axios");

const PRICE_API_URL = "http://localhost:3001/products";

exports.getProductPrice = async (product) => {
    try {
        const response = await axios.get(`${PRICE_API_URL}/${product}`);

        if (response.data && response.data.price) {
            return response.data.price;
        } else {
            throw new Error(`Price not found for product: ${product}`);
        }
    } catch (error) {
        throw new Error(`Failed to fetch price for ${product}: ${error.message}`);
    }
};
