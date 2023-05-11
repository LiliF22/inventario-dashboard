import React, { useState } from "react";

import { styled } from "@mui/material";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

const RatingStars = () => {
    //Calificaciones de estrellas MUI
    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
        color: '#e9dd3b',
        },
        '& .MuiRating-iconHover': {
        color: '#6799cf',
        }
    });
    
    const [formData, setFormData] = useState({ score: 0 })

    return (
        <div className="d-flex align-items-center">
            <StyledRating
                name="simple-rating"
                size="large"
                sx={{fontSize: "2rem", borderColor: "#fff"}}
                defaultValue={0}
                value={formData.score}
                onChange={(event, newValue) => {
                    setFormData({...formData, score: newValue});
                }}
            />
            {formData.score !== null && <Box sx={{ ml: 2 }}>{formData.score}</Box>}
        </div>
    )
}
export default RatingStars;