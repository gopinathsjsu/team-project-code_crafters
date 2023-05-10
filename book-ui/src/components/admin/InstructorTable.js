import React, { useState,useContext  } from 'react';
import { Button, Form, Grid, Image, Input, Table } from 'semantic-ui-react';
import InstructorForm from './InstructorForm';
import {bookApi} from "../misc/BookApi";
import AuthContext from "../context/AuthContext";
function InstructorTable({ instructors, instructorName, instructorAge, instructorDescription, handleInputChange, instructorEmail, handleDeleteInstructor, handleAddInstructor }) {
    const [editableRow, setEditableRow] = useState(null);
    const [updatedInstructors, setUpdatedInstructors] = useState([...instructors]);
    const handleEditClick = (instructorId) => {
        setEditableRow(instructorId);
    };
    const authContext = useContext(AuthContext); // Access the AuthContext



    const handleUpdateInstructor = (instructor) => {
        // Make the backend API call to update the instructor using the instructor object
        // You can access the updated values from the instructor object and update the backend accordingly
        console.log('Updating instructor:', instructor);

        const user = authContext.getUser()
        bookApi.updateInstructor(user,instructor);
        // You can also update the local state if needed
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

    const renderTableRow = (instructor) => {
        const isEditable = editableRow === instructor.id;

        return (
            <Table.Row key={instructor.id}>
                <Table.Cell collapsing>
                    <Button circular color='red' size='small' icon='trash' onClick={() => handleDeleteInstructor(instructor.id)} />
                </Table.Cell>
                <Table.Cell collapsing>
                    {!isEditable && (
                        <Button icon='edit' onClick={() => handleEditClick(instructor.id)} />
                    )}
                    {isEditable && (
                        <>
                            <Button icon='check' onClick={() => handleDoneClick(instructor)} />
                            <Button icon='cancel' onClick={handleCancelClick} />
                        </>
                    )}
                </Table.Cell>
                <Table.Cell>{instructor.id}</Table.Cell>
                {renderTableCell(instructor, 'name')}
                {renderTableCell(instructor, 'email')}
                {renderTableCell(instructor, 'age')}
                {renderTableCell(instructor, 'description')}

            </Table.Row>
        );
    };

    let instructorList;

    if (instructors.length === 0) {
        instructorList = (
            <Table.Row key='no-classes'>
                <Table.Cell collapsing textAlign='center' colSpan='5'>No Instructors</Table.Cell>
            </Table.Row>
        );
    } else {
        instructorList = instructors.map(renderTableRow);
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
                        <Table.HeaderCell width={1} />
                        <Table.HeaderCell width={1} />
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