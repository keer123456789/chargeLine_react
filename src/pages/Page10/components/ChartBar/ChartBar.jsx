import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizcharts';
import { DataSet } from '@antv/data-set';
import axios from "axios";

export default class ChartBar extends Component {
  static displayName = 'ChartBar';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      data:[]
    };
  }
  componentDidMount() {
    // 使用 axios 获取数据
    axios("http://127.0.0.1:8080/getLastWeekInfo").then((response) => {
      console.log(response.data);
      this.setState({
        data: response.data.data
      })
    });
  }
  render() {
    const ds = new DataSet();
    const dv = ds.createView().source(this.state.data);
    dv.transform({
      type: 'fold',
      fields: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], // 展开字段集
      key: '月份', // key字段
      value: '月均降雨量', // value字段
    });

    return (
      <div className="chart-bar">
        <IceContainer>
          <h4 style={styles.title}>柱状图</h4>
          <Chart height={400} data={dv} forceFit>
            <Axis name="月份" />
            <Axis name="月均降雨量" />
            <Legend />
            <Tooltip crosshairs={{ type: 'y' }} />
            <Geom
              type="interval"
              position="月份*月均降雨量"
              color="name"
              adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]}
            />
          </Chart>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  title: {
    margin: '0 0 40px',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee',
  },
};
