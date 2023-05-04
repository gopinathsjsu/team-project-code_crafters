import React from 'react'
import { Button, Form, Icon } from 'semantic-ui-react'

function ClassesForm({ classesTitle, classesDescription, handleInputChange, handleAddClasses,isClassForMember,instructors,instructorIdForClassCreate,handleGetRegisteredClasses,printRegisteredClasses }) {

    const options = [
        { key: 'yes', value: true, text: 'Yes' },
        { key: 'no', value: false, text: 'No' }
    ]
    const instructorsOptions = instructors.map((instructor) => ({
        key: instructor.id,
        text: instructor.name+": "+instructor.description,
        value: instructor.id,
    }))

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission
        handleAddClasses(); // Call handleAddClasses function
    };

}

export default ClassesForm