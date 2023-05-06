import React from 'react';
import { Tab } from 'semantic-ui-react';
import ClassesTable from "./ClassesTable";
import GymDetail from "./gymdetail";
import AwardsPage from "./Awards";
import FutureProjectsPage from "./FutureProjects";


function UserTab(props) {

    const { handleInputChange, updateMeetState, month, isForMember, isClassesLoading } = props
    const { isBooksLoading, books, bookIsbn, bookTitle, bookTextSearch, handleAddBook, handleDeleteBook, handleSearchBook } = props
    const { classes, classesTitle, classesDescription, handleAddClasses, isClassForMember, handleDeleteClasses, handleAddRegisteredClasses, handleGetRegisteredClasses, user_Id, user_role } = props
    const { instructorIdForClassCreate, isInstructorsLoading, instructorAge, handleDeleteInstructor, instructorDescription, instructors, instructorEmail, instructorName, handleAddInstructor, printRegisteredClasses } = props

    const panes = [
        {
            menuItem: { key: 'classes', icon: 'book', content: 'Classes' },
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
                        isClassForMember={isClassForMember}
                        handleAddRegisteredClasses={handleAddRegisteredClasses}
                        handleGetRegisteredClasses={handleGetRegisteredClasses}
                        instructors={instructors}
                        instructorIdForClassCreate={instructorIdForClassCreate}
                        printRegisteredClasses={printRegisteredClasses}
                        user_Id={user_Id}
                        user_role={user_role}
                    />
                </Tab.Pane>
            )

        },
        {
            menuItem: { key: 'GymDetail', icon: 'book', content: 'About us' },
            render: () => (
                <Tab.Pane loading={isClassesLoading}>
                    <GymDetail />
                </Tab.Pane>

            )
        },
        {
            menuItem: { key: 'AwardsPage', icon: 'book', content: 'Our Awards' },
            render: () => (
                <Tab.Pane loading={isClassesLoading}>
                    <AwardsPage />
                </Tab.Pane>

            )
        },
        {
            menuItem: { key: 'Future Projects', icon: 'book', content: 'Future Projects' },
            render: () => (
                <Tab.Pane loading={isClassesLoading}>
                    <FutureProjectsPage />
                </Tab.Pane>

            )
        }



    ]

    return (
        <Tab menu={{ attached: 'top' }} panes={panes} />
    )
}

export default UserTab;
