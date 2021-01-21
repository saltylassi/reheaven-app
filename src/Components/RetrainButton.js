import React from "react";
import styled from "styled-components";
import axios from "axios";
import Loader from "react-loader-spinner";
import io from "socket.io-client";

const socketClient = io("http://localhost:8080");

socketClient.on("connect",()=>{
  console.log("connected")
})


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

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRetrainable: false,
    };
  }

  retrain = async () => {
    //전송 data는 DB내용으로

    this.setState({ isRetrainable: false });

    let { data: result } = await axios({
      method: "post",
      url: "http://localhost:4000/api/admin/retrain",
      headers: {
        "Content-Type": "application/json",
      },
      crossDomain: true,
    });

    // console.log(`button:${result}`);
    // console.log(typeof result);

    this.setState({ isRetrainable: result });
    this.props.changeState();
  };

  async componentDidMount() {
    let { data: result } = await axios({
      method: "get",
      url: "http://localhost:4000/api/admin/check",
      headers: {
        "Content-Type": "application/json",
      },
      crossDomain: true,
    });
    // console.log(`didMount:${result}`);
    // console.log(typeof result);

    this.setState({ isRetrainable: result });
    //여기서 확인할 것
    //admin페이지 접속 시 웹서버에 재학습 진행여부 확인
    //결과로 setState
    //retrain함수는 재학습 진행중이 아닐때만 활성화

    // socketClient.emit("request", { data: "request" }); 
    // socketClient.on("respond", req => { console.log(req); });

  }

  render() {
    const { isRetrainable } = this.state;

    // console.log(`render:${isRetrainable}`);
    // console.log(typeof isRetrainable);

    return isRetrainable === "true" ? (
      <LearningContainer>
        <Learning onClick={this.retrain}>
          <ButtonText>재학습</ButtonText>
        </Learning>
      </LearningContainer>
    ) : (
      <LearningContainer>
        <Learning>
          <Loader type="Puff" color="black" height={30} width={30} />
        </Learning>
      </LearningContainer>
    );
  }
}
