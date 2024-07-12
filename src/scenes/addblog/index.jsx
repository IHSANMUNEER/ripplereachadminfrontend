import React, { useState } from 'react';
import { Box, Button, TextField, IconButton, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Footer from '../footer/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddBlogPost() {
    const initialBlogData = {
        category: "",
        date: "",
        title: "",
        overview: "",
        readTime: "",
        chip: {
            label: "",
            color: ""
        },
        sections: [
            {
                heading: "",
                content: "",
                imageUrl: "",
            }
        ]
    };

    const [blogData, setBlogData] = useState(initialBlogData);

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        if (name.includes("chip.")) {
            const fieldName = name.split(".")[1];
            setBlogData(prevState => ({
                ...prevState,
                chip: {
                    ...prevState.chip,
                    [fieldName]: value
                }
            }));
        } else if (name === "category" || name === "date" || name === "title" || name === "overview" || name === "readTime") {
            setBlogData(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else {
            const updatedSections = [...blogData.sections];
            updatedSections[index][name] = value;
            setBlogData(prevState => ({
                ...prevState,
                sections: updatedSections
            }));
        }
    };

    const handleAddSection = () => {
        setBlogData({
            ...blogData,
            sections: [...blogData.sections, { heading: "", content: "", imageUrl: "" }]
        });
    };

    const handleRemoveSection = index => {
        const sections = [...blogData.sections];
        sections.splice(index, 1);
        setBlogData({ ...blogData, sections });
    };

    const handleSave = async () => {
        try {
            const response = await axios.post('https://api-production-1cdf.up.railway.app/posease/addblog', blogData);
            toast.success('Blog saved successfully!');
            setBlogData(initialBlogData);
        } catch (error) {
            toast.error('Failed to save blog.');
        }
    };

    return (
        <>
            <Box sx={{ p: 2, maxWidth: 600, mx: "auto", my: 2 }}>
                <Typography variant="h2" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
                    Add New Blog Post
                </Typography>
                <TextField fullWidth label="Date" type="date" name="date" InputLabelProps={{ shrink: true }} value={blogData.date} onChange={e => handleChange(null, e)} sx={{ mb: 2 }} />
                <TextField fullWidth label="Title" name="title" value={blogData.title} onChange={e => handleChange(null, e)} sx={{ mb: 2 }} />
                <TextField fullWidth label="Overview" name="overview" multiline rows={4} value={blogData.overview} onChange={e => handleChange(null, e)} sx={{ mb: 2 }} />
                <TextField fullWidth label="Read Time" name="readTime" value={blogData.readTime} onChange={e => handleChange(null, e)} sx={{ mb: 2 }} />
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Category</InputLabel>
                    <Select label="Category" name="category" value={blogData.category} onChange={e => handleChange(null, e)}>
                        <MenuItem value="Travel">Travel</MenuItem>
                        <MenuItem value="Crypto">Crypto</MenuItem>
                        <MenuItem value="Fashion">Fashion</MenuItem>
                        <MenuItem value="Cricket">Cricket</MenuItem>
                        <MenuItem value="Technology">Technology</MenuItem>
                        <MenuItem value="Health">Health</MenuItem>
                        <MenuItem value="Science">Science</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Chip Label</InputLabel>
                    <Select label="Chip Label" name="chip.label" value={blogData.chip.label} onChange={e => handleChange(null, e)}>
                        <MenuItem value="Travel">Travel</MenuItem>
                        <MenuItem value="Crypto">Crypto</MenuItem>
                        <MenuItem value="Fashion">Fashion</MenuItem>
                        <MenuItem value="Cricket">Cricket</MenuItem>
                        <MenuItem value="Technology">Technology</MenuItem>
                        <MenuItem value="Science">Science</MenuItem>
                        <MenuItem value="Health">Health</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Chip Color</InputLabel>
                    <Select label="Chip Color" name="chip.color" value={blogData.chip.color} onChange={e => handleChange(null, e)}>
                        <MenuItem value="primary">Primary</MenuItem>
                        <MenuItem value="secondary">Secondary</MenuItem>
                        <MenuItem value="success">Success</MenuItem>
                        <MenuItem value="error">Error</MenuItem>
                    </Select>
                </FormControl>
                {blogData.sections.map((section, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                        <Typography variant="h6" sx={{ mb: 3 }}>Section {index + 1}</Typography>
                        <TextField fullWidth label="Heading" name="heading" value={section.heading} onChange={e => handleChange(index, e)} sx={{ mb: 2 }} />
                        <TextField fullWidth label="Content" name="content" multiline rows={3} value={section.content} onChange={e => handleChange(index, e)} sx={{ mb: 2 }} />
                        <TextField fullWidth label="Image URL" name="imageUrl" value={section.imageUrl} onChange={e => handleChange(index, e)} sx={{ mb: 1 }} />
                        <IconButton onClick={() => handleRemoveSection(index)} color="error">
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}
                <Button onClick={handleAddSection} startIcon={<AddCircleOutlineIcon />} sx={{ mb: 2, width: '100%', color: 'skyblue' }}>Add Section</Button>
                <Button variant="contained" onClick={handleSave} sx={{ mt: 2, mb: 2, width: '100%', backgroundColor: 'skyblue', '&:hover': { backgroundColor: 'deepskyblue' } }}>Save Blog</Button>
            </Box>
            <Footer />
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </>
    );
}

export default AddBlogPost;
