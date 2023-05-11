import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import BookList from './BookList'
import AuthContext from '../context/AuthContext'
import { bookApi } from '../misc/BookApi'
import { handleLogError } from '../misc/Helpers'
import UserTab from './UserTab'
import loghours from "./loghours";



class UserPage extends Component {
  static contextType = AuthContext

  state = {
    users: [],
    books: [],
    bookIsbn: '',
    bookTitle: '',
    bookTextSearch: '',
    memberships: [],
    membershipId: '',
    membershipTitle: '',
    membershipDescription: '',
    membershipTextSearch: '',
    userUsernameSearch: '',
    isAdmin: true,
    isUsersLoading: false,
    isBooksLoading: false,
    isMembershipsLoading: false,
    userId: '',
    clockInData:'',
    isForMember: true,
    month:0,
    classes: [],
    classesTitle: '',
    classesDescription:'',
    isClassForMember:true,
    isClassLoading:false,
    registeredClasses: [],
    registeredClassesTitle: '',
    registeredClassesDescription: '',
    printRegisteredClasses: [],


    instructorAge: null,
    instructorDescription:'',
    instructors:[],
    instructorEmail:'',
    instructorName:'',
    isInstructorsLoading:false,
    instructorIdForClassCreate:2,
    current_user:'',
    user_id: '',
    logHours: [],

  }

  componentDidMount() {
    const Auth = this.context
    const user = Auth.getUser()
    const isAdmin = (user.role === 'ADMIN')
    const isUser = (user.role === 'USER' || user.role === 'NONMember')
      const user_Id = user.id
      const user_role = user.role
    var userName = "Nilay";
    if (isAdmin || isUser) {

      userName = user.name;
    }
    this.setState({userName})
    this.setState({ isUser })
    this.setState({ user_Id } )
    this.setState( { user_role })
    this.handleGetBooks()
    this.handleGetClasses()
    this.handleGetRegisteredClasses()
    this.handleGetInstructors()
    this.handleGetLogHours()

  }

  handleGetClasses = () => {
    const Auth = this.context
    const user = Auth.getUser()

    this.setState({ isClassLoading: true })
    bookApi.getClasses(user)
        .then(response => {
          this.setState({ classes: response.data })
        })
        .catch(error => {
          handleLogError(error)
        })
        .finally(() => {
          this.setState({ isClassLoading: false })
        })
  }

  handleAddClasses = () => {
    const Auth = this.context
    const user = Auth.getUser()

    let { classesTitle, classesDescription,isClassForMember ,instructorIdForClassCreate} = this.state
    classesTitle = classesTitle.trim()
    classesDescription = classesDescription.trim()
    if (!(classesTitle && classesDescription)) {
      return
    }
    const isForMember = isClassForMember ? 1 : 0;
    const clas = { title: classesTitle, description: classesDescription,isForMember,instructorId:instructorIdForClassCreate }
    bookApi.addClasses(user, clas)
        .then(() => {
          this.setState({classesTitle:'',classesDescription:''})
          this.handleGetClasses()
        })
        .catch(error => {
          handleLogError(error)
        })
  }
  handleInputChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleGetBooks = () => {
    const Auth = this.context
    const user = Auth.getUser()

    this.setState({ isBooksLoading: true })
    bookApi.getBooks(user)
      .then(response => {
        this.setState({ books: response.data })
      })
      .catch(error => {
        handleLogError(error)
      })
      .finally(() => {
        this.setState({ isBooksLoading: false })
      })
  }

  handleGetInstructors = () => {
    const Auth = this.context
    const user = Auth.getUser()

    this.setState({ isInstructorsLoading: true })
    bookApi.getInstructors(user)
        .then(response => {
          this.setState({ instructors: response.data })
        })
        .catch(error => {
          handleLogError(error)
        })
        .finally(() => {
          this.setState({ isInstructorsLoading: false })
        })
  }


  handleSearchBook = () => {
    const Auth = this.context
    const user = Auth.getUser()

    const text = this.state.bookTextSearch
    bookApi.getBooks(user, text)
      .then(response => {
        const books = response.data
        this.setState({ books })
      })
      .catch(error => {
        handleLogError(error)
        this.setState({ books: [] })
      })
  }


