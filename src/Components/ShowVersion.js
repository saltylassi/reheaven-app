import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div``;

const TitleContainer = styled.div`
  padding-top: 20px;
`;

const Title = styled.span`
  font-size: 28px;
  font-weight: 700;
`;

const Current = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #0a82ff;
`;

const CurrentContainer = styled.div`
  padding: 20px 0;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 70%;
`;

const ApplyButton = styled.button`
  background-color: #0a82ff;
  border: 0px solid white;
  border-radius: 4px;
  width: 50%;
`;

const ButtonText = styled.span`
  color: white;
`;

const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Select = styled.select`
  padding: 10px 25px;
  display: flex;
  justify-content: flex-start;
`;

const Option = styled.option``;

//TODO Select 핸들러함수 AdminContainer에 작성하고 보낼 것
const ShowVersion = ({ versionList, setCurrentVersion, currentVersion }) => (
  <Container>
    <TitleContainer>
      <Title>현재 적용 버전</Title>
    </TitleContainer>
    <CurrentContainer>
      <Current>{currentVersion}</Current>
    </CurrentContainer>
    <Column>
      <ItemContainer>
        <Select id={"versionSelect"}>
          {versionList.map((item, index) => (
            <Option key={index} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </ItemContainer>
      <ButtonContainer>
        <ApplyButton onClick={setCurrentVersion}>
          <ButtonText>적용</ButtonText>
        </ApplyButton>
      </ButtonContainer>
    </Column>
  </Container>
);

ShowVersion.propTypes = {
  versionList: PropTypes.array.isRequired,
  setCurrentVersion: PropTypes.func.isRequired,
};

export default ShowVersion;
