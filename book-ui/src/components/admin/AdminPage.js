import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import AuthContext from '../context/AuthContext'
import { bookApi } from '../misc/BookApi'
import AdminTab from './AdminTab'
import { handleLogError } from '../misc/Helpers'

class AdminPage extends Component {
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
    isClassLoading:false
  }

  componentDidMount() {
    const Auth = this.context
    const user = Auth.getUser()
    const isAdmin = user.role === 'ADMIN'
    this.setState({ isAdmin })

    this.handleGetUsers()
    this.handleGetBooks()
    this.handleGetMemberships()
    this.handleGetClockInData()
    this.handleGetClasses()
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
  handleInputChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleGetUsers = () => {
    const Auth = this.context
    const user = Auth.getUser()

    this.setState({ isUsersLoading: true })
    bookApi.getUsers(user)
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

  handleDeleteUser = (username) => {
    const Auth = this.context
    const user = Auth.getUser()

    bookApi.deleteUser(user, username)
      .then(() => {
        this.handleGetUsers()
      })
      .catch(error => {
        handleLogError(error)
      })
  }

  handleSearchUser = () => {
    const Auth = this.context
    const user = Auth.getUser()

    const username = this.state.userUsernameSearch
    bookApi.getUsers(user, username)
      .then(response => {
        const data = response.data
        const users = data instanceof Array ? data : [data]
        this.setState({ users })
      })
      .catch(error => {
        handleLogError(error)
        this.setState({ users: [] })
      })
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

  handleGetMemberships = () => {
    const Auth = this.context
    const user = Auth.getUser()

    this.setState({ isBooksLoading: true })
    bookApi.getMemberships(user)
        .then(response => {
          this.setState({ memberships: response.data })
        })
        .catch(error => {
          handleLogError(error)
        })
        .finally(() => {
          this.setState({ isMembershipsLoading: false })
        })
  }
  handleGetClockInData = () => {
    const Auth = this.context
    const user = Auth.getUser()

    this.setState({ isGetClockInDataLoading: true })
    bookApi.getTodaysClockInOutData(user)
        .then(response => {
          this.setState({ clockInData: response.data })
        })
        .catch(error => {
          handleLogError(error)
        })
        .finally(() => {
          this.setState({ isGetClockInDataLoading: false })
        })
  }
  handleDeleteBook = (isbn) => {
    const Auth = this.context
    const user = Auth.getUser()

    bookApi.deleteBook(user, isbn)
      .then(() => {
        this.handleGetBooks()
      })
      .catch(error => {
        handleLogError(error)
      })
  }
  handleDeleteClasses = (id) => {
    const Auth = this.context
    const user = Auth.getUser()

    bookApi.deleteClasses(user, id)
        .then(() => {
          this.handleGetClasses()
        })
        .catch(error => {
          handleLogError(error)
        })
  }

  handleDeleteMembership = (id) => {
    const Auth = this.context
    const user = Auth.getUser()

    bookApi.deleteMembership(user, id)
        .then(() => {
          this.handleGetMemberships()
        })
        .catch(error => {
          handleLogError(error)
        })
  }

  handleAddBook = () => {
    const Auth = this.context
    const user = Auth.getUser()

    let { bookIsbn, bookTitle } = this.state
    bookIsbn = bookIsbn.trim()
    bookTitle = bookTitle.trim()
    if (!(bookIsbn && bookTitle)) {
      return
    }

    const book = { isbn: bookIsbn, title: bookTitle }
    bookApi.addBook(user, book)
      .then(() => {
        this.clearBookForm()
        this.handleGetBooks()
      })
      .catch(error => {
        handleLogError(error)
      })
  }
  handleAddMembership = () => {
    const Auth = this.context
    const user = Auth.getUser()

    let { membershipTitle, membershipDescription,month,isForMember } = this.state
    membershipTitle = membershipTitle.trim()
    membershipDescription = membershipDescription.trim()
    if (!(membershipTitle && membershipDescription)) {
      return
    }
    const isMember = isForMember ? 1 : 0;
    const membership = { title: membershipTitle, description: membershipDescription,month: month,isMember }
    bookApi.addMembership(user, membership)
        .then(() => {
          // this.clearMembershipForm()
          this.handleGetMemberships()
        })
        .catch(error => {
          handleLogError(error)
        })
  }

  handleAddClasses = () => {
    const Auth = this.context
    const user = Auth.getUser()

    let { classesTitle, classesDescription,isClassForMember } = this.state
    classesTitle = classesTitle.trim()
    classesDescription = classesDescription.trim()
    if (!(classesTitle && classesDescription)) {
      return
    }
    const isForMember = isClassForMember ? 1 : 0;
    const clas = { title: classesTitle, description: classesDescription,isForMember }
    bookApi.addClasses(user, clas)
        .then(() => {
          this.setState({classesTitle:'',classesDescription:''})
          this.handleGetClasses()
        })
        .catch(error => {
          handleLogError(error)
        })
  }

  handleClockInOut = () => {
    const Auth = this.context
    const user = Auth.getUser()

    let { userId } = this.state
    userId = userId.trim()
    if (!(userId )) {
      return
    }

    const clockData = { userId: userId }
    bookApi.clockInOut(user, clockData)
        .then(() => {
          // this.clearMembershipForm()
          this.handleGetClockInData()
        })
        .catch(error => {
          handleLogError(error)
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

  clearBookForm = () => {
    this.setState({
      bookIsbn: '',
      bookTitle: ''
    })
  }
  updateMeetState = () => {

    this.handleGetClockInData()
  }
  render() {
    if (!this.state.isAdmin) {
      return <Redirect to='/' />
    } else {
      const { isUsersLoading, users, userUsernameSearch, isBooksLoading, books, bookIsbn, bookTitle, bookTextSearch, memberships,membershipTitle,membershipDescription,userId,clockInData,month,isForMember} = this.state
      const {isClassForMember,classesTitle,classesDescription,classes,handleDeleteMembership} = this.state
      return (
        <Container >
          <AdminTab
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
            handleDeleteMembership={this.handleDeleteMembership}
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
            handleAddClasses={this.handleAddClasses}
            handleDeleteClasses={this.handleDeleteClasses}
          />
        </Container>
      )
    }
  }
}

export default AdminPage