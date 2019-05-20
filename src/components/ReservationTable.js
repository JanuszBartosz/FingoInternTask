import React from 'react';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import { TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';
import ReserveDialog from './ReserveDialog';
import DetailsDialog from './DetailsDialog';
import TableButton from './TableButton';

class ReservationTable extends React.Component {
  
  state = {
    openDetails: false,
    openReserve: false,
    reservation: {}
  };

  openDialog = () => {
    console.log(this.state.reservation)
    if (this.state.reservation === {} || this.state.reservation === undefined) {
      this.setState({ openReserve: true }); 
    } else {
      this.setState({ openDetails: true }); 
    }
  }

  closeDialog = () => {
    this.setState({
      openDetails: false,
      openReserve: false
    })
    // TODO: functional setState()
    this.state.reservation = {};
  }

  setChosenRes = (res) => {    
    // TODO: functional setState()
    this.state.reservation = res;
    this.openDialog()
  }

  setStyle = (taken) => {
    return {
      disabled: true,
      backgroundColor: taken ? red : green
    }
  }

  render() {
    const openHours = this.props.openHours;
    const courts = this.props.courts;
    const reservations = this.props.reservations;

    console.log(courts);

    return (
      <Paper style={{overflow: 'auto'}}>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell>Hours</CustomTableCell>
              {courts.map((court) => (
                <CustomTableCell align="center" key={court.id}> {court.name}</CustomTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {openHours.map((openHour) => (
              <TableRow key={openHour.id}>
                <CustomTableCell>{openHour.interval}</CustomTableCell>
                {courts.map((court) => {
                  let res = reservations[court.id - 1].find((e) => e.hour === openHour.id);
                  let taken = (res != null) ? true : false
                  return (
                    <CustomTableCell key={court.id}>
                      <TableButton 
                        reservation={res} 
                        setChosenRes={this.setChosenRes} 
                        child={ taken ? "taken" : "free" }>
                      </TableButton>
                    </CustomTableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <ReserveDialog 
          show = {this.state.openReserve}
          onClose = {this.closeDialog}
          onSubmit = {this.closeDialog}
        />

        <DetailsDialog
          show = {this.state.openDetails}
          onClose = {this.closeDialog}
          reservation = {this.state.reservation}
        />
      </Paper>

    );
  }
}

const CustomTableCell = withStyles(theme => ({
  head: {
    fontWeight: 'bold',
    fontSize: 13,
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14
  },
}))(TableCell);


export default (ReservationTable);