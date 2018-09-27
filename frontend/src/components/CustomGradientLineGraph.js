import React, {Component} from 'react';
import {ResponsiveContainer,defs, Area, AreaChart, linearGradient , XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export default class CustomLineGraph extends Component{

  constructor(props){
    super(props);

    this.state = {
      lineData: [],
    }
  }

  mapDataToLines = (data) => {
    return data.map(lData => {
      return(
        <Area dot={false} key={lData.id} yAxisId={this.props.yAxisId} isAnimationActive={this.props.isAnimationActive} type="monotone" dataKey={lData.datakey} stroke={lData.color} fill={"url(#colorUv"+ lData.id +")"} />
      )
    })
  }

  componentWillMount(){
    this.setState({
      lineData: this.mapDataToLines(this.props.compileData)
    })
  }
  

  render(){
    return(
      <ResponsiveContainer width="100%" height="100%" >
        <AreaChart data={[...this.props.data]}>
            <defs>
                <linearGradient id={"colorUv"+this.props.id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={this.props.lineColor || "#fff"} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={this.props.lineColor || "#fff"} stopOpacity={0}/>
                </linearGradient>
            </defs>
          <CartesianGrid stroke={this.props.axisColor || "#fff"} strokeDasharray="3 3" />
          <XAxis tick={{ fill: this.props.axisColor || "#fff" }} dataKey={this.props.xaxis} />
          <YAxis domain={['auto', 'auto']} yAxisId={this.props.yAxisId} tick={{ fill: this.props.axisColor || "#fff" }}/>
          <Tooltip contentStyle ={{backgroundColor: "#252525"}}/>
          <Legend tick={{ fill: this.props.axisColor || "#fff" }}/>
          {this.state.lineData}
        </AreaChart>
      </ResponsiveContainer>
    )
  }
}