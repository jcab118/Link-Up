import React, { Component } from 'react';

var Link = require("react-router-dom").Link;

import Sign_out from './Sign_out'

export default class ImageUpload extends Component {
    constructor(...args){
        super(...args)
        this.state = {
            file: '',
            imageUrl: '',
            savedImage: '',
            images: [],
            loggedInUser: undefined,
            counter: 0,
            countDone: false
        }
    }
    handleImageChange(e){
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imageUrl: reader.result
            })
        }
        reader.readAsDataURL(file)
    }
    onSaveImage(e){
        e.preventDefault();

        var creds = {};
        creds.image_src = this.state.imageUrl;
        creds.user_id = this.state.loggedInUser.user.id;
        console.log(creds)
        fetch('/api/image', {
            method: 'post',
            body: JSON.stringify(creds),
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
        }).then((response) => response.json())
        .then((results) => {
            this.setState({
                imageUrl: '',
                images: results
            })
        });
        
    }
    componentWillMount(){
        fetch('/api/images', {
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((results) => {
            this.setState({
                images: results
            })
        });

        fetch('/api/signed-in', {
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            credentials: 'same-origin'
        })
        .then((response) => response.json())
        .then((results) => {
            this.setState({
                loggedInUser: results
            })
        });
            var ci = setInterval(() => {
                if(this.state.counter < 3){
                    this.setState({
                        counter: this.state.counter + 1
                    })
                } else {
                    this.setState({
                        countDone: true
                    })
                    clearInterval(ci);
                }
            }, 1000)
    }
    render() {
        console.log(this.state);
        let ifUserHasImage;
        let imageId;
        if(this.state.images.length > 0 && this.state.loggedInUser){
            ifUserHasImage = this.state.images.map((image) => image.UserId).indexOf(this.state.loggedInUser.user.id) > -1;
            if(ifUserHasImage){
                imageId = this.state.images.filter((image) => image.UserId === this.state.loggedInUser.user.id)
            }
        }
        return (
            <div>
               <nav className = "text-center" id="navbar navbar-light bg-faded">
                    <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Profile">Profile</Link>
                    <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Link_up">Link-Up</Link>
                    <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Friends">Friends</Link>
                    <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Notifications">Notifications</Link>
                    <Sign_out style={{color:'blue', padding: '10px', textDecoration: 'none'}}/>
                    <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Settings">Settings</Link>
                </nav>
                <div className = "text-center" id= "profile info">
                    <h3>{this.state.loggedInUser ? this.state.loggedInUser.user.name + "'s Profile" : 'Pending'}</h3>
                </div>
                {
                    this.state.counter < 3 ?
                        <div>
                            <img src="./images/lg.fidget-spinner.gif" style={{height: '200px', width: 'auto'}}/>
                        </div> :
                        <div>
                            <div style={{display: 'inline-flex'}}>
                                {
                                    ifUserHasImage && imageId ?
                                        <img src={imageId[0].img_src} style={{height: '150px', width: 'auto'}}/> :
                                        <img src="./images/linkBackground.jpg"/>
                                }
                            </div>
                            <div id="accountForm">
                                <form onSubmit={this.onSaveImage.bind(this)}>
                                    <div id="submitButton">
                                        {
                                            ifUserHasImage ?
                                                <div></div> :
                                                <div>
                                                    <input 
                                                        className="fileInput" 
                                                        type="file"
                                                        onChange={this.handleImageChange.bind(this)}
                                                    />
                                                    <img src={this.state.imageUrl} style={{width: 300, height: 300}}/>
                                                    <input className="btn btn-default" type="submit" />
                                                </div>
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                }
                <div id="submitButton">
                    <h3>Bio</h3>
                    <h5>I'm the adventourus/sports type. I love sports and trying new things. 
                    Love watching and playing sports. I have the type of friends that usually 
                    agree to do things but then back out times certain times, and I'm left with 
                    the desire to do what we orginally had planned. So im here when so when I have 
                    plans and my friends flake I'll still have someone to do those activities with.</h5>
                </div>
                <footer className="text-center" id= "footer">
                    <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Profile">Profile</Link>
                    <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Link_up">Link-Up</Link>
                    <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Friends">Friends</Link>
                    <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Notifications">Notifications</Link>
                    <Sign_out style={{color:'red', padding: '10px', textDecoration: 'none'}}/>
                    <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Settings">Settings</Link>
                    <h6 className="text-center" id="copyrite-tag">&copy; 2018 J. Cabrera</h6>
                </footer> 
            </div>

        );
    }
}



