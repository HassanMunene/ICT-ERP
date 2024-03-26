const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'cannot be blank']
	},
	description: {
		type: String,
		required: [true, 'cannot be blank']
	},
	price: {
		type: String,
		required: [true, 'price cant be blank']
	},
	category: {
		type: String,
		required: [true, 'category cant be blank']
	},
	pictures: {
		type: Array,
		required: true
	},

}, {minimize: false});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;