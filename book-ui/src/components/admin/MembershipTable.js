import React, {useContext, useState} from 'react'
import { Button, Form, Grid, Image, Input, Table } from 'semantic-ui-react'
import MembershipForm from "./MemebrshipForm";
import {bookApi} from "../misc/BookApi";
import AuthContext from "../context/AuthContext";

function MembershipTable({ price,memberships, handleDeleteMembership, membershipTitle,membershipDescription, bookTextSearch, handleInputChange, handleAddMembership, handleDeleteBook, handleSearchBook,month,isForMember ,handleFormResetMembership}) {
    const [editableRow, setEditableRow] = useState(null);
    const [updatedInstructors, setUpdatedInstructors] = useState([...memberships]);
    const authContext = useContext(AuthContext); // Access the AuthContext

    let membershipList
    const handleEditClick = (instructorId) => {
        setEditableRow(instructorId);
    };
    const handleInputChange2 = (instructorId, field, value) => {
        const updatedInstructor = updatedInstructors.find((instructor) => instructor.id === instructorId);
        updatedInstructor[field] = value;
        setUpdatedInstructors([...updatedInstructors]);
    };

    const renderTableCell = (membership, field) => {
        if (editableRow === membership.id) {
            return (
                <Table.Cell>
                    <Input value={membership[field]} onChange={(e) => handleInputChange2(membership.id, field, e.target.value)} />
                </Table.Cell>
            );
        } else {
            return <Table.Cell>{membership[field]}</Table.Cell>;
        }
        return undefined;
    };
    const handleUpdateInstructor = (instructor) => {
        // Make the backend API call to update the instructor using the instructor object
        // You can access the updated values from the instructor object and update the backend accordingly

        const user = authContext.getUser()
        bookApi.updateMembership(user,instructor);
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
    const renderTableRow = (membership) => {
        const isEditable = editableRow === membership.id;

        return (
            <Table.Row key={membership.id}>
                <Table.Cell collapsing>
                    <Button
                        circular
                        color='red'
                        size='small'
                        icon='trash'
                        onClick={() => handleDeleteMembership(membership.id)}
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
                {renderTableCell(membership, 'month')}
                {renderTableCell(membership, 'price')}
                <Table.Cell>{membership.isMember ? "Yes" : "No"}</Table.Cell>

            </Table.Row>
        )
    };
    if (memberships.length === 0) {
      membershipList = (
      <Table.Row key='no-book'>
        <Table.Cell collapsing textAlign='center' colSpan='4'>No Memberships</Table.Cell>
      </Table.Row>
    )
  } else {
      membershipList = memberships.map(renderTableRow)
  }

  return (
    <>
      <Grid stackable divided>
        <Grid.Row columns='2'>
          <Grid.Column width='20'>
            <MembershipForm
                price={price}
              membershipTitle={membershipTitle}
              membershipDescription={membershipDescription}
              handleInputChange={handleInputChange}
              handleAddMembership={handleAddMembership}
              month={month}
              isForMember={isForMember}
              handleFormResetMembership={handleFormResetMembership}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Table compact striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}/>
              <Table.HeaderCell width={1}/>
            {/*<Table.HeaderCell width={2}>Image</Table.HeaderCell>*/}
            <Table.HeaderCell width={1}>Id</Table.HeaderCell>
            <Table.HeaderCell width={3}>Title</Table.HeaderCell>
              <Table.HeaderCell width={7}>Description</Table.HeaderCell>
              <Table.HeaderCell width={1}>Length (Month)</Table.HeaderCell>
              <Table.HeaderCell width={3}>Price($)</Table.HeaderCell>
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

export default MembershipTable