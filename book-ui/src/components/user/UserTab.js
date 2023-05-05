import React from 'react'
import { Tab } from 'semantic-ui-react'
import ClassesTable from "./ClassesTable";


function UserTab(props) {

    const { handleInputChange, updateMeetState, month, isForMember, isClassesLoading } = props
    const { isBooksLoading, books, bookIsbn, bookTitle, bookTextSearch, handleAddBook, handleDeleteBook, handleSearchBook } = props
    const { classes, classesTitle, classesDescription, handleAddClasses, isClassForMember, handleDeleteClasses, handleAddRegisteredClasses, handleGetRegisteredClasses, user_Id } = props
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
                    />
                </Tab.Pane>
            )
        }

    ]

    return (
        <Tab menu={{ attached: 'top' }} panes={panes} />
    )
}

export default UserTab
