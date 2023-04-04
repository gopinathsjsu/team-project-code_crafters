import React from 'react'
import { Button, Form, Grid, Image, Input, Table } from 'semantic-ui-react'
import MembershipForm from "./MemebrshipForm";

function MembershipTable({ memberships, membershipId, membershipTitle,membershipDescription, bookTextSearch, handleInputChange, handleAddMembership, handleDeleteBook, handleSearchBook }) {
  let membershipList
  if (memberships.length === 0) {
      membershipList = (
      <Table.Row key='no-book'>
        <Table.Cell collapsing textAlign='center' colSpan='4'>No Memberships</Table.Cell>
      </Table.Row>
    )
  } else {
      membershipList = memberships.map(membership => {
      return (
        <Table.Row key={membership.id}>
          <Table.Cell collapsing>
            <Button
              circular
              color='red'
              size='small'
              icon='trash'
              onClick={() => handleDeleteBook(membership.id)}
            />
          </Table.Cell>
          <Table.Cell>
            <Image src={`http://covers.openlibrary.org/b/isbn/${membership.id}-M.jpg`} size='tiny' bordered rounded />
          </Table.Cell>
          <Table.Cell>{membership.id}</Table.Cell>
          <Table.Cell>{membership.title}</Table.Cell>
          <Table.Cell>{membership.description}</Table.Cell>
        </Table.Row>
      )
    })
  }

  return (
    <>
      <Grid stackable divided>
        <Grid.Row columns='2'>
          <Grid.Column width='5'>
            <Form onSubmit={handleSearchBook}>
              <Input
                action={{ icon: 'search' }}
                name='bookTextSearch'
                placeholder='Search by Id or Title'
                value={bookTextSearch}
                onChange={handleInputChange}
              />
            </Form>
          </Grid.Column>
          <Grid.Column>
            <MembershipForm
              membershipTitle={membershipTitle}
              membershipDescription={membershipDescription}
              handleInputChange={handleInputChange}
              handleAddMembership={handleAddMembership}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Table compact striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}/>
            <Table.HeaderCell width={3}>Image</Table.HeaderCell>
            <Table.HeaderCell width={4}>Id</Table.HeaderCell>
            <Table.HeaderCell width={8}>Title</Table.HeaderCell>
              <Table.HeaderCell width={8}>Description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {membershipList}
        </Table.Body>
      </Table>
    </>
  )
}

export default MembershipTable