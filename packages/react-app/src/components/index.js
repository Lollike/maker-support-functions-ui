import styled from "styled-components";

export const Header = styled.header`
  background-color: #282c34;
  min-height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

export const Body = styled.body`
  align-items: center;
  background-color: #282c34;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  justify-content: top;
  min-height: calc(100vh - 70px);
`;

export const Image = styled.img`
  height: 10vmin;
  margin-top: 0px;
  margin-bottom: 0px;
  pointer-events: none;
`;

export const Link = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})`
  color: #1AAB9B;
  margin-top: 10px;
`;

export const Button = styled.button`
  background-color: white;
  border: none;
  border-radius: 8px;
  color: #282c34;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  margin: 1px 5px;
  padding: 12px 24px;

  ${props => props.hidden && "hidden"} :focus {
    border: none;
    outline: none;
  }
`;
export const Dropdown = styled.select`
  background-color: white;
  border: none;
  border-radius: 8px;
  color: #282c34;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
  text-decoration: none;
  margin: 0px 0px;
  padding: 12px 24px;
`;