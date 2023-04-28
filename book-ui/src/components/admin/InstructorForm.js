  import React from 'react'
  import { Button, Form, Icon } from 'semantic-ui-react'

  function InstructorForm({ instructorName, instructorAge, instructorDescription,instructorEmail, handleAddInstructor,handleInputChange }) {
    const createBtnDisabled = instructorName.trim() === '' || instructorDescription.trim() === '' || instructorEmail.trim() === '' || instructorAge.trim() === ''

    return (
      <Form onSubmit={handleAddInstructor}>
        <Form.Group >
          <Form.Input
              label='Instructor Name'
            name='instructorName'
            placeholder='Alex Fox'
            value={instructorName}
            onChange={handleInputChange}
          />
          <Form.Input
              label='Age'
              name='instructorAge'
              placeholder='25'
              value={instructorAge}
              onChange={handleInputChange}
          />
          <Form.Input
              label='Email'
              name='instructorEmail'
              placeholder='alexfox@gmail.com'
              value={instructorEmail}
              onChange={handleInputChange}
          />
          <Form.Input
              label='Instructor Description'
            name='instructorDescription'
            placeholder='Can Do Zumba classes and aerobic classes'
            value={instructorDescription}
            onChange={handleInputChange}
          />
          <Button icon labelPosition='right' disabled={createBtnDisabled}>
            Create<Icon name='add' />
          </Button>
        </Form.Group>
      </Form>
    )
  }

  export default InstructorForm