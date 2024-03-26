import React from "react";
import  { useState } from 'react';
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../services/appApi";
import { MdCancel } from "react-icons/md";
import axios from 'axios';
import "./NewProduct.css";

function NewProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [imgToRemove, setImgToRemove] = useState(null);
    const navigate = useNavigate();
    const [createProduct, { isError, error, isLoading, isSuccess }] = useCreateProductMutation();


    function showImageWidget () {
        const widget = window.cloudinary.createUploadWidget({
            cloudName: "sultanHamud081",
            uploadPreset: "iipauyi2",
        }, (error, result) => {
            if (!error && result.event === "success") {
                    setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
            }
        });
        widget.open();
    }

    function handleRemoveImg (imageObject) {
        setImgToRemove(imageObject.public_id);
        axios.delete(`http://localhost:8081/images/${imageObject.public_id}`)
        .then((response) => {
            setImgToRemove(null);
            setImages((prev) => prev.filter((img) => img.public_id !== imageObject.public_id));
        })
        .catch((error) => console.log("Error removing the image:", error));
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!name || !description || !price || !category || !images.length) {
            return alert("please fill out all the fields!");
        }
        createProduct({name, description, price, category, images})
        .then(({data}) => {
            if (data.length > 0) {
                setTimeout(() => {
                    navigate('/')
                }, 1500);
            }
        })
        .catch((error) => {
            console.log("error creating product:", error);
        }) 
    }

    return (
        <Container>
            <Row>
                <Col md={6} className="new-product__form--container">
                    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                        <h1 className="mt-4">Create a product</h1>
                        {isSuccess && <Alert variant="success">Product created with succcess</Alert>}
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <Form.Group className="mb-3">
                            <Form.Label>Product name</Form.Label>
                            <Form.Control type="text" placeholder="Enter product name" value={name} required onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Product description</Form.Label>
                            <Form.Control as="textarea" placeholder="Product description" style={{ height: "100px" }} value={description} required onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price(Ksh)</Form.Label>
                            <Form.Control type="number" placeholder="Price (Ksh)" value={price} required onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" onChange={(e) => setCategory(e.target.value)}>
                            <Form.Label>Category</Form.Label>
                            <Form.Select>
                                <option disabled selected>
                                    -- Select One --
                                </option>
                                <option value="technology">technology</option>
                                <option value="tablets">tablets</option>
                                <option value="phones">phones</option>
                                <option value="laptops">laptops</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Button type="button" onClick={showImageWidget}>Upload Images</Button>
                            <div className="images-preview-container">
                                {images.map((image) => (
                                    <div className="image-preview">
                                        <img src={image.url} alt="prodImg"/>
                                        <div className="removeImg" onClick={() => handleRemoveImg(image)}><MdCancel /></div>
                                    </div>
                                ))}
                            </div>
                        </Form.Group>

                        <Form.Group>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? "CREATING" : "CREAT PRODUCT"}
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={6} className="new-product__image--container"></Col>
            </Row>
        </Container>
    );
}

export default NewProduct;