import React, { Component } from 'react';
import { Row } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from "../Card/Card";
import CustomButton from "../Button/Button";
import './Cards.css';
import Spinner from '../Spinner/Spinner';
import CustomInput from "../Input/Input";
import Frame2 from "../Frame2/Frame2";
import RadioButton from "../RadioButton/RadioButton";
import UploadFile from "../UploadFile/UploadFile";
import axios from 'axios';
import { ReactComponent as Image } from "../../img/success-image.svg";

export default class Cards extends Component{
    constructor(props){
        super(props);
        this.state={
            error: null,
            isLoading: false,
            users:[],
            items:[],
            submitDisabled: true,
            name: '',
            nameValid: false,
            nameError:false,
            email: '',
            emailValid: false,
            emailError: false,
            phone: '+380',
            phoneValid: false,
            phoneError: false,
            position: '',
            photo: null,
            photoError: false,
            isRegistered: false,
            token: '',
            alreadyRegistered: false,
            ShowMoreDisabled: false,
        }
    }
    ShowMore = () =>{
        this.setState({isLoading: true});
        fetch("https://frontend-test-assignment-api.abz.agency/api/v1/users?count=6&sort:registration_timestamp")
        .then(res=> res.json())
        .then(
            (result) =>{
                this.setState({
                    isLoading: false,
                    users: result.users
                });
            },
            
            (error) => {
                this.setState({
                    isLoading: false,
                    error
                });
            }
        )
        this.setState({
            ShowMoreDisabled: true,
        })
    }

    Submit = async (event)=>{
        event.preventDefault();
        const {name, email, phone, photo, position} = this.state;
        if(name.length< 2 || name.length >60){
            await this.setState({nameError: true});
            
        }else{
            await this.setState({nameError: false});
        }

        if(email.length< 2 || email.length >60 || !email.match(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/)){
            await this.setState({emailError: true});
            
        }else{
            await this.setState({emailError: false});
        }

        if(!phone.match(/^[+]{0,1}380([0-9]{9})$/)){
            await this.setState({phoneError: true});
            
        }else{
            await  this.setState({phoneError: false});
        }

        if(photo.size/1024 > 5120 || photo.type !== "image/jpeg"){
            await  this.setState({photoError: true})
        }else{
            await  this.setState({photoError: false})
            
        }
        if(!this.state.nameError && !this.state.emailError && !this.state.phoneError && !this.state.photoError){
            const data = new FormData();
            data.append("name", name);
            data.append("email", email);
            data.append("phone", phone);
            data.append("position_id", position);
            data.append("photo", photo);
            
            const url = "https://frontend-test-assignment-api.abz.agency/api/v1/users";

            const config = {
                headers:{
                    "content-type": "multipart/form-data"
                },
            }
                    
            axios.defaults.headers.common={
                "Token": `${this.state.token}`,
            }

            axios.post(url, data, config)
                .then(response => {
                    console.log(response);
                    this.ShowMore();
                    this.setState({
                        alreadyRegistered: false,
                        isRegistered: true,
                    })
                    
                    
                })
                .catch(error => {
                    if(error.response.status === 409){
                        this.setState({alreadyRegistered: true})
                    }else if(error.response.status === 422){
                        this.setState({photoError: true})
                    }
                    console.log(error.response.status);
                });

                
        }
    }

    handleChangeText = (e)=> {
        let nameValid = e.target.value ? true : false;
        let submitValid =  nameValid && this.state.emailValid && this.state.phoneValid;
        this.setState({
          name: e.target.value,
          nameValid: nameValid, 
          submitDisabled: !submitValid
        })
      }

      handleChangeEmail = (e)=> {
        let emailValid = e.target.value ? true : false;
        let submitValid = emailValid && this.state.nameValid && this.state.phoneValid;
        this.setState({
          email: e.target.value,
          emailValid: emailValid, 
          submitDisabled: !submitValid
        })
      }
      handleChangePhone = (e)=> {
        let phoneValid = e.target.value ? true : false;
        let submitValid =  phoneValid && this.state.emailValid && this.state.nameValid;
        this.setState({
          phone: e.target.value,
          phoneValid: phoneValid, 
          submitDisabled: !submitValid
        })
      }
      handleRadioButton=(e)=>{
        this.setState({
            position: e.target.value
        });
      }
      handleUpload=(e)=>{
        this.setState({
            photoPreview: URL.createObjectURL(e.target.files[0]),
            photo: e.target.files[0]
        });
      }

