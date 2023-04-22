  import React from 'react'
  import { Button, Form, Icon } from 'semantic-ui-react'

  function ClassesForm({ classesTitle, classesDescription, handleInputChange, handleAddClasses,isClassForMember }) {
    const createBtnDisabled = classesTitle.trim() === '' || classesDescription.trim() === ''
    const options = [
      { key: 'yes', value: true, text: 'Yes' },
      { key: 'no', value: false, text: 'No' }
    ]
    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent form submission
      handleAddClasses(); // Call handleAddClasses function
    };
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
          />

          <Button icon labelPosition='right' disabled={createBtnDisabled}>
            Create<Icon name='add' />
          </Button>
        </Form.Group>
      </Form>
    )
  }

  export default ClassesForm