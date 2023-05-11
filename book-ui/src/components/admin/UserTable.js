import React, {useContext, useState,useEffect } from 'react'
import { Form, Button, Input, Table } from 'semantic-ui-react'
import AuthContext from "../context/AuthContext";
import {bookApi} from "../misc/BookApi";

function UserTable({ users, userUsernameSearch, handleInputChange, handleDeleteUser, handleSearchUser ,memberships,locations}) {
    let userList
    const [editableRow, setEditableRow] = useState(null);
    const [updatedInstructors, setUpdatedInstructors] = useState([...users]);
    const handleEditClick = (instructorId) => {
        setEditableRow(instructorId);
    };
    useEffect(() => {
        setUpdatedInstructors([...users]);
    }, [users]);
    const authContext = useContext(AuthContext); // Access the AuthContext

    const handleUpdateInstructor = (instructor) => {

        const user = authContext.getUser()
        bookApi.updateUser(user,instructor);
        setEditableRow(null);
    };
    const handleDoneClick = (instructor) => {
        handleUpdateInstructor(instructor);
        setEditableRow(null);
    };

    const handleCancelClick = () => {
        setEditableRow(null);
    };
    const handleInputChange2 = (instructorId, field, value) => {
        const updatedInstructor = updatedInstructors.find((instructor) => instructor.id === instructorId);
        console.log(users,instructorId,updatedInstructors)
        updatedInstructor[field] = value;
        setUpdatedInstructors([...updatedInstructors]);
        console.log("AA"+updatedInstructor)
    };

    const renderTableCell = (instructor, field) => {
        if (editableRow === instructor.id && instructor.name !== "admin" ) {
            return (
                <Table.Cell>
                    <Input value={instructor[field]} onChange={(e) => handleInputChange2(instructor.id, field, e.target.value)} />
                </Table.Cell>
            );
        } else {
            return <Table.Cell>{instructor[field]}</Table.Cell>;
        }
    };
    const renderTableRow = (user) => {
            const isEditable = editableRow === user.id;
            return (
                <Table.Row key={user.id}>
                    <Table.Cell collapsing>
                        <Button
                            circular
                            color='red'
                            size='small'
                            icon='trash'
                            disabled={user.username === 'admin'}
                            onClick={() => handleDeleteUser(user.username)}
                        />
                    </Table.Cell>
                    <Table.Cell collapsing>
                        {!isEditable && (
                            <Button icon='edit' onClick={() => handleEditClick(user.id)}/>
                        )}
                        {isEditable && (
                            <>
                                <Button icon='check' onClick={() => handleDoneClick(user)}/>
                                <Button icon='cancel' onClick={handleCancelClick}/>
                            </>
                        )}
                    </Table.Cell>
                    <Table.Cell>{user.id}</Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    {renderTableCell(user, 'name')}
                    {renderTableCell(user, 'email')}
                    <Table.Cell>{user.role}</Table.Cell>
                    <Table.Cell>
                        {user.role === "ADMIN" ? "-" : user.daysRemaining}
                    </Table.Cell>
                    <Table.Cell>
                        {locations.find(m => m.id === user.locationId)?.name}
                    </Table.Cell>
                    <Table.Cell>
                        {user.role === "ADMIN" ? "-" : memberships.find(m => m.id === user.membershipId)?.title}
                    </Table.Cell>

                    <Table.Cell>{user.isActive ? 'Yes' : 'No'}</Table.Cell>


                </Table.Row>
            )
        }
    if (users.length === 0) {
        userList = (
            <Table.Row key='no-user'>
                <Table.Cell collapsing textAlign='center' colSpan='6'>No user</Table.Cell>
            </Table.Row>
        )
    }else {
        userList = users.map(renderTableRow)
    }
  return (
    <>

      <Form onSubmit={handleSearchUser}>
        <Input
          action={{ icon: 'search' }}
          name='userUsernameSearch'
          placeholder='Search by Username'
          value={userUsernameSearch}
          onChange={handleInputChange}
        />
      </Form>
      <Table compact striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}/>
              <Table.HeaderCell width={1}/>
            <Table.HeaderCell width={1}>ID</Table.HeaderCell>
            <Table.HeaderCell width={3}>Username</Table.HeaderCell>
            <Table.HeaderCell width={4}>Name</Table.HeaderCell>
            <Table.HeaderCell width={5}>Email</Table.HeaderCell>
            <Table.HeaderCell width={2}>Role</Table.HeaderCell>
              <Table.HeaderCell width={2}>Days Remaining</Table.HeaderCell>
              <Table.HeaderCell width={3}>Base Location</Table.HeaderCell>
              <Table.HeaderCell width={4}>Membership Plan</Table.HeaderCell>
              <Table.HeaderCell width={2}>Active</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {userList}
        </Table.Body>
      </Table>
    </>
  )
}

export default UserTable