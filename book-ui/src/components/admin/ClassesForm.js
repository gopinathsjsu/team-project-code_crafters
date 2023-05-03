  import React from 'react'
  import {Button, Dropdown, Form, Icon} from 'semantic-ui-react'

  function ClassesForm({ classesTitle, classesDescription, handleInputChange, handleAddClasses,isClassForMember,instructors,instructorIdForClassCreate,selectedLocationIdForClasses,locations }) {
    const createBtnDisabled = classesTitle.trim() === '' || classesDescription.trim() === ''
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
    const locationsForSelect = locations.map((instructor) => ({
      key: instructor.id,
      text: instructor.name,
      value: instructor.id,
    }))
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group >
          <Form.Input
              label='Class Title'
            name='classesTitle'
            placeholder='Zumba Everyday'
            value={classesTitle}
            onChange={handleInputChange}
          />
          <Form.Input
              label='Class Description'
            name='classesDescription'
            placeholder='Zumba Everyday at 5.00PM to 6.00PM by Meet Patel * *'
            value={classesDescription}
            onChange={handleInputChange}
          />

          <Form.Select
              label='For Members Only?'
              name='isClassForMember'
              placeholder='ForMember'
              value={isClassForMember}
              options={options}
              onChange={handleInputChange}
              required
              compact
          />
          <Form.Select
              label='Instructors'
              name='instructorIdForClassCreate'
              value={instructorIdForClassCreate}
              options={instructorsOptions}
              onChange={handleInputChange}
              required
          />
          <Form.Select
              label='Location'
              name='selectedLocationIdForClasses'
              placeholder='ForMember'
              value={selectedLocationIdForClasses}
              options={locationsForSelect}
              onChange={handleInputChange}
              required
          />
          <div style={{ marginTop: '25px' }}>
            <Button icon labelPosition='right' disabled={createBtnDisabled}>
              Create<Icon name='add' />
            </Button>
          </div>
        </Form.Group>
      </Form>
    )
  }

  export default ClassesForm