import React from "react";
import Proptypes from "prop-types";
import styled from "styled-components";
import { width, height } from "../../assets/constants/constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const Form = styled.div`
  margin-bottom: 20px;
  width: 80%;
`;

const TitleContainer = styled.div`
  width: 100%;
  padding-bottom: 5vh;
  text-align: center;
`;

const Title = styled.h3`
  font-size: 32px;
  font-weight: 700;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 50px;
  width: 80%;
`;

const Text = styled.span`
  font-size: 16px;
  opacity: 0.6;
`;

const ButtonContainer = styled.div`
  width: 80%;
  padding: 10px 0;
`;

const ButtonInnerContainer = styled.div`

  text-align: center;
`;

const Button = styled.button`
`;

const ButtonText = styled.span`
  width:${width*0.004}px;
  height:${height*0.01}px;
  text-align: center;
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

const SubmitButton = styled.button`
  width: ${width * 0.04}px;
  height: ${height * 0.04}px;
  background-color: #0078ff;
  color: white;
  border-radius: 4px;
  border: 0 solid white;
`;

const VersionContainer = styled.div`
  margin-top: ${height * 0.05}px;
`;

const HomePresenter = ({
  loading,
  error,
  handleSubmit,
  addInput,
  subtractInput,
  inputList,
  upload,
  currentVersion,
}) => (
  <Container>
    <TitleContainer>
      <Title>리뷰 해체 분석기</Title>
    </TitleContainer>
    <TextContainer>
      <Text>최대 200자</Text>
      <Text>긍/부정</Text>
    </TextContainer>
    <Form>{inputList}</Form>
    <ButtonContainer>
      <Button onClick={addInput}>
        <ButtonInnerContainer>
          <ButtonText>+</ButtonText>
        </ButtonInnerContainer>
      </Button>
      <Button onClick={subtractInput}>
        <ButtonInnerContainer>
          <ButtonText>-</ButtonText>
        </ButtonInnerContainer>
      </Button>
      <input
        type="file"
        id="excelFile"
        onChange={upload}
        accept=".xlsx"
      />
    </ButtonContainer>
    <SubmitContainer>
      <SubmitButton onClick={handleSubmit}>
        <ButtonText>완료</ButtonText>
      </SubmitButton>
    </SubmitContainer>
    <VersionContainer>
      <Text>적용중인 버전 : {currentVersion}</Text>
    </VersionContainer>
  </Container>
);

HomePresenter.propTypes = {
  loading: Proptypes.bool.isRequired,
  error: Proptypes.string,
  handleSubmit: Proptypes.func.isRequired,
  updateReview: Proptypes.func.isRequired,
};

export default HomePresenter;
