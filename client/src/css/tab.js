import styled from "styled-components";
export const Tabs = styled.div`
  overflow: hidden;
  background: #2C5364;
  width:90%;
  margin: 2vw auto;
  display:block;
  font-family: Open Sans;
  height: 3em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const Tab = styled.button`
  border: ${(props) => (props.active ? "1px solid #2C5364" : "1px solid #0F2027")};
  outline: none;
  color:#fff;
  cursor: pointer;
  margin:0 1%;
  position: relative;
  font-size: 1em;
  border-radius: 0px;
  width: 100%;
  background-color: ${(props) => (props.active ? "#2C5364" : "#0F2027")};
  transition: background-color 0.5s ease-in-out;
`;
export const Content = styled.div`
  ${(props) => (props.active ? "" : "display:none")}
`;