  handleGetRegisteredClasses = (id) => {
    const Auth = this.context
    const user = Auth.getUser()

    this.setState({ isBooksLoading: true })
    bookApi.getRegisteredClasses(user,id)
        .then(response => {
          this.setState({ printRegisteredClasses : response.data })
          console.log(response)
        })
        .catch(error => {
          handleLogError(error)
        })
        .finally(() => {
          this.setState({ isRegisteredClassesLoading: false })
        })
  }





  handleAddRegisteredClasses = (membership) => {
    const Auth = this.context;
    const user = Auth.getUser();
    const idd = user.id;

    const registeredclasses = { classes_id: membership.id, user_id: idd, title: membership.title, description: membership.description, isMember :membership.isForMember, locationId : membership.locationId, startDate: membership.startDate, endDate: membership.endDate };

    bookApi.addRegisteredClasses(user, registeredclasses)
        .then(() => {
          this.handleGetRegisteredClasses();
        })
        .catch((error) => {
          handleLogError(error);
        });
  };

  handleGetLogHours = (user) => {
    const Auth = this.context
    const user_name = Auth.getUser()

    this.setState({ isBooksLoading: true })
    bookApi.getLogHours(user_name)
        .then(response => {
            response.data.treadmil = response.data.treadmil.reverse()
            response.data.stair = response.data.stair.reverse()
            response.data.cycling = response.data.cycling.reverse()
          this.setState({ logHours : response.data })
        })

        .catch(error => {
          handleLogError(error)
        })
        .finally(() => {
          this.setState({ isBooksLoading: false })
        })
  }




  render() {

      const { isUsersLoading, users, userUsernameSearch, isBooksLoading, books, bookIsbn, bookTitle, bookTextSearch, memberships,membershipTitle,membershipDescription,userId,clockInData,month,isForMember,printRegisteredClassesId, printregisteredClassesTitle, printregisteredClassesDescription,printRegisteredClasses,user_Id, user_role,userName,  } = this.state
      const {isClassForMember,classesTitle,classesDescription,classes,handleDeleteMembership,handleAddClasses, logHours} = this.state
      const {instructorAge,instructorDescription,instructors,instructorEmail,instructorName,isInstructorsLoading,instructorIdForClassCreate} = this.state

      return (
          <Container >
            <UserTab
                isUsersLoading={isUsersLoading}
                users={users}
                userUsernameSearch={userUsernameSearch}
                handleDeleteUser={this.handleDeleteUser}
                handleSearchUser={this.handleSearchUser}
                isBooksLoading={isBooksLoading}
                books={books}
                memberships={memberships}
                membershipTitle={membershipTitle}
                membershipDescription={membershipDescription}
                handleAddMembership={this.handleAddMembership}
                bookIsbn={bookIsbn}
                bookTitle={bookTitle}
                bookTextSearch={bookTextSearch}
                handleAddBook={this.handleAddBook}
                handleDeleteBook={this.handleDeleteBook}
                handleSearchBook={this.handleSearchBook}
                handleInputChange={this.handleInputChange}
                handleClockInOut={this.handleClockInOut}
                clockInData={clockInData}
                updateMeetState={this.updateMeetState}
                month={month}
                isForMember={isForMember}
                isClassForMember={isClassForMember}
                classes={classes}
                classesTitle={classesTitle}
                classesDescription={classesDescription}
                handleAddClasses ={this.handleAddClasses}
                handleDeleteClasses={this.handleDeleteClasses}
                handleAddRegisteredClasses={this.handleAddRegisteredClasses}
                handleGetInstructors={this.handleGetInstructors}
                instructorAge={instructorAge}
                handleDeleteInstructor={this.handleDeleteInstructor}
                instructorDescription={instructorDescription}
                instructors={instructors}
                instructorEmail={instructorEmail}
                instructorName={instructorName}
                handleAddInstructor={this.handleAddInstructor}
                isInstructorsLoading={isInstructorsLoading}
                instructorIdForClassCreate={instructorIdForClassCreate}
                printRegisteredClassesId ={printRegisteredClassesId}
                printregisteredClassesTitle={printregisteredClassesTitle}
                printregisteredClassesDescription={printregisteredClassesDescription}
                handleGetRegisteredClasses={this.handleGetRegisteredClasses}
                printRegisteredClasses={printRegisteredClasses}
                user_Id ={user_Id}
                user_role ={user_role}
                userName = {userName}
                logHours = {logHours}



            />
          </Container>
      )
    }

}

export default UserPage