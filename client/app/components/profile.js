import React, { Component } from 'react';
import axios from 'axios';
var Link = require("react-router-dom").Link;


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
        }).then((response) => response.json())
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
                                style={{height: '150px', width: 'auto'}}
                            />
                        </div>
                    )
                })
            }
        }
        return (
            <div>
                <div className ="text-center" id="accountForm">
                    <form onSubmit={this.onSaveImage.bind(this)}>
                        <div id="submitButton">
                            <h4 className="uploadImageText">Upload Profile Image</h4>
                            <input 
                                className="fileInput" 
                                type="file"
                                onChange={this.handleImageChange.bind(this)}
                            />
                            <div> 
                                <img src={this.state.imageUrl} style={{width: 150, height: 150}}/>
                            </div>
                            <div id="submitButton">
                                <input className="btn btn-default" type="submit" />
                            </div>
                        </div>
                    </form>
                </div>
                <div style={{display: 'inline-flex'}}>
                    {appendImages()}
                </div>
                    <footer className="text-center" id= "footer">
                      <Link style={{color:'blue', padding: '5px', textDecoration: 'none'}} to="/Link_up">Link-Up</Link>
                      <Link style={{color:'blue', padding: '5px', textDecoration: 'none'}} to="/friends">Friends</Link>
                      <Link style={{color:'blue', padding: '5px', textDecoration: 'none'}} to="/notifcations">Notifications</Link>
                      <Link style={{color:'blue', padding: '5px', textDecoration: 'none'}} to="/sign_out">Sign Out</Link>
                      <h6 className="text-center" id="copyrite-tag">&copy; 2018 J. Cabrera</h6>
                 </footer>
            </div>

        );
    }
}
