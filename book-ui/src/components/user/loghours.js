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
class Loghours extends Component {
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
        locations:[],
        selectedMachine:''
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


    handleMachineSelect = (event, { value }) => {
        this.setState({ selectedMachine: value });
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
        const {selectedRole,selectedLocation,selectedMachine} = this.state

        const membershipOptions = memberships.map(membership => {
            return { key: membership.id, value: membership.id, text: membership.title + " " + membership.description};
        });
        const locationsForSelect = locations.map((instructor) => ({
            key: instructor.id,
            text: instructor.name,
            value: instructor.id,
        }))
        const machinesForSelect = [
            { key: '1', value: 'Treadmill', text: 'Treadmill' },
            { key: '2', value: 'Cycling', text: 'Cycling' },
            { key: '3', value: 'Stair machines', text: 'Stair machines' },
        ];
        console.log(locationsForSelect)
        return (
            <Grid textAlign='center'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Form size='large' onSubmit={this.handleSubmit}  >
                        <Segment>



                            <Dropdown
                                placeholder='Select Location'
                                fluid
                                search
                                selection
                                options={locationsForSelect}
                                value={selectedLocation}
                                onChange={this.handleLocationSelect}
                            />
                            <br/>
                            <Dropdown
                                placeholder='Select Machine'
                                fluid
                                search
                                selection
                                options={machinesForSelect}
                                value={selectedMachine}
                                onChange={this.handleMachineSelect}
                            />
                            <br/>
                            <Form.Input
                                fluid
                                name='minutes'
                                icon='at'
                                iconPosition='left'
                                placeholder='Total Minutes'
                                onChange={this.handleInputChange}
                            />
                            <Button color='blue' fluid size='large'>Save Data</Button>
                        </Segment>
                    </Form>

                    {isError && <Message negative>{errorMessage}</Message>}
                </Grid.Column>
            </Grid>
        )
    }
}
// }

export default Loghours