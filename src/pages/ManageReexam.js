import React, {useState, useEffect} from 'react'
import MaterialTable from 'material-table'
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default function ManageUsers() {

  const [columns, setColumns] = useState([
    { title: 'Date', field: 'date' },
    { title: 'Begin', field: 'begin'},
    { title: "Doctor name", field: 'doctorname'},
    { title: "Client name", field: 'username'},
    { title: 'Note', field: 'note'},
    { title: 'Status', field: 'status', lookup: { 0: 'Not examined yet', 1: 'Examined', 2: 'No comming', 3: 'Success' }},
  ]);

  const [data, setData] = useState([]);

  useEffect(() => {
      
      axios.get('http://localhost:8080/reexams/getallreexams')
      .then(res => {
        //   console.log(res.data);
          const dataFilter = res.data.map(dt => {
              return {
                  ...dt,
                  doctorname: dt.doctorId.fullname,
                  username : dt.userId.fullname,
                  date: (new Date(dt.date)).getDate() + '-' + ((new Date(dt.date)).getMonth()+1) + '-' + (new Date(dt.date)).getFullYear(),
                  begin: dt.begin + 'h'
              }
          })
         
          setData(dataFilter);
      })
  },[])

  return (
    <MaterialTable
      icons={tableIcons}
      title="Manage schedules"
      columns={columns}
      data={data}
    />
  )
}
