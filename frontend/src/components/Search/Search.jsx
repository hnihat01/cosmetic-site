import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

const ParentContainer = styled.div`
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  height: 7vh; /* Full viewport height */
`;

const Container = styled.div`
  position: relative;
  width: 450px;
  height: 40px;
  border-radius: 15px;
  background-color: #efe7e4;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add box shadow */
  margin-top: 24vh;
`;

const Input = styled.input`
  width: calc(100% - 40px);
  height: 100%;
  padding: 0 10px;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: transparent;
  color: #695149;
  font-size: 16px;
  font-family:Vivaldi;
  ::placeholder {
    color: #695149; /* Placeholder text color */
    opacity: 0.5; /* Placeholder text opacity */
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Search = ({ setSearchQuery }) => {
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <ParentContainer>
      <Container>
        <Input type="text" placeholder="Search..." onChange={handleChange} />
        <IconWrapper>
          <SearchIcon style={{ color: "#7a5f55",  }} />
        </IconWrapper>
      </Container>
    </ParentContainer>
  );
};

export default Search;
