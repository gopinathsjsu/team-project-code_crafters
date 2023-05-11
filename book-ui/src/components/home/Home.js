import React, { Component } from 'react'

import { Statistic, Icon, Grid, Container, Image, Segment, Dimmer, Loader } from 'semantic-ui-react'
import { bookApi } from '../misc/BookApi'
import { handleLogError } from '../misc/Helpers'
import LineChart from '.././admin/linechart';
import AuthContext from "../context/AuthContext";
import LinechartHours from "../admin/linechartHours";
import ExpireMembershipTable from "../admin/ExpireMembershipTable";
import LineChartForClassesAndEnrollment from "../admin/linechartforclassesandenrollment";
import Activities from "../user/Activites";
import Gymdetail from "../user/gymdetail";

function getValueById(id) {
    if (id === 1) {
        return 'https://th.bing.com/th/id/R.22b22f5bfc39d45bf649bf83f804e01b?rik=lLILe3rkGN5d2w&riu=http%3a%2f%2ffitnesslabjax.com%2fwp-content%2fuploads%2f2018%2f03%2fYoga-studios-in-Rye.jpg&ehk=GzFcKCKzPSdEP%2bNsRAeZn92TGddjghXpfKi0JHCL0D0%3d&risl=&pid=ImgRaw&r=0';
    } else if (id === 2) {
        return 'https://www.mensjournal.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk2MTM3Mjk2NTQ5NTIwNTI5/_main_liftlift.jpg';
    }else if (id === 3) {
        return 'https://3.bp.blogspot.com/-dVG-MWN_c4M/VLgHLdIF_0I/AAAAAAAAWEM/9ehntNrS8B0/s1600/Header.jpg';
    }else if (id === 4) {
        return 'https://res.cloudinary.com/sagacity/image/upload/c_crop,h_3278,w_4911,x_0,y_0/c_limit,dpr_auto,f_auto,fl_lossy,q_80,w_1080/shutterstock_771868396_xrsa3s.jpg';
    } else if (id === 5) {
        return 'https://cdn.shopify.com/s/files/1/0047/4657/5970/files/guys-in-a-fitness-class.png?v=1566913094';
    }else if (id === 6) {
        return 'https://img.grouponcdn.com/iam/4z2cdbVyz6Sk1mHnQFo4/Nc-2048x1229/v1/c870x524.jpg';
    }else if (id === 7) {
        return 'https://img.grouponcdn.com/deal/vr5Wk98SP11GFurJKH7w/ie-2048x1229/v1/c870x524.jpg';
    }
    else {
        return 'https://img.grouponcdn.com/iam/36SDYDyMXecxb5Ek9crCGLPVuC9B/36-2048x1229/v1/c870x524.jpg';
    }
}

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
    endDateForClasses:'',
    location:'San Jose',
    setLocation:'',
      userName :'',
      classSchedule : [],
  }

  async componentDidMount() {
    this.setState({ isLoading: true })
    const Auth = this.context || { getUser: () => null };
    const user = Auth ? Auth.getUser() : null
    const isAdmin = user && user.role === 'ADMIN';
    const isUser = user && (user.role === 'USER' || user.role === 'NONMember') ;
    var userName = "Nilay";
    const NoLogin = user === null;
    if (isAdmin || isUser) {

         userName = user.name;
    }


    this.setState({ isAdmin })
    this.setState( { isUser })
      this.setState({ userName })


    this.setState({NoLogin})

      try {
          const scheduleResponse = await bookApi.getclassschedule();
          const classSchedule = scheduleResponse.data;
          this.setState({ classSchedule });
          console.log(classSchedule)
      } catch (error) {
          handleLogError(error)
      } finally {
          this.setState({ isLoading: false })
      }


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
  handleLocationChange = (event) => {

                    this.setState({location:event.target.value});
          }



  render() {

      const {isLoading} = this.state
      const {isAdmin} = this.state
      const {isUser} = this.state
      const {userName} = this.state
      const {classSchedule } = this.state
    const { NoLogin } = this.state
    const { location ,setLocation} = this.state
    const classes = [
          {
            id: 1,
            title: 'Lamaze',
            description: 'A class for expectant mothers to learn breathing and relaxation techniques for childbirth.',
            location: 'New York',
            image: 'https://th.bing.com/th/id/R.949787ac462d676565357e1ff4c70de9?rik=i5Ujzf4G%2fHT9bg&riu=http%3a%2f%2fmaternalhealthalliance.eu%2fimages%2fbanner.jpg&ehk=F%2fRBDko5VaTPl5%2borqeODctjwNlohd%2fzvmPkQkRHGv0%3d&risl=&pid=ImgRaw&r=0'
          },
          {
            id: 2,
            title: 'Yoga',
            description: 'A class for all levels to practice yoga and improve flexibility and strength.',
            location: 'New York',
            image: 'https://th.bing.com/th/id/R.22b22f5bfc39d45bf649bf83f804e01b?rik=lLILe3rkGN5d2w&riu=http%3a%2f%2ffitnesslabjax.com%2fwp-content%2fuploads%2f2018%2f03%2fYoga-studios-in-Rye.jpg&ehk=GzFcKCKzPSdEP%2bNsRAeZn92TGddjghXpfKi0JHCL0D0%3d&risl=&pid=ImgRaw&r=0'
          },
          {
            id: 3,
            title: 'Zumba',
            description: 'A high-energy class that combines dance and fitness for a fun workout.',
            location: 'New York',
            image: 'https://pilates1901.com/wp-content/uploads/2015/08/zumba.jpg'
          },
          {
              id: 4,
              title: 'Yoga',
              description: 'A class for all levels to practice yoga and improve flexibility and strength.',
              location: 'Miami',
              image: 'https://th.bing.com/th/id/R.22b22f5bfc39d45bf649bf83f804e01b?rik=lLILe3rkGN5d2w&riu=http%3a%2f%2ffitnesslabjax.com%2fwp-content%2fuploads%2f2018%2f03%2fYoga-studios-in-Rye.jpg&ehk=GzFcKCKzPSdEP%2bNsRAeZn92TGddjghXpfKi0JHCL0D0%3d&risl=&pid=ImgRaw&r=0'
          },
          {
              id: 5,
              title: 'Zumba',
              description: 'A high-energy class that combines dance and fitness for a fun workout.',
              location: 'Miami',
              image: 'https://pilates1901.com/wp-content/uploads/2015/08/zumba.jpg'
            },

            {
                        id: 1,
                        title: 'Lamaze',
                        description: 'A class for expectant mothers to learn breathing and relaxation techniques for childbirth.',
                        location: 'Los Angeles',
                        image: 'https://th.bing.com/th/id/R.949787ac462d676565357e1ff4c70de9?rik=i5Ujzf4G%2fHT9bg&riu=http%3a%2f%2fmaternalhealthalliance.eu%2fimages%2fbanner.jpg&ehk=F%2fRBDko5VaTPl5%2borqeODctjwNlohd%2fzvmPkQkRHGv0%3d&risl=&pid=ImgRaw&r=0'
                      },

        ];


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

              <div className="grid-container">
                  {isAdmin && <div className="grid-item top-left"><h3>Classes and Enrollment</h3><LineChartForClassesAndEnrollment /></div>}
                  {isAdmin && <div className="grid-item top-right"><h3>Visitors</h3><LineChart /></div>}
                  {isAdmin && <div className="grid-item bottom-right"><ExpireMembershipTable users={users} /></div>}
                  {isAdmin && <div className="grid-item bottom-left"><h3>Hours</h3><LinechartHours /></div>}



            </div>
              <div className="grid-container-user-home">
                  {isUser && <div className="grid-item-user-home"><Gymdetail userName={userName} /></div>}
              </div>

              { NoLogin &&
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h1 style={{ fontSize: '36px', margin: '0', color:"#3498db" }}>Avaliable Classes</h1>
                    <select style={{ fontSize: '18px', padding: '5px', backgroundColor: '', border: '2px solid #3498db', borderRadius: '5px' }} value={location} onChange={this.handleLocationChange}>
                      <option value="San Jose">San Jose</option>
                      <option value="Milpitas">Milpitas</option>
                      <option value="Sunnyvale">Sunnyvale</option>
                    </select>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gridGap: '20px' , maxWidth:'1000px' }}>
                    {classSchedule
                      .filter((classObj) =>  classObj.location === location)
                      .map((classObj) => (
                      <div key={classObj.id} style={{ backgroundColor: '#fff', border: '2px solid #3498db', borderRadius: '5px', padding: '10px' }}>
                      <img src={getValueById(classObj.id)} alt={classObj.name} style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }} />
                      <h2 style={{ fontSize: '24px', margin: '0', marginBottom: '10px' , color:"#3498db" }}>{classObj.name}</h2>
                      <p style={{ fontSize: '18px', margin: '0', marginBottom: '10px'}}>{classObj.description}</p>
                      <p style={{ fontSize: '18px', margin: '0' }}>Location: {classObj.location}</p>
                      </div>
                      ))}
                      </div>
                      </div>
        }
          </Container>

      )
    }


  }
}

export default Home