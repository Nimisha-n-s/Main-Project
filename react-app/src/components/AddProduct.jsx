import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import categories from "./CategoriesList";
import API_URL from "../constants";

function AddProduct() {

    const navigate = useNavigate();
    const [pname, setpname] = useState('');
    const [pdesc, setpdesc] = useState('');
    const [details, setdetails] = useState('');
    const [category, setcategory] = useState('');
    const [pimage, setpimage] = useState('');
    const [pimage2, setpimage2] = useState('');

// eslint-disable-next-line no-unused-vars
useEffect(() => {
    if (!localStorage.getItem('token')) {
        navigate('/login');
    }
}, [navigate]);
    

    const handleApi = () => {

        navigator.geolocation.getCurrentPosition((position) => {
            const formData = new FormData();
            formData.append('plat', position.coords.latitude)
            formData.append('plong', position.coords.longitude)
            formData.append('pname', pname)
            formData.append('pdesc', pdesc)
            formData.append('details', details)
            formData.append('category', category)
            formData.append('pimage', pimage)
            formData.append('pimage2', pimage2)
            formData.append('userId', localStorage.getItem('userId'))

            const url =  API_URL + '/add-product';
            axios.post(url, formData)
                .then((res) => {
                    if (res.data.message) {
                        alert(res.data.message); 
                        navigate('/')
                    }
                })
                .catch((err) => {
                    alert('server err')
                })
        })



    }

    return (
        <div>
            <Header />
            <div className="p-3">

                <h2> ADD PRODUCT HERE : </h2>
                <label> Product Name </label>
                <input className="form-control" type="text" value={pname}
                    onChange={(e) => { setpname(e.target.value) }} />
                <label> Product Description </label>
                <input className="form-control" type="text" value={pdesc}
                    onChange={(e) => { setpdesc(e.target.value) }} />
                <label> Location & details</label>
                <input className="form-control" type="text" value={details}
                    onChange={(e) => { setdetails(e.target.value) }} />
                <label> Product Category </label>
                <select className="form-control" value={category}
                    onChange={(e) => { setcategory(e.target.value) }}>
                    <option> Bikes </option>
                    <option> Mobiles </option>
                    <option> Cloth </option>
                    {
                        categories && categories.length > 0 &&
                        categories.map((item, index) => {
                            return (
                                <option key={'option' + index}> {item} </option>
                            )
                        })
                    }
                </select>
                <label> Product Image </label>
                <input className="form-control" type="file"
                    onChange={(e) => {
                        setpimage(e.target.files[0])
                    }} />

                <label> Product Second Image </label>
                <input className="form-control" type="file"
                    onChange={(e) => {
                        setpimage2(e.target.files[0])
                    }} />
                <button onClick={handleApi} className="btn btn-primary mt-3"> SUBMIT </button>
            </div>

        </div>
    )
}

export default AddProduct;