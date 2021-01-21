import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import DBTable from "../../Components/DBTable";
import ShowVersion from "../../Components/ShowVersion";
import Graph from "../../Components/Graph";
import RetrainButton from "../../Components/RetrainButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  width: 100%;
`;

const TitleContainer = styled.div`
  padding-bottom: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Title = styled.span`
  font-size: 32px;
  font-weight: 700;
`;

const Wrapper = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
`;

const DBContainer = styled.div`
  background-color: #dcdcdc;
  width: 33%;
  padding: 0 10px;
  padding-top: 20px;
  text-align: center;
  margin-right: 10px;
  border-radius: 6px;
`;

const LearningContainer = styled.div``;

const Learning = styled.button`
  width: 100%;
  height: 5vh;
  margin: 20px 0;
  background-color: #0a82ff;
  border: 0px solid white;
  border-radius: 4px;
`;

const ButtonText = styled.span`
  color: white;
  font-weight: 700;
`;

//TODO 버전

const VersionContainer = styled.div`
  background-color: #dcdcdc;
  width: 20%;
  padding: 0 10px;
  text-align: center;
  border-radius: 6px;
`;

const ChartContainer = styled.div`
  width: 33%;
  padding: 0 10px;
  padding-top: 20px;
  text-align: center;
  margin-right: 10px;
  border-radius: 6px;
`;

const AdminPresenter = ({
  versionList,
  reviewHistory,
  currentVersion,
  correctAnswerRate,
  setCurrentVersion,
  changeState,
}) => (
  <Container>
    <TitleContainer>
      <Title>관리자 페이지</Title>
    </TitleContainer>
    <Wrapper>
      <DBContainer>
        <Title>Review DB</Title>
        <DBTable reviewHistory={reviewHistory} />
        <RetrainButton changeState={changeState} />
      </DBContainer>
      <VersionContainer>
        <ShowVersion
          versionList={versionList}
          setCurrentVersion={setCurrentVersion}
          currentVersion={currentVersion}
        />
      </VersionContainer>
      <ChartContainer>
        <Graph
          correctAnswerRate={correctAnswerRate}
          versionList={versionList}
        />
      </ChartContainer>
    </Wrapper>
  </Container>
);

AdminPresenter.propTypes = {
  versionList: PropTypes.array.isRequired,
  reviewHistory: PropTypes.object.isRequired,
  setCurrentVersion: PropTypes.func.isRequired,
  correctAnswerRate: PropTypes.array.isRequired,
};

export default AdminPresenter;
