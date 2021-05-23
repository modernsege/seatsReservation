import React, {useState, useEffect} from 'react'
import 'antd/dist/antd.css';
import '../index.css';
import '../css/userInput.css';
import { Input, Tooltip, Checkbox, Button} from 'antd';

function formatNumber(value) {
    value += '';
    const list = value.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
  }
  
  class NumericInput extends React.Component {
    onChange = e => {
      const { value } = e.target;
      const reg = /^-?\d*(\.\d*)?$/;
      if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
        this.props.onChange(value);
      }
    };
  
    // '.' at the end or only '-' in the input box.
    onBlur = () => {
      const { value, onBlur, onChange } = this.props;
      let valueTemp = value;
      if (value.charAt(value.length - 1) === '.' || value === '-') {
        valueTemp = value.slice(0, -1);
      }
      onChange(valueTemp.replace(/0*(\d+)/, '$1'));
      if (onBlur) {
        onBlur();
      }
    };
  
    render() {
      const { value } = this.props;
      const title = value ? (
        <span className="numeric-input-title">{value !== '-' ? formatNumber(value) : '-'}</span>
      ) : (
        'Input a number'
      );
      return (
        <Tooltip
          trigger={['focus']}
          title={title}
          placement="topLeft"
          overlayClassName="numeric-input"
        >
          <Input
            {...this.props}
            onChange={this.onChange}
            onBlur={this.onBlur}
            maxLength={25}
          />
        </Tooltip>
      );
    }
  }


  class NumericInputDemo extends React.Component {
    constructor(props) {
      super(props);
      this.state = { value: '' };
    }
  
    onChange = value => {
      this.setState({ value });
    };

    
  
    render() {
      return (
          <div className="user-input-site-wrapper">
                <div className="place-number-input">
                    <span>Liczba miejsc:</span>
                    <NumericInput style={{ width: 120, float: 'right' }} value={this.state.value} onChange={this.onChange} />
                </div>
                <div className="chceckbox-seats-next-to-each-others">
                    <Checkbox style={{marginRight: 10}}></Checkbox>
                    <span>Czy miejsca mają być obok siebie?</span>
                </div>
                <button className="user-input-button">
                    Wybierz miejsca
                </button>
          </div>
        
      );
    }
  }


export default NumericInputDemo