import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  text-align: center;
  background-color: #dcdcdc;
  padding: 5px 0;
  margin-top: 30px;
  border-top: 2px solid grey;
  border-bottom: 1px solid #8c8c8c;
`;

const TableText = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  border-bottom: 1px solid #8c8c8c;
  padding: 5px 0;
`;

const Item = styled.span`
  font-size: 16px;
`;

const Column = styled.div`
  width: 100%;
`;

const DBTable = ({ reviewHistory }) => (
  <>
    <TableContainer>
      <Column>
        <TableText>긍/부정</TableText>
      </Column>
      <Column>
        <TableText>개수</TableText>
      </Column>
      <Column>
        <TableText>갱신 날짜</TableText>
      </Column>
    </TableContainer>
    <ItemContainer>
      <Column>
        <Item>긍정</Item>
      </Column>
      <Column>
        <Item>{reviewHistory.positive.count}</Item>
      </Column>
      <Column>
        <Item>{reviewHistory.positive.date.slice(0,10)}</Item>
      </Column>
    </ItemContainer>
    <ItemContainer>
      <Column>
        <Item>부정</Item>
      </Column>
      <Column>
        <Item>{reviewHistory.negative.count}</Item>
      </Column>
      <Column>
        <Item>{reviewHistory.negative.date.slice(0,10)}</Item>
      </Column>
    </ItemContainer>
  </>
);

DBTable.propTypes = {
  reviewHistory: PropTypes.object.isRequired,
};

export default DBTable;
