import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  color: white;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.7);
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  width: 50px;
  height: 50px;
  text-align: center;
  border-bottom: 5px solid
    ${(props) => (props.current ? "#3498db" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
`;

const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SButton = styled.button`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 0px;
`;

const Text = styled.span`
  color: white;
  font-size: 12px;
`;

export default withRouter(({ location: { pathname } }) => (
  <Header>
    <List>
      <Item current={pathname === "/"}>
        <SLink to="/">Home</SLink>
      </Item>
      <Item current={pathname === "/admin"}>
        <SButton
          onClick={() => {
            let pw = prompt("관리자 페이지 비밀번호를 입력하세요.", "");

            if (pw == "******") {
              window.location.href = "/#/admin";
            } else if (pw !== null) {
              alert(`잘못된 비밀번호입니다.`);
            }
          }}
        >
          <Text>Admin</Text>
        </SButton>
      </Item>
    </List>
  </Header>
));
