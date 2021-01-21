import React from "react";
import HomePresenter from "./HomePresenter";
import Review from "../../Components/Review";
import axios from "axios";
import XLSX from "xlsx";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      sentence: [],
      pn: [],
      inputList: [],
      xlsxData: [],
      currentVersion: "",
    };
  }
  //

  verifyString = (string) => {
    if (string.replace(/ /g, "").length === 0) {
      return false;
    }
    return true;
  };
  //
  sendReview = async (list) => {
    // console.log(list);

    //여기서 API 쓰는게 아니라 list만 집어들고 result로 넘어갈 것
    //result에서 list로 API쓰고 데이터 돌아올 동안 loader

    this.props.history.push({ pathname: "/result", state: { list } });
  };
  //
  handleSubmit = (event) => {
    event.preventDefault();
    const { sentence, pn, xlsxData } = this.state;
    var list = new Array();
    var flag = true;
    let j=0;

    if(xlsxData.length===0){
      for (var i = 0; i < sentence.length; i++) {
        list[i] = { sentence: sentence[i], pn: pn[i] };
        flag = this.verifyString(sentence[i]);
        if (flag === false) {
          i++;
          break;
        }
      }
    }else{
      for (var i = 0; i < sentence.length; i++) {
        if(sentence[i]!==""){
            list[j] = { sentence: sentence[i], pn: pn[i] };
            j++;
        }
      }
    }


    for (var data in xlsxData) {
      if (data[0] === "A" && this.verifyString(xlsxData[data].v)) {
        list[j] = { sentence: xlsxData[data].v, pn: "" };
        list[j].sentence = xlsxData[data].v;
      } else if (
        data[0] === "B" &&
        (xlsxData[data].v === 0 || xlsxData[data].v === 1)
      ) {
        list[j].pn = xlsxData[data].v;
        j++;
      } else if (data[0] === "!") {
        continue;
      } else {
        alert("입력 포맷이 올바르지 않습니다.");
        break;
      }
    }

    // for (i = 0; i < list.length; i++) {
    //   flag =
    //     this.verifyString(list[i].sentence) &&
    //     this.verifyString(String(list[i].pn));
    //   if (flag === false) {
    //     break;
    //   }
    // }

    if (flag === true) {
      this.sendReview(list);
    }
  };
  //

  upload = (event) => {
    

    if (document.getElementById("excelFile").files[0].size > 1024 * 1024 * 50) {
      alert("50MB 이하의 파일만 업로드 할 수 있습니다.");
      document.getElementById("excelFile").value = null;
    } else {
      let fileUpload = document.getElementById("excelFile");

      const reader = new FileReader();
      if (reader.readAsBinaryString) {
        reader.onload = (e) => {
          this.processExcel(reader.result);
        };
        reader.readAsBinaryString(fileUpload.files[0]);
      }
    }
  };
  //
  processExcel = (data) => {

    const workbook = XLSX.read(data, { type: "binary" });
    const name = workbook.SheetNames[0];
    const sheet = workbook.Sheets[name];

    console.log(sheet);
    
    this.setState({ xlsxData: sheet });

  };
  //
  updateReview = (event) => {
    const { sentence } = this.state;
    const { target } = event;

    let newsentence = sentence;

    newsentence[target.id] = target.value;

    if (newsentence[target.id].length > 200) {
      newsentence[target.id] = newsentence[target.id].slice(0, 200);
      target.value = target.value.slice(0, 200);
    }
    this.setState({ sentence: newsentence });
  };
  //
  addInput = (event) => {
    const { inputList, sentence, pn } = this.state;

    const newInputList = inputList.concat(
      <Review
        key={inputList.length}
        id={inputList.length}
        updateReview={this.updateReview}
        handleValue={this.handleValue}
      />
    );
    const newsentence = sentence.concat("");
    const newpn = pn.concat(0);

    if (inputList.length < 10) {
      this.setState({
        inputList: newInputList,
        sentence: newsentence,
        pn: newpn,
      });
    } else {
      alert("Input은 10개까지만 추가할 수 있습니다.");
    }
  };
  //
  subtractInput = (event) => {
    const { inputList, sentence, pn } = this.state;

    const newInputList = inputList.slice(0, -1);
    const newsentence = sentence.slice(0, -1);
    const newpn = pn.slice(0, -1);

    if (inputList.length > 1) {
      this.setState({
        inputList: newInputList,
        sentence: newsentence,
        pn: newpn,
      });
    } else {
      console.log("can't subtract");
    }
  };

  handleValue = (id) => {
    const { pn } = this.state;
    let newpn = pn;

    if (newpn[id] === 1) {
      newpn[id] = 0;
    } else {
      newpn[id] = 1;
    }
    this.setState({ pn: newpn });
  };

  async componentDidMount() {
    const version = await axios.get("http://localhost:4000/api/admin/version");

    this.addInput();

    this.setState({
      loading: false,
      currentVersion: version.data[0],
    });
  }

  render() {
    const { loading, error, sentence, inputList, currentVersion } = this.state;

    // console.log(this.state);

    return loading ? null : (
      <HomePresenter
        loading={loading}
        error={error}
        review={sentence}
        updateReview={this.updateReview}
        handleSubmit={this.handleSubmit}
        upload={this.upload}
        addInput={this.addInput}
        subtractInput={this.subtractInput}
        inputList={inputList}
        currentVersion={currentVersion}
      />
    );
  }
}
