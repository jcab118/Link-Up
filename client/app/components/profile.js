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
            images: []
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
        var profileImage = this.state.imageUrl;
        creds.image_src = profileImage

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
    }
    render() {
        console.log(this.state.images)
        const appendImages = () => {
            if(this.state.images.length > 0){
                return this.state.images.map((image, index) => {
                    return (
                        <div 
                            style={{padding: '10px'}}
                            key={index}
                        >
                            <img 
                                src={image.image_src} 
                                style={{height: '10px', width: 'auto'}}
                            />
                        </div>
                    )
                })
            }
        }
        return (
            <div>
               <nav className = "text-center" id="navbar navbar-light bg-faded">
                    <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Profile">Profile</Link>
                    <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Link_up">Link-Up</Link>
                    <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Friends">Friends</Link>
                    <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Notifications">Notifications</Link>
                    <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Sign_out">Sign Out</Link>
                    <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Settings">Settings</Link>
                </nav>
                <div className = "text-center" id= "profile info">
                <h3>"" Profile</h3>
                </div>
                  <div style={{display: 'inline-flex'}}>
                    {/*appendImages()*/}
                    <img src="./images/linkBackground.jpg"/>
                </div>
                <div id="accountForm">
                    <form onSubmit={this.onSaveImage.bind(this)}>
                        <div id="submitButton">
                            <input 
                                className="fileInput" 
                                type="file"
                                onChange={this.handleImageChange.bind(this)}
                            />
                            <div> 
                                <img src={this.state.imageUrl} style={{width: 300, height: 300}}/>
                            </div>
                            <div id="submitButton">
                                <input className="btn btn-default" type="submit" />
                                <h3>Bio</h3>
                                <h5>I'm the adventourus/sports type. I love sports and trying new things. 
                                Love watching and playing sports. I have the type of friends that usually 
                                agree to do things but then back out times certain times, and I'm left with 
                                the desire to do what we orginally had planned. So im here when so when I have 
                                plans and my friends flake I'll still have someone to do those activities with.</h5>
                            </div>
                        </div>
                    </form>
                </div>
                    <footer className="text-center" id= "footer">
                        <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Profile">Profile</Link>
                        <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Link_up">Link-Up</Link>
                        <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Friends">Friends</Link>
                        <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Notifications">Notifications</Link>
                        <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Sign_out">Sign Out</Link>
                        <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Settings">Settings</Link>
                        <h6 className="text-center" id="copyrite-tag">&copy; 2018 J. Cabrera</h6>
                    </footer>
                <Sign_out/>  
            </div>

        );
    }
}