      componentDidMount(){
        fetch("https://frontend-test-assignment-api.abz.agency/api/v1/positions")
        .then(res => res.json())
        .then(
            (result) =>{
                this.setState({
                    isLoaded: true,
                    items: result.positions
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )

        fetch("https://frontend-test-assignment-api.abz.agency/api/v1/token")
        .then(res => res.json())
        .then(
            (result) =>{
                this.setState({
                    token: result.token
                });
            }
        )
    }

    
    render(){
        const {users, isLoading, items, nameError, emailError, phoneError, photo, photoError, isRegistered, alreadyRegistered} = this.state;
            return(
                <Container fluid="true" className="CardsBg">
                    <Container fluid="true" className="Cards">
                        <h1 className="H1">Working with <br/>GET request</h1>
                        {isLoading ? <Spinner/>: null}
                        
                        <Row xl={3} md={2} xm={1} sm={1} xs={1}>
                            {users.map(user =>
                                <Col key={user.id}>
                                    <Card 
                                    ImgUrl={user.photo}
                                    Name={user.name}
                                    Position={user.position}
                                    Mail={user.email}
                                    Phone={user.phone}
                                    />
                                </Col>
                                )}
                        </Row>
                        <CustomButton text="Show more" function={this.ShowMore} isDisabled={this.state.ShowMoreDisabled}/>
                    </Container>
                    <Container fluid="true" className="Request">
                        {isRegistered ?
                        <div>
                            <h1 className="H1">User successfully registered</h1>
                            <Image className="img"/>
                        </div>
                            :
                        <div>
                            <h1 className="H1">Working with <br/>POST request</h1>
                            <form className="Form" onSubmit={this.Submit}>
                                <CustomInput name="name"
                                    type="text" 
                                    text="Your name" 
                                    onChange={this.handleChangeText} 
                                    value={this.state.name}
                                    className={nameError? "Input Error": "Input"}
                                    FloatingLabel={nameError? "FloatingLabel LabelError": "FloatingLabel"}
                                />
                                {nameError ? (<label className="ErrorMsg">Invalid name</label>):null}
                                <Frame2/>
                                <CustomInput name="email"
                                    type="text"
                                    text="Email"
                                    onChange={this.handleChangeEmail} 
                                    value={this.state.email}
                                    className={emailError? "Input Error": "Input"}
                                    FloatingLabel={emailError   ? "FloatingLabel LabelError": "FloatingLabel"}
                                    /> 
                                    {emailError ? (<label className="ErrorMsg">Invalid email</label>):null}
                                    <Frame2/>
                                    <CustomInput name="phone"
                                    type="text"
                                    text="Phone"
                                    onChange={this.handleChangePhone} 
                                    value={this.state.phone}
                                    className={phoneError? "Input Error": "Input"}
                                    FloatingLabel={phoneError? "FloatingLabel LabelError": "FloatingLabel"}
                                    />
                                    {phoneError ? (<label className="ErrorMsg">Invalid phone</label>):null}
                                    <p className="PosSelector">Select your position</p>
                                    <div className="RadioButtons">
                                        {items.map(item =>
                                            <RadioButton key={item.id} text={item.name} value={item.id} onChange={this.handleRadioButton}/>
                                            )}
                                    </div>
                                    <UploadFile className={photoError? "FileUploadWrapper Error" :"FileUploadWrapper"} onChange={this.handleUpload} text={photo ? photo.name : "Upload your photo"} />
                                    {photoError ? (<label className="ErrorPhoto">Invalid photo</label>):null}
                                    {alreadyRegistered? <div>
                                        <label className="ErrorMsg">User with this phone or email already exist</label>
                                    </div>: null}
                                    <Frame2/>
                                    <CustomButton  type="submit" text="Sign up" isDisabled={this.state.submitDisabled}  />
                                    <Frame2/>
                                </form>
                        </div>
                        }
                    </Container>
                </Container>
            )
        }
}