import React from 'react'
import { Tab } from 'semantic-ui-react'
import UserTable from './UserTable'
import Signup from '../home/Signup'
import MembershipTable from "./MembershipTable";
import ClockInOut from '../home/ClockInOut'
import ClockInTable from "./ClockInTable";
import ClassesTable from "./ClassesTable";
import InstructorTable from "./InstructorTable";
function AdminTab(props) {
  const { price,selectedLocationIdForClasses,handleInputChange,updateMeetState,month,isForMember,isClassesLoading,locations } = props
  const { isUsersLoading, users, userUsernameSearch, handleDeleteUser, handleSearchUser,ClassesTextSearch,handleSearchClasses } = props
  const { isBooksLoading, books, bookIsbn, bookTitle, bookTextSearch, handleAddBook, handleDeleteBook, handleSearchBook } = props
  const { isMembershipsLoading, memberships, membershipId, membershipTitle, membershipDescription, handleAddMembership, handleDeleteMembership, handleSearchMembership,clockInData,handleGetClockInData } = props
    const {classes,classesTitle,classesDescription,handleAddClasses,isClassForMember,handleDeleteClasses} = props
    const {instructorIdForClassCreate,isInstructorsLoading,instructorAge,handleDeleteInstructor,instructorDescription,instructors,instructorEmail,instructorName,handleAddInstructor} = props
    const{startTimeClass,endTimeClass,selectedDaysClass,endDateClass,startDateClass,handleFormResetClass,handleFormResetMembership} = props
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
            memberships={memberships}
            locations={locations}
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
                      month = {month}
                      isForMember = {isForMember}
                      handleDeleteMembership={handleDeleteMembership}
                      handleFormResetMembership={handleFormResetMembership}
                      price={price}
                  />
              </Tab.Pane>
          )
      },
        {
            menuItem: { key: 'classes', icon: 'book', content: 'classes' },
            render: () => (
                <Tab.Pane loading={isClassesLoading}>
                    <ClassesTable
                        classes={classes}
                        classesTitle={classesTitle}
                        classesDescription={classesDescription}
                        bookTextSearch={bookTextSearch}
                        handleInputChange={handleInputChange}
                        handleAddClasses={handleAddClasses}
                        handleDeleteBook={handleDeleteBook}
                        handleSearchBook={handleSearchBook}
                        isClassForMember = {isClassForMember}
                        handleDeleteClasses={handleDeleteClasses}
                        instructors = {instructors}
                        instructorIdForClassCreate={instructorIdForClassCreate}
                        locations={locations}
                        selectedLocationIdForClasses={selectedLocationIdForClasses}
                        handleSearchClasses={handleSearchClasses}
                        ClassesTextSearch={ClassesTextSearch}
                        startTimeClass={startTimeClass}
                        endTimeClass={endTimeClass}
                        selectedDaysClass={selectedDaysClass}
                        endDateClass={endDateClass}
                        startDateClass={startDateClass}
                        handleFormResetClass={handleFormResetClass}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: { key: 'instructors', icon: 'book', content: 'instructors' },
            render: () => (
                <Tab.Pane loading={isInstructorsLoading}>
                    <InstructorTable
                        handleInputChange={handleInputChange}
                        instructorAge={instructorAge}
                        handleDeleteInstructor={handleDeleteInstructor}
                        instructorDescription={instructorDescription}
                        instructors={instructors}
                        instructorEmail={instructorEmail}
                        instructorName={instructorName}
                        handleAddInstructor={handleAddInstructor}
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