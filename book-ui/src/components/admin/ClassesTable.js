import React from 'react'
import { Button, Form, Grid, Image, Input, Table } from 'semantic-ui-react'
import ClassesForm from "./ClassesForm";

function ClassesTable({ classes, classesTitle,classesDescription, handleSearchClasses, handleInputChange, handleAddClasses, ClassesTextSearch, handleSearchBook,isClassForMember,handleDeleteClasses ,instructors,instructorIdForClassCreate,locations,selectedLocationIdForClasses}) {
  let membershipList
  if (classes.length === 0) {
      membershipList = (
      <Table.Row key='no-classes'>
        <Table.Cell collapsing textAlign='center' colSpan='4'>No Classes</Table.Cell>
      </Table.Row>
    )
  } else {
      membershipList = classes.map(membership => {
      return (
        <Table.Row key={membership.id}>
          <Table.Cell collapsing>
            <Button
              circular
              color='red'
              size='small'
              icon='trash'
              onClick={() => handleDeleteClasses(membership.id)}
            />
          </Table.Cell>
          <Table.Cell>{membership.id}</Table.Cell>
          <Table.Cell>{membership.title}</Table.Cell>
          <Table.Cell>{membership.description}</Table.Cell>
            <Table.Cell> {instructors.find(i => i.id === membership.instructorId)?.name}</Table.Cell>
            <Table.Cell>
                { locations.find(m => m.id === membership.locationId)?.name}
            </Table.Cell>
          <Table.Cell>{membership.isForMember ? "Yes" : "No"}</Table.Cell>
        </Table.Row>
      )
    })
  }

  return (
    <>
      <Grid stackable divided>
        <Grid.Row columns='2'>
          <Grid.Column width='4'>
            <Form onSubmit={handleSearchClasses}>
              <Input
                action={{ icon: 'search' }}
                name='ClassesTextSearch'
                placeholder='Search by Title'
                value={ClassesTextSearch}
                onChange={handleInputChange}
                style={{ marginBottom: '30px' }}
              />
            </Form>
          </Grid.Column>
          <Grid.Column width='16'>
            <ClassesForm
              classesTitle={classesTitle}
              classesDescription={classesDescription}
              handleInputChange={handleInputChange}
              handleAddClasses={handleAddClasses}
              isClassForMember={isClassForMember}
                instructors = {instructors}
              instructorIdForClassCreate={instructorIdForClassCreate}
              selectedLocationIdForClasses={selectedLocationIdForClasses}
              locations={locations}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Table compact striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}/>
            <Table.HeaderCell width={1}>Id</Table.HeaderCell>
            <Table.HeaderCell width={4}>Title</Table.HeaderCell>
              <Table.HeaderCell width={7}>Description</Table.HeaderCell>
              <Table.HeaderCell width={2}>Instructor</Table.HeaderCell>
              <Table.HeaderCell width={2}>Location</Table.HeaderCell>
              <Table.HeaderCell width={4}>Is For Member</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {membershipList}
        </Table.Body>
      </Table>
    </>
  )
}

export default ClassesTable