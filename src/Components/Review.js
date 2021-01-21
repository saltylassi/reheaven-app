import React from "react";
import styled from "styled-components";
import ToggleButton from "react-toggle-button";

const Container = styled.div`
  padding-bottom: 20px;
`;

const Textarea = styled.textarea`
  width: 90%;
  height: 10vh;
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  onToggle = () => {
    const { value } = this.state;
    let newValue = value;
    if (value === 1) {
      newValue = 0;
    } else {
      newValue = 1;
    }
    this.setState({ value: newValue });
    this.props.handleValue(this.props.id);
  };

  render() {
    const { value } = this.state;
    // console.log(value);
    return (
      <Container>
        <ButtonContainer>
          <Textarea
            id={this.props.id}
            onChange={this.props.updateReview}
            placeholder="입력"
          />

          <ToggleButton
            inactiveLabel={""}
            activeLabel={""}
            value={value}
            onToggle={this.onToggle}
          />
        </ButtonContainer>
      </Container>
    );
  }
}
