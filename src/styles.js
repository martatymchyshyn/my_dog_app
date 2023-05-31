import styled from 'styled-components';

export const AppLogo = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 20px;
  left: 20px;
  color: #fff;
  font-size: 50px;
  font-weight: bold;
  z-index: 9999;
  @media (max-width: 768px) {
    font-size: 30px;
    margin-bottom: 10px;
  }
`;

export const IconContainer = styled.div`
  margin-right: 10px;
`;
export const StyledWrapper = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #282c34;
  margin: 0 auto;
  z-index: 1;
`
export const StyledTitle = styled.h1`
  color: #fff;
  font-size: 40px;
  text-align: center;
  margin-left: auto !important;
  margin-right: auto !important;
  ::first-letter {
    color: darkcyan;
    font-size: 80px;
  }
  @media (max-width: 768px) {
    font-size: 25px;
    margin-top: 90px;
  }
`
export const StyledImageContainer = styled.div`
  margin-bottom: 20px;
`
export const StyledContainer = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: darkcyan;
  padding: 30px;
  margin: 30px;
`
export const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: white;
  font-weight: bold;
  color: #454545;
  border: none;
  cursor: pointer;
  border-radius: 15px;
`

export const StyledImagePreview = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
`

export const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
  max-height: 400px;
  @media (max-width: 768px) {
    max-height: 280px;
  }
\` ;

`
export const StyledErrorMessage = styled.div`
  color: white;
  margin-bottom: 10px;
`

export const StyledPredictionsContainer = styled.div`
  margin-top: 10px;
  font-weight: bold;
  color: #fff;
`

export const StyledDragnDropContainer = styled.div`
  margin-left: auto !important;
  margin-right: auto !important;
  width: 82%;
  height: 100px;
  border: 3px solid #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`

export const StyledInfoWrapper = styled.div`
  border-radius: 20px;
  border: 3px solid #ececec;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
`

export const StyledInfo = styled.div`
  @media (max-width: 768px) {
    font-size: 10px;
  }
`

export const StyledDragnDropInfo = styled.p`
  font-size: 16px;
  color: white;
`

export const StyledSubHeader = styled.h2`
  color: white;  
`

export const Loader = styled.div`
  color: white;
`
