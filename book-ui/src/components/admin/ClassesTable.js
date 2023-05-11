import React, {useContext, useState} from 'react'
import { Button, Form, Grid, Image, Input, Table } from 'semantic-ui-react'
import ClassesForm from "./ClassesForm";
import { Segment } from 'semantic-ui-react';
import {bookApi} from "../misc/BookApi";
import AuthContext from "../context/AuthContext";

function ClassesTable({ classes, classesTitle,classesDescription, handleSearchClasses, handleInputChange, handleAddClasses, ClassesTextSearch, handleSearchBook,isClassForMember,handleDeleteClasses ,instructors,instructorIdForClassCreate,locations,selectedLocationIdForClasses,startTimeClass,endTimeClass,selectedDaysClass,endDateClass,startDateClass,handleFormResetClass}) {

    const [editableRow, setEditableRow] = useState(null);
    const [updatedInstructors, setUpdatedInstructors] = useState([...classes]);

    const handleEditClick = (instructorId) => {
        setEditableRow(instructorId);
    };
    const handleInputChange2 = (instructorId, field, value) => {
        const updatedInstructor = updatedInstructors.find((instructor) => instructor.id === instructorId);

        updatedInstructor[field] = value;
        setUpdatedInstructors([...updatedInstructors]);
    };
    const renderTableCell = (instructor, field) => {
        if (editableRow === instructor.id) {
            return (
                <Table.Cell>
                    <Input value={instructor[field]} onChange={(e) => handleInputChange2(instructor.id, field, e.target.value)} />
                </Table.Cell>
            );
        } else {
            return <Table.Cell>{instructor[field]}</Table.Cell>;
        }
    };

    const authContext = useContext(AuthContext); // Access the AuthContext

    const handleUpdateInstructor = (instructor) => {
        console.log('Updating Classes:', instructor);

        const user = authContext.getUser()
        bookApi.updateClasses(user,instructor);
        setEditableRow(null);
    };
    const handleDoneClick = (instructor) => {
        // Make the backend API call with the updated values
        // Reset the editable row state
        handleUpdateInstructor(instructor);
        setEditableRow(null);
    };

    const handleCancelClick = () => {
        setEditableRow(null);
    };
    const renderTableRow = (membership) => {
          const isEditable = editableRow === membership.id;
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
            <Table.Cell collapsing>
                {!isEditable && (
                    <Button icon='edit' onClick={() => handleEditClick(membership.id)} />
                )}
                {isEditable && (
                    <>
                        <Button icon='check' onClick={() => handleDoneClick(membership)} />
                        <Button icon='cancel' onClick={handleCancelClick} />
                    </>
                )}
            </Table.Cell>
            <Table.Cell>{membership.id}</Table.Cell>
            {renderTableCell(membership, 'title')}
            {renderTableCell(membership, 'description')}
            <Table.Cell> {instructors.find(i => i.id === membership.instructorId)?.name}</Table.Cell>
            <Table.Cell>
                { locations.find(m => m.id === membership.locationId)?.name}
            </Table.Cell>
            <Table.Cell>{`${startDateTime} - ${endDateTime} ${dayString} ${dateRange}`}</Table.Cell>

          <Table.Cell>{membership.isForMember ? "Yes" : "No"}</Table.Cell>



        </Table.Row>
      )

  };
    let membershipList = []
    if (classes.length === 0) {
        membershipList = (
            <Table.Row key='no-classes'>
                <Table.Cell collapsing textAlign='center' colSpan='4'>No Classes</Table.Cell>
            </Table.Row>
        )
    }else {
        membershipList = classes.map(renderTableRow)
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
              handleFormResetClass={handleFormResetClass}
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