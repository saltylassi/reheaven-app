import React from "react";
import ResultPresenter from "./ResultPresenter";
import axios from "axios";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import { height, width } from "../../assets/constants/constants";

const Container = styled.div`
  width: ${width}px;
  height: ${height}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [],
      positive: 0,
      negative: 0,
      loading: true,
      currentVersion: "",
    };
  }

  // state = {
  //   List: [],
  //   positive: 0,
  //   negative: 0,
  //   loading: true,
  // };

  //모델측에서 연산이 끝날 때 까지 loader를 띄우고 대기
  //연산이 끝나고 API가 데이터를 뜯어오면 출력

  async componentDidMount() {
    const version = await axios.get("http://localhost:4000/api/admin/version");

    let list = this.props.location.state.list;
    let array = new Array();

    console.log(list);

    const result = await axios({
      method: "post",
      url: "http://localhost:4000/api/home/send",
      data: { list },
      headers: {
        "Content-Type": "application/json",
      },
      crossDomain: true,
    });

    // console.log("done");
    console.log(result);

    for (var i = 0; i < list.length; i++) {
      array[i] = {
        result: list[i].pn,
        actual: result.data[i],
        correct: list[i].pn === result.data[i] ? true : false,
      };
    }
    // console.log(array);

    this.setState({
      List: array,
      positive: result.data.filter((item) => item === 1).length,
      negative: result.data.filter((item) => item === 0).length,
      loading: false,
      currentVersion: version.data[0],
    });

    //API
  }

  render() {
    const { positive, negative, List, loading, currentVersion } = this.state;

    return loading ? (
      <Container>
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      </Container>
    ) : (
      <ResultPresenter
        List={List}
        positive={positive}
        negative={negative}
        currentVersion={currentVersion}
      />
    );
  }
}
