import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import Home from './home';
import Add from './add';

class APP extends React.Component{
    constructor(props){
        super(...arguments);
        this.now = 0,
            this.state = {
                data:[/*
                    {
                        id:0,
                        title:"木乃伊",
                        singer:"林俊杰",
                        selected:true,
                        like:false
                    },
                    {
                        id:1,
                        title:"不要说话",
                        singer:"陈奕迅",
                        selected:true,
                        like:true
                    },
                    {
                        id:2,
                        title:"半城烟沙",
                        singer:"许嵩",
                        selected:true,
                        like:false
                    },
                    {
                        id:3,
                        title:"匆匆那年",
                        singer:"王菲",
                        selected:true,
                        like:false
                    }
               */ ]
            }
        this.add = this.add.bind(this);
        this.setCheckAll = this.setCheckAll.bind(this);
        this.setCheck = this.setCheck.bind(this);
        this.setLike = this.setLike.bind(this);
        this.remove = this.remove.bind(this);
        this.removeSelect = this.removeSelect.bind(this);
        this.likeSelect = this.likeSelect.bind(this);
        this.cancelLikeSelect = this.cancelLikeSelect.bind(this);
    }
    add(title,singer){
        let data = this.state.data;
        data.push(
            {
                id:this.now,
                title:title,
                singer:singer,
                selected:false,
                like:false
            }
        )
        this.now++
        this.setState({data})
    }
    isCheckAll(){
        let data = this.state.data;
        for(let i =0 ; i<data.length;i++){
            if(!data[i].selected)
                return false;
        }
        return true;
    }
    setCheckAll(checked){
        let data = this.state.data.map((val)=>{
            val.selected = checked;
            return val;
        })
        this.setState({
            data
        })

    }
    setCheck(index,checked){
        let data = this.state.data;
        data.forEach((val)=>{
            if(val.id === index)
                val.selected = checked;
        })

        this.setState({
            data
        })
    }
    setLike(index,checked){
        let data = this.state.data;
        data.forEach((val)=>{
            if(val.id === index)
                val.like = checked;
        })
        this.setState({
            data
        })
    }
    remove(index){
        let data = this.state.data.filter((val)=>val.id!==index)
        this.setState({
            data
        })
    }
    removeSelect(){
        let data = this.state.data.filter((val)=>!val.selected)
        this.setState({
            data
        })
    }
    likeSelect(){
        let data = this.state.data.map((val)=>{
            if(val.selected)
                val.like = true
            return val;
        })
        this.setState({
            data
        })

    }
    cancelLikeSelect(){
        let data = this.state.data.map((val)=>{
            if(val.selected)
                val.like = false
            return val;
        })
        this.setState({
            data
        })

    }
    shouldComponentUpdate(nextProps,nextState){
        if(!nextState.listState){
            let likeData = nextState.data.filter((val)=>val.like);
            if(!likeData.length){
                this.setState({
                    listState:true
                })
                return false
            }
        }
        return true
    }
    render(){
        let data = this.state.data;
        let selectData = data.filter((val)=>val.selected);
        let likeData = data.filter((val)=>val.like);

        return (
            <BrowserRouter>
                <div id="musicApp">
                    <Switch>
                        <Route path="/add" render={(e)=>{
                            return(
                                <Add
                                    length = {this.state.data.length}
                                    add = {this.add}
                                    router = {e}
                                />
                                )
                        }} />
                        <Route path="/" render={(e)=>{
                            if(this.state.data.length === 0){
                                return (
                                    <Redirect to="/add"/>
                                )
                            }
                            return <Home
                                pathName={e.location.pathname}
                                data={this.state.data}
                                isCheckAll={this.isCheckAll()}
                                checkAll={this.setCheckAll}
                                setCheck={this.setCheck}
                                setLike={this.setLike}
                                remove={this.remove}
                                removeSelect = {this.removeSelect}
                                likeSelect = {this.likeSelect}
                                cancelLikeSelect = {this.cancelLikeSelect}
                                showLikeList = {this.showLikeList}
                            />
                        }} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}


ReactDOM.render(<APP />, document.getElementById('root'));
