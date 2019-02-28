/* eslint global-require: 0 */
import React, {Component} from 'react';
import {Grid} from '@alifd/next';
import IceContainer from '@icedesign/container';
import axios from 'axios'

const {Row, Col} = Grid;

const navigation = [
  {
    img: require('./images/TB1wdncx1SSBuNjy0FlXXbBpVXa-200-200.png'),
    title: '昨日增加粉丝',
    color: '#f8623b',
    count: '',
  },
  {
    img: require('./images/TB11ED_xYGYBuNjy0FoXXciBFXa-200-200.png'),
    title: '粉丝总数',
    color: '#37D1AB',
    count: '',
  },
  {
    img: require('./images/TB1Kvg3x4GYBuNjy0FnXXX5lpXa-200-200.png'),
    title: '昨日扫码',
    color: '#ffa001',
    count: '',
  },
  {
    img: require('./images/TB1aAH_xYGYBuNjy0FoXXciBFXa-200-200.png'),
    title: '扫码总人数',
    color: '#42C0EA',
    count: '',
  }
];

export default class OverviewBoard extends Component {
  static displayName = 'OverviewBoard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      total: [{
        img: require('./images/TB1wdncx1SSBuNjy0FlXXbBpVXa-200-200.png'),
        title: '昨日增加粉丝',
        color: '#f8623b',

      },
        {
          img: require('./images/TB11ED_xYGYBuNjy0FoXXciBFXa-200-200.png'),
          title: '粉丝总数',
          color: '#37D1AB',
          count: '',
        },
        {
          img: require('./images/TB1Kvg3x4GYBuNjy0FnXXX5lpXa-200-200.png'),
          title: '昨日扫码',
          color: '#ffa001',
          count: '',
        },
        {
          img: require('./images/TB1aAH_xYGYBuNjy0FoXXciBFXa-200-200.png'),
          title: '扫码总人数',
          color: '#42C0EA',
          count: '',
        }],
    };
  }

  componentDidMount() {
    // 使用 axios 获取数据
    axios("http://127.0.0.1:8080/getCount").then((response) => {
      console.log(response.data);
      this.updateArrayItem(response)
    });
  }

  updateArrayItem(respon) {
    this.setState({
      total: navigation.map((_item, _index) =>{
        if (_index == 0) {
          _item.count = respon.data.data.yesterdayFriend;
        }
        if (_index == 1) {
          _item.count = respon.data.data.friendtotal;
        }
        if (_index == 2) {
          _item.count = respon.data.data.yesterdayScan;
        }
        if (_index == 3) {
          _item.count = respon.data.data.scantotal;
        }
        console.log(_item);
        console.log(_index)
      } )
    });

  }


  render() {
    return (
      <Row wrap gutter={20}>
        {navigation.map((item, index) => {
          return (
            <Col xxs="12" l="6" key={index}>
              <IceContainer style={{background: item.color}}>
                <div style={styles.navItem}>
                  <div style={styles.imgWrap}>
                    <img src={item.img} alt="" style={styles.img}/>
                  </div>
                  <div style={styles.infoWrap}>
                    <p style={styles.count}>{item.count}</p>
                    <h5 style={styles.title}>{item.title}</h5>
                  </div>
                </div>
              </IceContainer>
            </Col>
          );
        })}
      </Row>
    );
  }
}

const styles = {
  navItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  imgWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '62px',
    height: '62px',
    borderRadius: '50%',
    background: '#fff',
  },
  img: {
    width: '30px',
  },
  infoWrap: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '15px',
  },
  count: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0',
  },
  title: {
    margin: '2px 0',
  },
};
