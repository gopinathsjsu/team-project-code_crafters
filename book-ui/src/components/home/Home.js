import React, { Component } from 'react'
import { Statistic, Icon, Grid, Container, Image, Segment, Dimmer, Loader } from 'semantic-ui-react'
import { bookApi } from '../misc/BookApi'
import { handleLogError } from '../misc/Helpers'
import LineChart from '.././admin/linechart';
import AuthContext from "../context/AuthContext";
import LinechartHours from "../admin/linechartHours";
import ExpireMembershipTable from "../admin/ExpireMembershipTable";
import LineChartForClassesAndEnrollment from "../admin/linechartforclassesandenrollment";
class Home extends Component {
  static contextType = AuthContext
  state = {
    numberOfUsers: 0,
    numberOfBooks: 0,
    isLoading: false,
    isAdmin:false,
    users:[],
    isUsersLoading:false,
    startDateForClasses:'',
    endDateForClasses:''
  }

  async componentDidMount() {
    this.setState({ isLoading: true })
    const Auth = this.context || { getUser: () => null };
    const user = Auth ? Auth.getUser() : null
    const isAdmin = user && user.role === 'ADMIN';
    this.setState({ isAdmin })
    try {
      let response = await bookApi.numberOfUsers()
      const numberOfUsers = response.data

      response = await bookApi.numberOfBooks()
      const numberOfBooks = response.data

      this.setState({ numberOfUsers, numberOfBooks })
    } catch (error) {
      handleLogError(error)
    } finally {
      this.setState({ isLoading: false })
    }

    this.handleGetUsersByExpiryNextWeek()
  }
  handleGetUsersByExpiryNextWeek = () => {
    const Auth = this.context
    const user = Auth.getUser()

    this.setState({ isUsersLoading: true })
    bookApi.getUsersByExpiryByWeek(user)
        .then(response => {
          this.setState({ users: response.data })
        })
        .catch(error => {
          handleLogError(error)
        })
        .finally(() => {
          this.setState({ isUsersLoading: false })
        })
  }
  render() {
    const { isLoading } = this.state
    const { isAdmin } = this.state
    if (isLoading) {
      return (
          <Segment basic style={{ marginTop: window.innerHeight / 2 }}>
            <Dimmer active inverted>
              <Loader inverted size='huge'>Loading</Loader>
            </Dimmer>
          </Segment>
      )
    } else {
      const { numberOfUsers, numberOfBooks,users } = this.state
      return (
          <Container text>
            <Grid stackable columns={2}>
              <Grid.Row>
                <Grid.Column textAlign='center'>
                  <Segment color='blue'>
                    <Statistic>
                      <Statistic.Value><Icon name='user' color='grey' />{numberOfUsers}</Statistic.Value>
                      <Statistic.Label>Users</Statistic.Label>
                    </Statistic>
                  </Segment>
                </Grid.Column>
                <Grid.Column textAlign='center'>
                  <Segment color='blue'>
                    <Statistic>
                      <Statistic.Value><Icon name='book' color='grey' />{numberOfBooks}</Statistic.Value>
                      <Statistic.Label>Books</Statistic.Label>
                    </Statistic>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>


            <div>
              {isAdmin && <LineChartForClassesAndEnrollment />}
              {isAdmin && <LineChart />}
              {isAdmin && <LinechartHours />}
              {isAdmin && <ExpireMembershipTable
                  users={users}
              />}
            </div>
          </Container>
      )
    }


  }
}

export default Home