import React from 'react';

const Title = (props) => {
    const { title, fontSize, color, marginTop } = props;
    
    // Define styles for the h2 tag based on props
    const titleStyle = {
        textAlign: 'center',
        marginTop: marginTop || '3%', // Default marginTop if not provided
        fontSize: fontSize || '24px', // Default font size if not provided
        color: color || 'black', // Default color if not provided
        fontFamily: 'Vivaldi italic',
        letterSpacing: '.18rem',
    };

    return (
        <h2 style={titleStyle}>{title}</h2>
    );
}

export default Title;
