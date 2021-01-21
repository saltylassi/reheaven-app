import React from "react";
import AdminPresenter from "./AdminPresenter";
import axios from "axios";
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

//admin페이지 진입 시 비밀번호 입력하도록

export default class extends React.Component {
  state = {
    versionList: [],
    reviewHistory: {},
    currentVersion: "",
    correctAnswerRate: [],
    loading: true,
  };

  setCurrentVersion = async (event) => {
    var select = document.getElementById("versionSelect");
    // console.log(select.options[select.selectedIndex].value);

    let {
      data: { version },
    } = await axios({
      method: "post",
      url: "http://localhost:4000/api/admin/apply",
      data: { version: select.options[select.selectedIndex].value },
      headers: {
        "Content-Type": "application/json",
      },
      crossDomain: true,
    });

    const { data: reviewHistory } = await axios.get(
      `http://localhost:4000/api/admin/${version}`
    );

    // console.log(`version:${version}`);

    this.setState({
      currentVersion: select.options[select.selectedIndex].value,
      reviewHistory,
    });

    this.changeState();
  };

  async componentDidMount() {
    // const { data: versionList } = await axios.get(
    //   "http://localhost:4000/api/admin/version"
    // );

    // const { data: reviewHistory } = await axios.get(
    //   `http://localhost:4000/api/admin/${versionList[0]}`
    // );

    // let correctAnswerRate = [];
    // let dt = null;
    // //모든 버전에 대해서 getVersionData를 요청
    // //correctness, total_num으로 정확도를 판단

    // for (let i = 0; i < versionList.length; i++) {
    //   dt = await axios.get(`http://localhost:4000/api/admin/${versionList[i]}`);

    //   correctAnswerRate[i] = Math.round(
    //     (dt.data.correctness.count / dt.data.total_num.count) * 100
    //   );
    //   if (dt.data.total_num.count === 0) {
    //     correctAnswerRate[i] = 0;
    //   }
    // }

    // // console.log(correctAnswerRate);

    // let {
    //   data: { version },
    // } = await axios({
    //   method: "post",
    //   url: "http://localhost:4000/api/admin/apply",
    //   data: { version: versionList[0] },
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   crossDomain: true,
    // });

    // this.setState({
    //   reviewHistory,
    //   versionList,
    //   correctAnswerRate,
    //   loading: false,
    // });

    // if (versionList && versionList.length > 0)
    //   this.setState({ currentVersion: versionList[0] });

    this.changeState();
  }

  changeState = async () => {

    let { data: versionList } = await axios.get(
      "http://localhost:4000/api/admin/version"
    );


    const { data: reviewHistory } = await axios.get(
      `http://localhost:4000/api/admin/${versionList[0]}`
    );

    let correctAnswerRate = [];
    let dt = null;
    //모든 버전에 대해서 getVersionData를 요청
    //correctness, total_num으로 정확도를 판단

    for (let i = 0; i < versionList.length; i++) {
      dt = await axios.get(`http://localhost:4000/api/admin/${versionList[i]}`);

      correctAnswerRate[i] = Math.round(
        (dt.data.correctness.count / dt.data.total_num.count) * 100
      );
      if (dt.data.total_num.count === 0) {
        correctAnswerRate[i] = 0;
      }
    }

    // console.log(correctAnswerRate);

    let {
      data: { version },
    } = await axios({
      method: "post",
      url: "http://localhost:4000/api/admin/apply",
      data: { version: versionList[0] },
      headers: {
        "Content-Type": "application/json",
      },
      crossDomain: true,
    });

    this.setState({
      reviewHistory,
      versionList,
      correctAnswerRate,
      loading: false,
    });

    if (versionList && versionList.length > 0)
      this.setState({ currentVersion: versionList[0] });


    
  };

  render() {
    const {
      versionList,
      reviewHistory,
      currentVersion,
      correctAnswerRate,
      loading,
    } = this.state;

    return loading ? (
      <Container>
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      </Container>
    ) : (
      <AdminPresenter
        versionList={versionList}
        reviewHistory={reviewHistory}
        currentVersion={currentVersion}
        correctAnswerRate={correctAnswerRate}
        setCurrentVersion={this.setCurrentVersion}
        changeState={this.changeState}
      ></AdminPresenter>
    );
  }
}
