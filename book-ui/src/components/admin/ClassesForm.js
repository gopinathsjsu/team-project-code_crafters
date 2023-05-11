  import React from 'react'
  import {Button, Dropdown, Form, Icon} from 'semantic-ui-react'

  function ClassesForm({ classesTitle, classesDescription, handleInputChange, handleAddClasses,isClassForMember,instructors,instructorIdForClassCreate,selectedLocationIdForClasses,locations,startTimeClass,endTimeClass,selectedDaysClass,endDateClass,startDateClass,handleFormResetClass}) {
    const createBtnDisabled = classesTitle.trim() === '' || classesDescription.trim() === '' || !selectedLocationIdForClasses || startTimeClass < new Date()
        || !endTimeClass
        || endTimeClass < new Date()
        || !selectedDaysClass.length
        || !startDateClass
        || !endDateClass
        || endDateClass < startDateClass

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
        // Reset the form inputs to their initial values
      handleFormResetClass();
    };
    const locationsForSelect = locations.map((instructor) => ({
      key: instructor.id,
      text: instructor.name,
      value: instructor.id,
    }))
    const daysOptions = [
      { key: 'monday', value: 'Monday', text: 'Monday' },
      { key: 'tuesday', value: 'Tuesday', text: 'Tuesday' },
      { key: 'wednesday', value: 'Wednesday', text: 'Wednesday' },
      { key: 'thursday', value: 'Thursday', text: 'Thursday' },
      { key: 'friday', value: 'Friday', text: 'Friday' },
      { key: 'saturday', value: 'Saturday', text: 'Saturday' },
      { key: 'sunday', value: 'Sunday', text: 'Sunday' },
    ];

    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group >
          <Form.Input
              label='Class Title'
            name='classesTitle'
            placeholder='Zumba Everyday'
            value={classesTitle}
            onChange={handleInputChange}
              required
          />
          <Form.Input
              label='Class Description'
            name='classesDescription'
            placeholder='Zumba Everyday at 5.00PM to 6.00PM by Meet Patel * *'
            value={classesDescription}
            onChange={handleInputChange}
              required
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
              placeholder='Location'
              value={selectedLocationIdForClasses}
              options={locationsForSelect}
              onChange={handleInputChange}
              required
          />

        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
              label='Start Date'
              name='startDateClass'
              id = 'startDateClass'
              type='date'
              value={startDateClass}
              onChange={handleInputChange}
              required
              min={new Date().toISOString().split('T')[0]}
          />
          <Form.Input
              label='End Date'
              name='endDateClass'
              id='startDateClass'
              type='date'
              value={endDateClass}
              onChange={handleInputChange}
              required
          />
        </Form.Group>
          <br/>
          <Form.Group widths='equal'>
            <Form.Select
                label='Select Days'
                name='selectedDaysClass'
                placeholder='Select Days'
                id='selectedDaysClass'
                value={selectedDaysClass}
                options={daysOptions}
                onChange={handleInputChange}
                required
                multiple
            />
            <Form.Input
                label='Start Time'
                name='startTimeClass'
                type='time'
                value={startTimeClass}
                onChange={handleInputChange}
                required

            />
            <Form.Input
                label='End Time'
                name='endTimeClass'
                type='time'
                value={endTimeClass}
                onChange={handleInputChange}
                required
            />
          </Form.Group>

          <div style={{ marginTop: '25px' }}>
            <Button icon labelPosition='right' disabled={createBtnDisabled}>
              Create<Icon name='add' />
            </Button>
          </div>
      </Form>
    )
  }

  export default ClassesForm