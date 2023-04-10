import React from 'react'
import { Button, Form, Icon } from 'semantic-ui-react'

function MembershipForm({ membershipTitle, membershipDescription, handleInputChange, handleAddMembership,month,isForMember }) {
  console.log(month)
  console.log(isForMember)
  const createBtnDisabled = membershipTitle.trim() === '' || membershipDescription.trim() === '' || month === '' || !/^\d+$/.test(month)
  const options = [
    { key: 'yes', value: true, text: 'Yes' },
    { key: 'no', value: false, text: 'No' }
  ]
  return (
    <Form onSubmit={handleAddMembership}>
      <Form.Group >
        <Form.Input
            label='Membership Title'
          name='membershipTitle'
          placeholder='1YFull_Acess *'
          value={membershipTitle}
          onChange={handleInputChange}
        />
        <Form.Input
            label='Membership Description'
          name='membershipDescription'
          placeholder='Description *'
          value={membershipDescription}
          onChange={handleInputChange}
        />
        <Form.Input
            label='Membership Length (Months)'
            name='month'
            placeholder='Total Month'
            value={month}
            onChange={handleInputChange}
            required
            error={!/^\d+$/.test(month)}
        />
        <Form.Select
            label='For Members Only?'
            name='isForMember'
            placeholder='ForMember'
            value={isForMember}
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

export default MembershipForm