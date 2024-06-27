import React from 'react';
import styled from 'styled-components';
import logo from './images/logo.png';

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #f8f8f8;
  width: 100%;
  box-sizing: border-box;
  
  @media(min-width: 768px) {
    flex-direction: row;
  }
`;

const ContactDetails = styled.div`
  font-family: 'Poppins', sans-serif;
  color: #020030;
  margin-bottom: 16px;
  
  @media(min-width: 768px) {
    margin-bottom: 0;
  }

  .title {
    font-weight: bold;
    font-size: 1.25rem;
    margin-bottom: 8px;
  }

  .details {
    font-size: 1rem;
    font-weight: normal;
  }
`;

const Logo = styled.img`
  width: 100px;
  height: auto;

  @media(min-width: 768px) {
    width: 176px;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <ContactDetails>
        <div className="title">Contact Details:</div>
        <div className="details">
          <p>Thomas - 08123456789</p>
          <p>Sekar - 08164829372</p>
        </div>
      </ContactDetails>
      <Logo src={logo} alt="Logo" />
    </FooterContainer>
  );
}

export default Footer;
