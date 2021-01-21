import React from "react";
import Proptypes from "prop-types";
import styled from "styled-components";
import ResultTable from "../../Components/ResultTable";
import Positive from "../../assets/images/Positive.png";
import Negative from "../../assets/images/Negative.png";
import PieChart from "../../Components/PieChart";
import { width, height } from "../../assets/constants/constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  width: 100%;
`;

const TitleContainer = styled.div`
  padding-bottom: 60px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
`;

const TableContainer = styled.div`
  width: 70%;
  border-top: 2px solid grey;
  border-bottom: 2px solid grey;
  margin-bottom: 30px;
`;

const Total = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
`;

const CorrectRateContainer = styled.div`
  width: 100%;
`;

const RateContainer = styled.div`
  width: 100%;
`;

const ResultContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Result = styled.span`
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 30px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`;

const Text = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const Image = styled.div`
  height: 200px;
  width: 200px;
  background-image: url(${(props) => props.bgUrl});
  background-size: contain;
  background-repeat: no-repeat;
`;

const VersionContainer = styled.div`
  margin-top:${height*0.05}px;
`;


const ResultPresenter = ({ List, positive, negative,currentVersion }) => (
  <Container>
    <TitleContainer>
      <Title>전체 분석 결과</Title>
    </TitleContainer>
    <TableContainer>
      <ResultTable List={List} />
    </TableContainer>
    <Total>
      <CorrectRateContainer>
        <PieChart
          labels={["일치", "불일치"]}
          data={[
            List.filter((item) => item.correct === true).length,
            List.filter((item) => item.correct === false).length,
          ]}
        />
        <TextContainer style={{ textAlign: "center" }}>
          <Text style={{ paddingBottom: "20px" }}>{`일치 : ${
            List.filter((item) => item.correct === true).length
          }건, 불일치 : ${
            List.filter((item) => item.correct === false).length
          }건`}</Text>
          <Text>{`정답률 ${Math.round(
            (List.filter((item) => item.correct === true).length /
              List.length) *
              100
          )}%`}</Text>
        </TextContainer>
      </CorrectRateContainer>
      <RateContainer>
        <PieChart labels={["긍정", "부정"]} data={[positive, negative]} />
        <TextContainer style={{ textAlign: "center" }}>
          <Text>{`긍정 : ${positive}건, 부정 : ${negative}건`}</Text>
        </TextContainer>
      </RateContainer>
      <ResultContainer>
        <Result>전체 결과</Result>
        <Image bgUrl={positive > List.length / 2 ? Positive : Negative} />
        <TextContainer>
          <Text>
            긍정 - {Math.round((positive / List.length) * 100)}% ( {positive}건
            )
          </Text>
          <Text>
            부정 - {Math.round((negative / List.length) * 100)}% ( {negative}건
            )
          </Text>
          <Text style={{ paddingTop: "30px" }}>
            으로 전체적으로 "{positive > List.length / 2 ? "긍정" : "부정"}
            "입니다.
          </Text>
        </TextContainer>
      </ResultContainer>
    </Total>
    <VersionContainer>
        <Text style={{fontSize:"16px",opacity:"0.6"}}>
        적용중인 버전 : {currentVersion}
        </Text>
    </VersionContainer>
  </Container>
);

ResultPresenter.propTypes = {
  List: Proptypes.array.isRequired,
  positive: Proptypes.number.isRequired,
  negative: Proptypes.number.isRequired,
};

export default ResultPresenter;
