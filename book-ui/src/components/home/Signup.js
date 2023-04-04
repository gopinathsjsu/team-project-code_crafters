import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react'
import AuthContext from '../context/AuthContext'
import { bookApi } from '../misc/BookApi'
import { handleLogError } from '../misc/Helpers'
// import { toast } from 'react-toastify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Signup extends Component {
  static contextType = AuthContext

  state = {
    username: '',
    password: '',
    name: '',
    email: '',
    isLoggedIn: false,
    isError: false,
    errorMessage: ''
  }

  componentDidMount() {
    const Auth = this.context
    const isLoggedIn = Auth.userIsAuthenticated()
    this.setState({ isLoggedIn })
  }

  handleInputChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { username, password, name, email } = this.state
    if (!(username && password && name && email)) {
      this.setState({
        isError: true,
        errorMessage: 'Please, inform all fields!'
      })
      return
    }

    const user = { username, password, name, email }
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
    const { isLoggedIn, isError, errorMessage } = this.state

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