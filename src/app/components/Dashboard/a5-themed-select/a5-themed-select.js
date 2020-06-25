import React, {Component} from 'react';
import './a5-themed-select.css';
import _ from 'lodash';

const upKey = 38;
const downKey = 40;
const enterKey = 13;

class A5DBSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allowDisplay: false,
      displayList: this.props.itemList,
      selectedValue:
        (this.props.defaultValue && this.props.defaultValue.symbol) || '',
      isDirty: false,
      activeDisplayIndex: null,
    };
  }

  componentWillReceiveProps = (newProps) => {
    if (!_.isEqual(newProps.itemList, this.props.itemList)) {
      this.setState({displayList: newProps.itemList});
    }
    if (!_.isEqual(newProps.defaultValue, this.props.defaultValue)) {
      this.setState({selectedValue: newProps.defaultValue.symbol});
    }
  };

  inputRef = React.createRef();

  onFocusIn = (e) => {
    this.setState({allowDisplay: true});
  };

  onBlur = (e) => {
    if (!this.state.displayList.length) {
      this.inputRef.current.value = '';
    }
    this.setState({allowDisplay: false});
    this.state.displayList = this.props.itemList;
  };

  inputHandle = (e) => {
    if (e.target.value == '')
      this.setState({
        inputValue: e.target.value,
        displayList: this.props.itemList,
        isDirty: true,
      });
    else {
      let displayList = this.props.itemList.filter(
        (el) =>
          el.symbol.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1,
      );
      this.setState({
        inputValue: e.target.value,
        allowDisplay: true,
        displayList,
        isDirty: true,
      });
    }
  };

  moveUp = () => {
    let list = this.state.displayList;
    if (list.length && !this.state.activeDisplayIndex) {
      this.state.activeDisplayIndex = list.length - 1;
    }
  };

  moveDown = () => {
    let list = this.state.displayList;
    if (list.length) {
      this.state.activeDisplayIndex = 0;
    }
  };

  handleNavKeys = (e) => {
    console.log(e.keyCode);
    switch (e.keyCode) {
      case upKey:
        break;
      case downKey:
        break;
    }
  };

  toggleList = () => {
    this.setState((p) => ({allowDisplay: !p.allowDisplay}));
  };

  selectItem = (item) => {
    this.setState({
      selectedValue: item.symbol,
      inputValue: item.symbol,
      allowDisplay: false,
      displayList: this.props.itemList,
    });
    this.inputRef.current.value = item.symbol;
    this.inputRef.current.blur();
    this.props.onChange(item);
  };

  renderList = () => {
    if (this.state.allowDisplay)
      return this.state.displayList.map((item, ind) => (
        <li
          onMouseDown={(e) => {
            e.preventDefault();
            this.selectItem(item);
          }}
          key={ind}
          className="a5-list-item"
        >
          {item.symbol}
        </li>
      ));
    else {
      return <></>;
    }
  };

  render() {
    return (
      <>
        <div className="a5-select-container">
          <div className="a5-select-input">
            <input
              onInput={this.inputHandle}
              onFocus={this.onFocusIn}
              onBlur={this.onBlur}
              onClick={this.onFocusIn}
              placeholder={this.props.placeholder}
              type="text"
              ref={this.inputRef}
              defaultValue={this.state.selectedValue}
              onKeyDown={this.handleNavKeys}
            />

            <div onClick={this.toggleList} className="drop-down-arrow"></div>
          </div>
          {this.state.allowDisplay ? (
            <ul className="a5-select-list">{this.renderList()}</ul>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default A5DBSelect;
