import React, { Component } from 'react'
import { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom'
import { Button, Form, Grid, Segment, Message ,Dropdown,Radio  } from 'semantic-ui-react'
import AuthContext from '../context/AuthContext'
import { bookApi } from '../misc/BookApi'
import { handleLogError } from '../misc/Helpers'
// import { toast } from 'react-toastify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {config} from "../../Constants";
class Signup extends Component {
  static contextType = AuthContext

  state = {
    username: '',
    password: '',
    name: '',
    email: '',
    isLoggedIn: false,
    selectedOption: 'user',
    isError: false,
    errorMessage: '',
    memberships: [], // to store the list of memberships fetched from the API
    selectedMembership: '', // to store the selected membership by the user,
    selectedRole: 'user',
    selectedLocation:'',
    setSelectedLocation:'',
    locations:[]
  }

  componentDidMount() {
    function basicAuth(user) {
      if (user) {
        return `Basic ${user.authdata}`;
      }
      return null;
    }


    const Auth = this.context
    const isLoggedIn = Auth.userIsAuthenticated()
    this.setState({ isLoggedIn })
    const user = Auth.getUser()
    const instance = axios.create({
      baseURL: config.url.API_BASE_URL
    })
    instance.get('/api/membership',{
      headers: { 'Authorization': basicAuth(user) }
    })
        .then(response => {
          // update the state with the fetched memberships
          this.setState({ memberships: response.data });
        })
        .catch(error => {
          console.log(error);
        });

    bookApi.getLocations(user)
        .then(response => {
          this.setState({ locations: response.data })
        })
        .catch(error => {
          handleLogError(error)
        })
  }

  handleInputChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }


  handleMembershipSelect = (event, { value }) => {
    this.setState({ selectedMembership: value });
  }
  handleLocationSelect = (event, { value }) => {
    this.setState({ selectedLocation: value });
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { username, password, name, email,selectedMembership, selectedRole,selectedLocation} = this.state
    if (!(username && password && name && email && (selectedMembership || selectedLocation) )) {
      this.setState({
        isError: true,
        errorMessage: 'Please, inform all fields!'
      })
      return
    }
    const Auth = this.context
    const admin = Auth.getUser()

    const user = { username, password, name, email ,membershipId:selectedMembership,locationId:admin.id,locationIdForAdmin:selectedLocation }
    bookApi.signup(user)
      .then(response => {
        this.setState({
            username: '',
            password: '',
            name: '',
            email: '',
            isError: false,
            errorMessage: ''

          });
          toast.success('User created successfully!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000 // 10 seconds
          });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
          
       })
      .catch(error => {
        handleLogError(error)
        if (error.response && error.response.data) {
          const errorData = error.response.data
          let errorMessage = 'Invalid fields'
          if (errorData.status === 409) {
            errorMessage = errorData.message
          } else if (errorData.status === 400) {
            errorMessage = errorData.errors[0].defaultMessage
          }
          this.setState({
            isError: true,
            errorMessage
          })
        }
      })
  }

  render() {
    const { isLoggedIn, isError, errorMessage ,memberships,selectedMembership,locations} = this.state
    const {selectedRole,selectedLocation} = this.state

    const membershipOptions = memberships.map(membership => {
      return { key: membership.id, value: membership.id, text: membership.title + " " + membership.description};
    });
    const locationsForSelect = locations.map((instructor) => ({
      key: instructor.id,
      text: instructor.name,
      value: instructor.id,
    }))
      return (
        <Grid textAlign='center'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size='large' onSubmit={this.handleSubmit}  >
              <Segment>
                <Form.Group inline>
                  <label>Role</label>
                  <Form.Field
                      control={Radio}
                      label='User'
                      value='user'
                      checked={selectedRole === 'user'}
                      onChange={() => this.setState({ selectedRole: 'user' })}
                  />
                  <Form.Field
                      control={Radio}
                      label='Admin'
                      value='admin'
                      checked={selectedRole === 'admin'}
                      onChange={() => this.setState({ selectedRole: 'admin' })}
                  />
                </Form.Group>
                <Form.Input
                  fluid
                  autoFocus
                  name='username'
                  icon='user'
                  iconPosition='left'
                  placeholder='Username'
                  onChange={this.handleInputChange}
                />
                <Form.Input
                  fluid
                  name='password'
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={this.handleInputChange}
                />
                <Form.Input
                  fluid
                  name='name'
                  icon='address card'
                  iconPosition='left'
                  placeholder='Name'
                  onChange={this.handleInputChange}
                />
                <Form.Input
                  fluid
                  name='email'
                  icon='at'
                  iconPosition='left'
                  placeholder='Email'
                  onChange={this.handleInputChange}
                />
                {selectedRole === 'user' && (
                    <>
                    <Dropdown
                    placeholder='Select Membership'
                    fluid
                    search
                    selection
                    options={membershipOptions}
                    value={selectedMembership}
                    onChange={this.handleMembershipSelect}
                /></>
                    )}
                {selectedRole === 'admin' && (
                    <>
                      <Dropdown
                          placeholder='Select Location'
                          fluid
                          search
                          selection
                          options={locationsForSelect}
                          value={selectedLocation}
                          onChange={this.handleLocationSelect}
                      /></>
                )}
                <br/>
                <Button color='blue' fluid size='large'>Register</Button>
              </Segment>
            </Form>
            
            {isError && <Message negative>{errorMessage}</Message>}
          </Grid.Column>
        </Grid>
      )
    }
  }
// }

export default Signup