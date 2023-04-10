import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { Button, Form, Grid, Segment, Message ,Dropdown } from 'semantic-ui-react'
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
    isError: false,
    errorMessage: '',
    memberships: [], // to store the list of memberships fetched from the API
    selectedMembership: '', // to store the selected membership by the user
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
  }

  handleInputChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }


  handleMembershipSelect = (event, { value }) => {
    this.setState({ selectedMembership: value });
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { username, password, name, email,selectedMembership } = this.state
    if (!(username && password && name && email && selectedMembership) ) {
      this.setState({
        isError: true,
        errorMessage: 'Please, inform all fields!'
      })
      return
    }
    const Auth = this.context
    const admin = Auth.getUser()
    console.log(admin)
    const user = { username, password, name, email ,membershipId:selectedMembership,locationId:admin.id }
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
    const { isLoggedIn, isError, errorMessage ,memberships,selectedMembership} = this.state
    // create an array of options for the dropdown menu using the fetched list of memberships
    const membershipOptions = memberships.map(membership => {
      return { key: membership.id, value: membership.id, text: membership.title + " " + membership.description};
    });
      return (
        <Grid textAlign='center'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment>
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
                <Dropdown
                    placeholder='Select Membership'
                    fluid
                    search
                    selection
                    options={membershipOptions}
                    value={selectedMembership}
                    onChange={this.handleMembershipSelect}
                />
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