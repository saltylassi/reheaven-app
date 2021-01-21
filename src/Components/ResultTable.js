import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { width, height } from "../assets/constants/constants";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #c8c8c8;
  padding: 10px 0;
  text-align: center;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 600;
  left: 50px;
`;

const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  text-align: center;
  border-top: 1px solid #dcdcdc;
  padding: 5px 0;
`;

const HeaderColumn = styled.div`
  width: 100%;
`;

const BodyColumn = styled.div`
  width: 100%;
`;

const Item = styled.span`
  font-size: 16px;
  text-align: center;
  color: ${(props) =>
    props.isLast ? (props.correct === true ? "#70F170" : "#FF7F50") : "black"};
  font-weight: ${(props) => (props.isLast ? 700 : 300)};
`;

const Content = styled.div`
  width: 100%;
  height: ${props=>props.length<6?null:height*0.1}px;
  overflow-y: ${(props)=>props.length>5?"scroll":"none"};
`;

//스크롤
const ResultTable = ({ List }) => (
  <Container>
    <TitleContainer>
      <HeaderColumn>
        <Title>No.</Title>
      </HeaderColumn>
      <HeaderColumn>
        <Title>입력된 예상 결과</Title>
      </HeaderColumn>
      <HeaderColumn>
        <Title>일치여부</Title>
      </HeaderColumn>
    </TitleContainer>
    <Content length={List.length}>
      {List.map((item, index) => (
        <ItemContainer key={index}>
          <BodyColumn>
            <Item isLast={false}>{index + 1}</Item>
          </BodyColumn>
          <BodyColumn>
            <Item isLast={false}>{item.result === 1 ? "긍정" : "부정"}</Item>
          </BodyColumn>
          <BodyColumn>
            <Item
              isLast={true}
              correct={item.correct === true}
              style={
                List.length > 5
                  ? { marginLeft: "24px" }
                  : null
              }
            >
              {item.actual === 1 ? "긍정" : "부정"}
            </Item>
          </BodyColumn>
        </ItemContainer>
      ))}
    </Content>
  </Container>
);

ResultTable.propTypes = {
  List: PropTypes.array.isRequired,
};

export default ResultTable;
