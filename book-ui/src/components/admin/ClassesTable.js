import React from 'react'
import { Button, Form, Grid, Image, Input, Table } from 'semantic-ui-react'
import ClassesForm from "./ClassesForm";
import { Segment } from 'semantic-ui-react';

function ClassesTable({ classes, classesTitle,classesDescription, handleSearchClasses, handleInputChange, handleAddClasses, ClassesTextSearch, handleSearchBook,isClassForMember,handleDeleteClasses ,instructors,instructorIdForClassCreate,locations,selectedLocationIdForClasses,startTimeClass,endTimeClass,selectedDaysClass,endDateClass,startDateClass}) {
  let membershipList
  if (classes.length === 0) {
      membershipList = (
      <Table.Row key='no-classes'>
        <Table.Cell collapsing textAlign='center' colSpan='4'>No Classes</Table.Cell>
      </Table.Row>
    )
  } else {
      membershipList = classes.map(membership => {
          const startDate = new Date(membership.startDate);
          const endDate = new Date(membership.endDate);
          const days = JSON.parse(membership.days).map(day => {
              switch (day) {
                  case 'Monday':
                      return 'M';
                  case 'Tuesday':
                      return 'Tu';
                  case 'Wednesday':
                      return 'W';
                  case 'Thursday':
                      return 'Th';
                  case 'Friday':
                      return 'F';
                  case 'Saturday':
                      return 'Sa';
                  case 'Sunday':
                      return 'Su';
                  default:
                      return '';
              }
          });


          const startDateTime = startDate.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
          const endDateTime = endDate.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
          const dateRange = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
          const dayString = days.join(',');
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
            <Table.Cell>{`${startDateTime} - ${endDateTime} ${dayString} ${dateRange}`}</Table.Cell>

          <Table.Cell>{membership.isForMember ? "Yes" : "No"}</Table.Cell>



        </Table.Row>
      )
    })
  }

  return (
    <>
      <Grid stackable divided>
        <Grid.Row columns='2'>

          <Grid.Column width='16'>
              <Segment style={{ border: '1px solid gray' }}>
                  <h2>Create Class Schedule</h2>
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
              startTimeClass={startTimeClass}
              endTimeClass={endTimeClass}
              selectedDaysClass={selectedDaysClass}
              endDateClass={endDateClass}
              startDateClass={startDateClass}
            /></Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
                        />
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
      <Table compact striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}/>
            <Table.HeaderCell width={1}>Id</Table.HeaderCell>
            <Table.HeaderCell width={2}>Title</Table.HeaderCell>
              <Table.HeaderCell width={4}>Description</Table.HeaderCell>
              <Table.HeaderCell width={2}>Instructor</Table.HeaderCell>
              <Table.HeaderCell width={2}>Location</Table.HeaderCell>
              <Table.HeaderCell width={6}>Timings</Table.HeaderCell>
              <Table.HeaderCell width={2}>Is For Member</Table.HeaderCell>
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