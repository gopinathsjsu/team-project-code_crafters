import React from 'react'
import { Tab } from 'semantic-ui-react'
import UserTable from './UserTable'
import BookTable from './BookTable'
import Signup from '../home/Signup'
import MembershipTable from "./MembershipTable";
import ClockInOut from '../home/ClockInOut'
import ClockInTable from "./ClockInTable";
function AdminTab(props) {
  const { handleInputChange,updateMeetState } = props
  const { isUsersLoading, users, userUsernameSearch, handleDeleteUser, handleSearchUser } = props
  const { isBooksLoading, books, bookIsbn, bookTitle, bookTextSearch, handleAddBook, handleDeleteBook, handleSearchBook } = props
  const { isMembershipsLoading, memberships, membershipId, membershipTitle, membershipDescription, MembershipTextSearch, handleAddMembership, handleDeleteMembership, handleSearchMembership,clockInData,handleGetClockInData } = props

    const panes = [
    {
      menuItem: { key: 'users', icon: 'users', content: 'Users' },
      render: () => (
        <Tab.Pane loading={isUsersLoading}>
          <UserTable
            users={users}
            userUsernameSearch={userUsernameSearch}
            handleInputChange={handleInputChange}
            handleDeleteUser={handleDeleteUser}
            handleSearchUser={handleSearchUser}
          />
        </Tab.Pane>
      )
    },
    {
        menuItem: { key: 'clock', icon: 'users', content: 'Clock In/Out' },
        render: () => (
            <Tab.Pane>
                <ClockInOut updateMeetState={updateMeetState}/>


                <ClockInTable
                    clockInData={clockInData}
                    handleGetClockInData={handleGetClockInData}
                />
            </Tab.Pane>
            )
        },
    {
      menuItem: { key: 'users', icon: 'users', content: 'Enroll Members' },
      render: () => (
        <Tab.Pane>
            <Signup />
          </Tab.Pane>
      )
    },
    {
      menuItem: { key: 'books', icon: 'book', content: 'Books' },
      render: () => (
        <Tab.Pane loading={isBooksLoading}>
          <BookTable
            books={books}
            bookIsbn={bookIsbn}
            bookTitle={bookTitle}
            bookTextSearch={bookTextSearch}
            handleInputChange={handleInputChange}
            handleAddBook={handleAddBook}
            handleDeleteBook={handleDeleteBook}
            handleSearchBook={handleSearchBook}
          />
        </Tab.Pane>
      )
    },
      {
          menuItem: { key: 'memberships', icon: 'book', content: 'Memberships' },
          render: () => (
              <Tab.Pane loading={isMembershipsLoading}>
                  <MembershipTable
                      memberships={memberships}
                      membershipId={membershipId}
                      membershipTitle={membershipTitle}
                      membershipDescription={membershipDescription}
                      bookTextSearch={bookTextSearch}
                      handleInputChange={handleInputChange}
                      handleAddMembership={handleAddMembership}
                      handleDeleteBook={handleDeleteBook}
                      handleSearchBook={handleSearchBook}
                  />
              </Tab.Pane>
          )
      }
  ]

  return (
    <Tab menu={{ attached: 'top' }} panes={panes} />
  )
}

export default AdminTab