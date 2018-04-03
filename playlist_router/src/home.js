/**
 * Created by ypj on 18-4-2.
 */
import React from 'react';
import {Link,Route,Redirect} from 'react-router-dom';
import Main from './main';
import Footer from './footer'


export default class Home extends React.Component{
    render(){
        let data = this.props.data;
        let selectData = data.filter((val)=>val.selected);
        let likeData = data.filter((val)=>val.like);
        return (
            <div>
                <header className="title">
                    <h2>
                        {this.props.pathName === '/'?"播放":"收藏"}列表
                        <Link to="/add" className="addLink">添加歌曲</Link>
                    </h2>
                </header>
                <Route path="/" exact render={()=>{
                    return (
                        <Main
                            data={data}
                            isCheckAll={this.props.isCheckAll}
                            checkAll={this.props.checkAll}
                            setCheck={this.props.setCheck}
                            setLike={this.props.setLike}
                            remove={this.props.remove}
                        />
                    )
                }}/>
                <Route path="/like" render={()=>{
                    if(likeData.length === 0){
                        return <Redirect to="/"/>
                    }
                    return (
                        <Main
                            data={likeData}
                            isCheckAll={this.props.isCheckAll}
                            checkAll={this.props.checkAll}
                            setCheck={this.props.setCheck}
                            setLike={this.props.setLike}
                            remove={this.props.remove}
                        />
                    )
                }}/>
                <Footer
                    pathName = {this.props.pathName}
                    length = {data.length}
                    selectLength = {selectData.length}
                    likeLength = {likeData.length}
                    removeSelect = {this.props.removeSelect}
                    likeSelect = {this.props.likeSelect}
                    cancelLikeSelect = {this.props.cancelLikeSelect}
                />
            </div>
        )
    }
}