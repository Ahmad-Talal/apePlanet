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

const ShowTotalReserve = (props) => {
  const [reportData, setReportData] = useState([]);
  const [startDate, setStartDate] = useState(addDays(new Date(), - 7));
  const [endDate, setEndDate] = useState(new Date());
  const [totalPages, setTotalPages] = useState(0);

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
        newReportData.push(tempObj);
      
    });
    setReportData(newReportData);
  };

  useEffect(() => {
    const request = {
      viewID: props.viewID,
      startDate,
      endDate,
      metrics: "ga:goal2Completions",
      dimensions: ["ga:country"],
    };
    setTimeout(
      () =>
        queryReport(request)
          .then((resp) => displayResults(resp))
          .catch((error) => console.error(error)),
      8000
    );
  }, [startDate, endDate]);
 

  return (
    <ReportWrapper>
      {reportData.length && (
        <StyledTable>
          <thead>
            <tr>
              Total Reserve
            </tr>
          </thead>
          <tbody>
            {reportData.map((row, id) => (
              <tr style={{"background-color": "pink"}} key={id}>
                <td>{row.views}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      )}
    </ReportWrapper>
  );
};

export default ShowTotalReserve;
