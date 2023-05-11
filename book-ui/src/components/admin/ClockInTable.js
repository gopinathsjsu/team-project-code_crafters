import React from 'react'
import { Button, Form, Grid, Image, Input, Table } from 'semantic-ui-react'
import BookForm from './BookForm'

function ClockInTable({ clockInData,handleGetClockInData}) {
  let bookList
  if (clockInData.length === 0) {
    bookList = (
      <Table.Row key='no-book'>
        <Table.Cell collapsing textAlign='center' colSpan='4'>No data</Table.Cell>
      </Table.Row>
    )
  } else {
    bookList = clockInData.map(book => {
      return (
        <Table.Row key={book.isbn}>
          <Table.Cell>{book.id}</Table.Cell>
            <Table.Cell>{book.userName}</Table.Cell>
          <Table.Cell>{new Date(book.clockIn).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Table.Cell>
          <Table.Cell>{book.clockOut ? new Date(book.clockOut).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '-'}
              </Table.Cell>
        </Table.Row>
      )
    })
  }

  return (
    <>
      <Grid stackable divided>
      </Grid>
      <Table compact striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}/>
            <Table.HeaderCell width={4}>Member Name</Table.HeaderCell>
            <Table.HeaderCell width={5}>Clock In Time</Table.HeaderCell>
            <Table.HeaderCell width={5}>Clock Out Time</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {bookList}
        </Table.Body>
      </Table>
    </>
  )
}

export default ClockInTable