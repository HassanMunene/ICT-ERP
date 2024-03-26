import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import Loading from "../components/Loading";

function ProductPage () {
	const {id} = useParams();
	const user = useSelector((state) => state.user);
	const [product, setProduct] = useState(null);
	const [similar, setSimilar] = useState(null);

	useEffect(() => {
		axiosInstance.get(`/products/${id}`)
		.then((responseData) => {
			setProduct(responseData.data.product);
			setSimilar(responseData.data.similar);
		})
		.catch((error) => {
			console.log("error fetching a product:", error);
		});
	}, [id]);

	if(!product) {
		return <Loading/>
	}
	return (
		<div>product page</div>
	)
}

export default ProductPage;