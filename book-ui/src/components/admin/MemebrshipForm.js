import React from 'react'
import { Button, Form, Icon } from 'semantic-ui-react'

function MembershipForm({ membershipTitle, membershipDescription, handleInputChange, handleAddMembership }) {
  const createBtnDisabled = membershipTitle.trim() === '' || membershipDescription.trim() === ''
  return (
    <Form onSubmit={handleAddMembership}>
      <Form.Group>
        <Form.Input
          name='membershipTitle'
          placeholder='1YFull_Acess *'
          value={membershipTitle}
          onChange={handleInputChange}
        />
        <Form.Input
          name='membershipDescription'
          placeholder='Description *'
          value={membershipDescription}
          onChange={handleInputChange}
        />
        <Button icon labelPosition='right' disabled={createBtnDisabled}>
          Create<Icon name='add' />
        </Button>
      </Form.Group>
    </Form>
  )
}

export default MembershipForm