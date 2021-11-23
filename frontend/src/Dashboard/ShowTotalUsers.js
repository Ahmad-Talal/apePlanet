import React, { useState, useEffect } from "react";
import { addDays } from "date-fns";
import CustomDatePicker from "./datepicker";
import { queryReport } from "./queryReport";
import {
  ChartTitle,
  ReportWrapper,
  Subtitle,
  DatepickerRow,
  StyledTable,
} from "./styles";

const ShowTotalUsers = (props) => {
  const [reportData, setReportData] = useState([]);
  const [startDate, setStartDate] = useState(addDays(new Date(), -7));
  const [endDate, setEndDate] = useState(new Date());
  const [totalPages, setTotalPages] = useState(0);
  const [arr,setArr] = useState([]);
  let  ret =[];
  const displayResults = (response) => {
    const queryResult = response.result.reports[0].data.rows;
    setTotalPages(queryResult.length);
    const total = response.result.reports[0].data.totals[0].values[0];
    let newReportData = [];
 
    queryResult.forEach((row, idx) => {
    
        let tempObj = {
          path: row.dimensions[0],
          views: row.metrics[0].values[0],
          perc: `${parseFloat((row.metrics[0].values[0] / total) * 100).toFixed(
            1
          )}%`,
        };
        //console.log("make sure  ",tempObj.views)
        setArr(oldArray =>[...oldArray,tempObj.views]);
        //console.log("hi raat he",arr[idx])
        newReportData.push(tempObj);
      
    });
    setReportData(newReportData);
  };

  let sum=0

  for (let i=0;i<arr.length;i++)
  {
        sum = sum + Number(arr[i])
        ret.push(sum)
  }

  useEffect(() => {
    const request = {
      viewID: props.viewID,
      startDate,
      endDate,
      metrics: "ga:users",
      dimensions: ["ga:date"],
    };
    setTimeout(
      () =>
        queryReport(request)
          .then((resp) => displayResults(resp))
          .catch((error) => console.error(error)),
      1000
    );
  }, [startDate, endDate]);
 

  return (
    <ReportWrapper>
      
      {reportData.length && (
        <StyledTable>
          <thead>
            <tr>
              Visitor
            </tr>
          </thead>
          <tbody>
            {reportData.map((row, id) => (
              <tr key={id}>
                <td>{ret[id]}</td>
              </tr>
            ))}
            <tr>
            </tr>
          </tbody>
        </StyledTable>
      )}
    </ReportWrapper>
  );
};

export default ShowTotalUsers;
