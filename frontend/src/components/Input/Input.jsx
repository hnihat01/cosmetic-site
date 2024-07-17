import React, { useState } from 'react';

function Input() {
    const [pname, setProductName] = useState('');
    const [milliliters, setMilliliters] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState('');
    const [secondImg, setSecondImg] = useState(null);
    const [thirdImg, setThirdImg] = useState(null);
    const [secDes, setSecDes] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [aboutBrand, setAboutBrand] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!pname || !milliliters || !brand || !price || !imageUrl || !description || !secondImg || !thirdImg || !secDes || !ingredients || !aboutBrand || !category) {
            console.log("All fields are required!", category);
            alert("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append('pname', pname);
        formData.append('milliliters', milliliters);
        formData.append('brand', brand);
        formData.append('price', price);
        formData.append('imageUrl', imageUrl);
        formData.append('rating', rating);
        formData.append('description', description);
        formData.append('secondImage', secondImg);
        formData.append('thirdImage', thirdImg);
        formData.append('secDes', secDes);
        formData.append('ingredients', ingredients);
        formData.append('aboutBrand', aboutBrand);
        formData.append('category', category);

        // Log formData keys and values for debugging
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        try {
            const response = await fetch('http://localhost:8080/feed/posts', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Reset form fields after successful submission
            setProductName('');
            setMilliliters('');
            setBrand('');
            setPrice('');
            setImageUrl(null);
            setRating(0);
            setDescription('');
            setSecondImg(null);
            setThirdImg(null);
            setSecDes('');
            setIngredients('');
            setAboutBrand('');
            setCategory('');
        } catch (error) {
            console.error('There was a problem submitting the form:', error);
        }
    };

    const handleFileChange = (e, setImage) => {
        setImage(e.target.files[0]);
    };

    return (
        <div style={{ marginLeft: '100px' }}>
            <h2>Product Information Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="pname">Product Name:</label><br />
                <input
                    type="text"
                    id="pname"
                    name="pname"
                    value={pname}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                /><br />

                <label htmlFor="milliliters">Milliliters:</label><br />
                <input
                    type="number"
                    id="milliliters"
                    name="milliliters"
                    value={milliliters}
                    onChange={(e) => setMilliliters(e.target.value)}
                    required
                /><br />

                <label htmlFor="brand">Brand:</label><br />
                <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                /><br />

                <label htmlFor="price">Price:</label><br />
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                /><br />

                <label htmlFor="imageUrl">Main Image:</label><br />
                <input
                    type="file"
                    id="imageUrl"
                    name="imageUrl"
                    onChange={(e) => handleFileChange(e, setImageUrl)}
                    required
                /><br />

                <label htmlFor="secondImage">Second Image:</label><br />
                <input
                    type="file"
                    id="secondImage"
                    name="secondImage"
                    onChange={(e) => handleFileChange(e, setSecondImg)}
                    required
                /><br />

                <label htmlFor="thirdImage">Third Image:</label><br />
                <input
                    type="file"
                    id="thirdImage"
                    name="thirdImage"
                    onChange={(e) => handleFileChange(e, setThirdImg)}
                    required
                /><br />

                <label htmlFor="description">Description:</label><br />
                <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    required
                /><br />

                <label htmlFor="secDes">Second Description:</label><br />
                <textarea
                    id="secDes"
                    name="secDes"
                    value={secDes}
                    onChange={(e) => setSecDes(e.target.value)}
                    rows="4"
                    required
                /><br />

                <label htmlFor="ingredients">Ingredients:</label><br />
                <textarea
                    id="ingredients"
                    name="ingredients"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    rows="4"
                    required
                /><br />

                <label htmlFor="aboutBrand">About Brand:</label><br />
                <textarea
                    id="aboutBrand"
                    name="aboutBrand"
                    value={aboutBrand}
                    onChange={(e) => setAboutBrand(e.target.value)}
                    rows="4"
                    required
                /><br />

                <label htmlFor="category">Category:</label><br />
                <input
                    type="text"
                    id="category"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                /><br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Input;
