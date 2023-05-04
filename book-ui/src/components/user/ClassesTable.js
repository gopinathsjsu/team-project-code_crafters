import React from 'react'
import { Button, Form, Grid, Input, Table } from 'semantic-ui-react'
import ClassesForm from "./ClassesForm";
import AuthContext from "../context/AuthContext";



function ClassesTable({ classes, classesTitle, classesDescription, bookTextSearch, handleInputChange, handleAddClasses, handleAddRegisteredClasses, handleSearchBook, isClassForMember, handleDeleteClasses, instructors, instructorIdForClassCreate, printRegisteredClasses }) {
    let membershipList;

    let registeredClassesIds = printRegisteredClasses.map(rc => rc.classes_id);
    if (classes.length === 0) {
        membershipList = (
            <Table.Row key='no-classes'>
                <Table.Cell collapsing textAlign='center' colSpan='4'>No Classes</Table.Cell>
            </Table.Row>
        );
    } else {
        membershipList = classes.map(membership => {
            if (registeredClassesIds.includes(membership.id)) {
                return null; // skip this class as it is already registered by the user
            }


            return (

                <Table.Row key={membership.id}>
                    <Table.Cell collapsing>
                        <Button
                            circle
                            color='white'
                            size='small'
                            icon='tick'
                            onClick={handleAddRegisteredClasses.bind(this, membership)
                            }
                        />
                    </Table.Cell>
                    <Table.Cell>{membership.id}</Table.Cell>
                    <Table.Cell>{membership.title}</Table.Cell>
                    <Table.Cell>{membership.description}</Table.Cell>

                    <Table.Cell>{membership.isForMember ? "Yes" : "No"}</Table.Cell>

                </Table.Row>
            );
        });

        let RegisteredClasses;

        console.log(printRegisteredClasses)
        if (printRegisteredClasses.length === 0) {
            membershipList = (
                <Table.Row key='no-classes'>
                    <Table.Cell collapsing textAlign='center' colSpan='4'>No Classes</Table.Cell>
                </Table.Row>
            );
        } else {
            console.log(printRegisteredClasses)
            RegisteredClasses = printRegisteredClasses.map(registeredClasses => {

                return (

                        <Table.Row key={registeredClasses.id}>
                            <Table.Cell collapsing>
                                <Button
                                    circular
                                    color='red'
                                    size='small'
                                    icon='trash'
                                    onClick={handleAddRegisteredClasses.bind(this, RegisteredClasses)
                                    }
                                />
                            </Table.Cell>

                        <Table.Cell>{registeredClasses.classes_id}</Table.Cell>
                        <Table.Cell>{registeredClasses.title}</Table.Cell>
                        <Table.Cell>{registeredClasses.description}</Table.Cell>

                        <Table.Cell>Yes</Table.Cell>


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
                            <Table.HeaderCell colSpan={6}>Available Classes</Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>

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
                                    <Table.HeaderCell colSpan={6}>Registered Classes</Table.HeaderCell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell>Id</Table.HeaderCell>
                                    <Table.HeaderCell>Title</Table.HeaderCell>
                                    <Table.HeaderCell>Description</Table.HeaderCell>

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
