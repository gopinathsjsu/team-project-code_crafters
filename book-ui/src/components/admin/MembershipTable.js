import React from 'react'
import { Button, Form, Grid, Image, Input, Table } from 'semantic-ui-react'
import MembershipForm from "./MemebrshipForm";

function MembershipTable({ memberships, handleDeleteMembership, membershipTitle,membershipDescription, bookTextSearch, handleInputChange, handleAddMembership, handleDeleteBook, handleSearchBook,month,isForMember }) {
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
              onClick={() => handleDeleteMembership(membership.id)}
            />
          </Table.Cell>
          {/*<Table.Cell>*/}
          {/*  <Image src={`http://covers.openlibrary.org/b/isbn/${membership.id}-M.jpg`} size='tiny' bordered rounded />*/}
          {/*</Table.Cell>*/}
          <Table.Cell>{membership.id}</Table.Cell>
          <Table.Cell>{membership.title}</Table.Cell>
          <Table.Cell>{membership.description}</Table.Cell>
            <Table.Cell>{membership.month}</Table.Cell>
            <Table.Cell>{membership.isMember ? "Yes" : "No"}</Table.Cell>
        </Table.Row>
      )
    })
  }

  return (
    <>
      <Grid stackable divided>
        <Grid.Row columns='2'>
          <Grid.Column width='4'>
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
          <Grid.Column width='20'>
            <MembershipForm
              membershipTitle={membershipTitle}
              membershipDescription={membershipDescription}
              handleInputChange={handleInputChange}
              handleAddMembership={handleAddMembership}
              month={month}
              isForMember={isForMember}

            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Table compact striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}/>
            {/*<Table.HeaderCell width={2}>Image</Table.HeaderCell>*/}
            <Table.HeaderCell width={1}>Id</Table.HeaderCell>
            <Table.HeaderCell width={4}>Title</Table.HeaderCell>
              <Table.HeaderCell width={7}>Description</Table.HeaderCell>
              <Table.HeaderCell width={1}>Length (Month)</Table.HeaderCell>
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


//Refactored code
// function MembershipTable({
//                              memberships,
//                              handleDeleteMembership,
//                              membershipTitle,
//                              membershipDescription,
//                              bookTextSearch,
//                              handleInputChange,
//                              handleAddMembership,
//                              handleDeleteBook,
//                              handleSearchBook,
//                              month,
//                              isForMember
//                          }) {
//     const renderMembershipList = () => {
//         if (memberships.length === 0) {
//             return (
//                 <Table.Row key='no-book'>
//                     <Table.Cell collapsing textAlign='center' colSpan='4'>
//                         No Memberships
//                     </Table.Cell>
//                 </Table.Row>
//             );
//         }
//
//         return memberships.map((membership) => (
//             <Table.Row key={membership.id}>
//                 <Table.Cell collapsing>
//                     <Button
//                         circular
//                         color='red'
//                         size='small'
//                         icon='trash'
//                         onClick={() => handleDeleteMembership(membership.id)}
//                     />
//                 </Table.Cell>
//                 {/*<Table.Cell>*/}
//                 {/*  <Image src={`http://covers.openlibrary.org/b/isbn/${membership.id}-M.jpg`} size='tiny' bordered rounded />*/}
//                 {/*</Table.Cell>*/}
//                 <Table.Cell>{membership.id}</Table.Cell>
//                 <Table.Cell>{membership.title}</Table.Cell>
//                 <Table.Cell>{membership.description}</Table.Cell>
//                 <Table.Cell>{membership.month}</Table.Cell>
//                 <Table.Cell>{membership.isMember ? "Yes" : "No"}</Table.Cell>
//             </Table.Row>
//         ));
// {/*</Table.Cell>*/}
//                 <Table.Cell>{membership.id}</Table.Cell>
//                 <Table.Cell>{membership.title}</Table.Cell>
//                 <Table.Cell>{membership.description}</Table.Cell>
//                 <Table.Cell>{membership.month}</Table.Cell>
//                 <Table.Cell>{membership.isMember ? "Yes" : "No"}</Table.Cell>
//     };
//
//     return (
//         <>
//             <Grid stackable divided>
//                 <Grid.Row columns={2}>
//                     <Grid.Column width={4}>
//                         <Form onSubmit={handleSearchBook}>
//                             <Input
// }

export default MembershipTable