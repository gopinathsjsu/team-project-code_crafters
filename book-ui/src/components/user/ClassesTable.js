import React from 'react'
import { Button, Form, Grid, Input, Table } from 'semantic-ui-react'
import ClassesForm from "./ClassesForm";
import AuthContext from "../context/AuthContext";

function formatDate(string) {
    const date = new Date(string);
    const year = date.getFullYear().toString().substr(-2); // Get last 2 digits of year
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if necessary
    const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if necessary
    return `${month}/${day}/${year}`;
}


function ClassesTable({ classes, classesTitle, classesDescription, bookTextSearch, handleInputChange, handleAddClasses, handleAddRegisteredClasses, handleSearchBook, isClassForMember, handleDeleteClasses, instructors, instructorIdForClassCreate, printRegisteredClasses,user_Id,user_role }) {
    let membershipList;
    let registeredClassesIds = printRegisteredClasses
        .filter(rc => rc.user_id === user_Id)
        .map(rc => rc.classes_id);
    if (classes.length === 0) {
        membershipList = (
            <Table.Row key='no-classes'>
                <Table.Cell collapsing textAlign='center' colSpan='4'>No Classes</Table.Cell>
            </Table.Row>
        );
    } else {
        membershipList = classes.map(membership => {


            console.log(user_role)
            if ((user_role === 'USER' && (registeredClassesIds.includes(membership.id) )) ||(user_role === 'NONMember' && (registeredClassesIds.includes(membership.id) || membership.isForMember === true))) {
                return null; // skip this class as it is already registered by the user
            }

            return (

                <Table.Row key={membership.id}>
                    <Table.Cell collapsing>
                        <Button
                            circle
                            color='blue'
                            size='small'
                            icon='add /'
                            onClick={handleAddRegisteredClasses.bind(this, membership)
                            }
                        />
                    </Table.Cell>
                    <Table.Cell>{membership.id}</Table.Cell>
                    <Table.Cell>{membership.title}</Table.Cell>
                    <Table.Cell>{membership.description}</Table.Cell>
                    <Table.Cell>{formatDate(membership.startDate)}</Table.Cell>
                    <Table.Cell>{formatDate(membership.endDate)}</Table.Cell>
                    <Table.Cell>{membership.isForMember ? "True" : "False"}</Table.Cell>
                </Table.Row>
            );
        });

        let RegisteredClasses;


        if (printRegisteredClasses.length === 0) {
            let RegisteredClasses = (
                <Table.Row key='no-classes'>
                    <Table.Cell collapsing textAlign='center' colSpan='4'>No Classes</Table.Cell>
                </Table.Row>
            );
        } else {


            RegisteredClasses = printRegisteredClasses.map(classesList => {
                console.log(classesList, "See Here")
                if (classesList.user_id !== user_Id){
                    return null;
                }
                return (

                        <Table.Row key={classesList.id}>
                            <Table.Cell collapsing>

                            </Table.Cell>
                        <Table.Cell>{classesList.classes_id}</Table.Cell>
                        <Table.Cell>{classesList.title}</Table.Cell>
                        <Table.Cell>{classesList.description}</Table.Cell>
                            <Table.Cell>{formatDate(classesList.startDate)}</Table.Cell>
                            <Table.Cell>{formatDate(classesList.endDate)}</Table.Cell>
                            <Table.Cell>{classesList.isMember ? "True" : "False"}</Table.Cell>

                    </Table.Row>
                );
            });
        }
        // Check if user has any enrolled classes and add additional columns to the enrolledClassesList


        return (
            <>
                <Grid stackable divided>
                    <Grid.Row columns='2'>
                        <Grid.Column width='4'>
                            <Form onSubmit={handleSearchBook}>
                                <Input
                                    action={{icon: 'search'}}
                                    name='bookTextSearch'
                                    placeholder='Search by Id or Title'
                                    value={bookTextSearch}
                                    onChange={handleInputChange}
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
                                instructors={instructors}
                                instructorIdForClassCreate={instructorIdForClassCreate}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Table compact striped selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan={7}>Available Classes</Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Start Date</Table.HeaderCell>
                            <Table.HeaderCell>End Date</Table.HeaderCell>
                            <Table.HeaderCell>Member Only</Table.HeaderCell>
                            {!isClassForMember && <Table.HeaderCell/>}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {membershipList}
                    </Table.Body>
                    {printRegisteredClasses.length > 0 &&
                        <>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell colSpan={7}>Registered Classes</Table.HeaderCell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell>Id</Table.HeaderCell>
                                    <Table.HeaderCell>Title</Table.HeaderCell>
                                    <Table.HeaderCell>Description</Table.HeaderCell>
                                    <Table.HeaderCell>Start Date</Table.HeaderCell>
                                    <Table.HeaderCell>End Date</Table.HeaderCell>
                                    <Table.HeaderCell>Member Only</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {RegisteredClasses}
                            </Table.Body>
                        </>
                    }
                </Table>
            </>
        );
    }
}
    export default ClassesTable;
