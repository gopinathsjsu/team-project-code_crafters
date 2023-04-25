import React from 'react'
import { Button, Form, Grid, Image, Input, Table } from 'semantic-ui-react'
import ClassesForm from "./ClassesForm";
import InstructorForm from "./InstructorForm";

function InstructorTable({ instructors, instructorName,instructorAge, instructorDescription, handleInputChange, instructorEmail,handleDeleteInstructor ,handleAddInstructor}) {
  let instructorList
  if (instructors.length === 0) {
      instructorList = (
      <Table.Row key='no-classes'>
        <Table.Cell collapsing textAlign='center' colSpan='4'>No Instructors</Table.Cell>
      </Table.Row>
    )
  } else {
      instructorList = instructors.map(instructor => {
      return (
        <Table.Row key={instructor.id}>
          <Table.Cell collapsing>
            <Button
              circular
              color='red'
              size='small'
              icon='trash'
              onClick={() => handleDeleteInstructor(instructor.id)}
            />
          </Table.Cell>
          <Table.Cell>{instructor.id}</Table.Cell>
          <Table.Cell>{instructor.name}</Table.Cell>
          <Table.Cell>{instructor.email}</Table.Cell>
            <Table.Cell>{instructor.age}</Table.Cell>
          <Table.Cell>{instructor.description}</Table.Cell>
        </Table.Row>
      )
    })
  }

  return (
    <>
      <Grid stackable divided>
        <Grid.Row columns='2'>

          <Grid.Column width='16'>
            <InstructorForm
                instructorName={instructorName}
                instructorAge={instructorAge}
                instructorDescription={instructorDescription}
                instructorEmail={instructorEmail}
                handleInputChange={handleInputChange}
                handleAddInstructor={handleAddInstructor}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Table compact striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}/>
            <Table.HeaderCell width={1}>Id</Table.HeaderCell>
            <Table.HeaderCell width={4}>Name</Table.HeaderCell>
              <Table.HeaderCell width={4}>Email</Table.HeaderCell>
              <Table.HeaderCell width={4}>Age</Table.HeaderCell>
              <Table.HeaderCell width={7}>Description</Table.HeaderCell>

          </Table.Row>
        </Table.Header>
        <Table.Body>
          {instructorList}
        </Table.Body>
      </Table>
    </>
  )
}

export default InstructorTable