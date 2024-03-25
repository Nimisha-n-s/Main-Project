import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart, FaTrash } from "react-icons/fa";
import './Home.css';
import API_URL from "../constants";

function MyProducts() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = API_URL + '/my-products';
                const userId = localStorage.getItem('userId');
                const response = await axios.post(url, { userId });
                setProducts(response.data.products);
            } catch (error) {
                alert('Server Error');
            }
        };
        fetchData();
    }, []);

    const handleSearch = (value) => {
        setSearch(value);
    }

    const handleLike = (productId) => {
        const userId = localStorage.getItem('userId');
        const url = API_URL + '/like-product';
        const data = { userId, productId };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert('Liked.');
                }
            })
            .catch((err) => {
                alert('Server Err.');
            });
    }

    const handleDelete = async (productId) => {
        try {
            const url = API_URL + '/delete-product';
            await axios.delete(url, { data: { productId } });
            const updatedProducts = products.filter((product) => product._id !== productId);
            setProducts(updatedProducts);
            alert('Product deleted successfully.');
        } catch (error) {
            alert('Error deleting product.');
        }
    }

    return (
        <div>
            <Header search={search} handlesearch={handleSearch} />

            <Categories />

            <div className="d-flex justify-content-center flex-wrap">
                {products.map((item) => (
                    <div key={item._id} className="card m-3">
                        <div className="icon-con" onClick={() => handleLike(item._id)}>
                            <FaHeart className="icons" />
                        </div>
                        <div className="icon-con" onClick={() => handleDelete(item._id)}>
                            <FaTrash className="icons" />
                        </div>
                        <img width="300px" height="200px" src={API_URL + '/' + item.pimage} alt={item.pname} />
                        <p className="m-2">{item.pname} | {item.category}</p>
                        <p className="m-2 text-danger">{item.details}</p>
                        <p className="m-2 text-success">{item.pdesc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyProducts;
