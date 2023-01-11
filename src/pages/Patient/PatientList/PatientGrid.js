import React, { useState } from "react";
import { Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap";
// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next";

import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";

import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

import { Link } from "react-router-dom";

import "./datatables.scss";

const PatientGrid = (props) => {
  console.log({ props });
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);

  const columns = [
    // {
    //   dataField: "id",
    //   text: "Id",
    //   sort: true,
    // },
    {
      dataField: "firstname",
      text: "First Name",
      sort: true,
    },
    {
      dataField: "lastname",
      text: "Last Name",
      sort: true,
    },
    {
      dataField: "personalMobile",
      text: "Mobile Number",
      sort: true,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "ss",
      text: "SS#",
      sort: true,
    },
    {
      dataField: "city",
      text: "City",
      sort: true,
    },
    {
      dataField: "state",
      text: "State",
      sort: true,
    },

    {
      dataField: "createdDate",
      text: "Created Date",
      sort: true,
    },
  ];

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  const pageOptions = {
    sizePerPage: 10,
    totalSize: props.productData.length, // replace later with size(customers),
    custom: true,
  };

  // Custom Pagination Toggle
  const sizePerPageList = [
    { text: "5", value: 5 },
    { text: "10", value: 10 },
    { text: "15", value: 15 },
    { text: "20", value: 20 },
    { text: "25", value: 25 },
    { text: "All", value: props.productData.length },
  ];

  // Select All Button operation
  const selectRow = {
    mode: "checkbox",
  };

  const { SearchBar } = Search;

  return (
    <div>
      <Row>
        <Col className="col-12">
          <Card>
            <CardBody>
              <CardTitle className="h4">Patient list </CardTitle>
              {/* <p className="card-title-desc">
                react-bootstrap-table-next plugin has most features enabled by
                default, so all you need to do to use it with your own tables is
                to call the construction function:{" "}
                <code>react-bootstrap-table-next </code>.
              </p> */}

              <PaginationProvider
                pagination={paginationFactory(pageOptions)}
                keyField="id"
                columns={columns}
                data={props.productData}
              >
                {({ paginationProps, paginationTableProps }) => (
                  <ToolkitProvider
                    keyField="id"
                    columns={columns}
                    data={props.productData}
                    search
                  >
                    {(toolkitProps) => (
                      <React.Fragment>
                        <Row className="mb-2">
                          <Col md="4">
                            <div className="search-box me-2 mb-2 d-inline-block">
                              <div className="position-relative">
                                <SearchBar {...toolkitProps.searchProps} />
                                <i className="bx bx-search-alt search-icon" />
                              </div>
                            </div>
                          </Col>
                          <Col md="8">
                            <div className="float-end">
                              <button type="button" className="btn btn-success">
                                <i className="mdi mdi-pencil"></i>
                                Edit
                              </button>
                              <Link to="/patient/create">
                                <Button color="primary" className="ms-1">
                                  Create Patient
                                </Button>
                              </Link>
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col xl="12">
                            <div className="table-responsive">
                              <BootstrapTable
                                keyField={"id"}
                                responsive
                                bordered={false}
                                striped={false}
                                defaultSorted={defaultSorted}
                                selectRow={selectRow}
                                classes={"table align-middle table-nowrap"}
                                headerWrapperClasses={"thead-light"}
                                {...toolkitProps.baseProps}
                                {...paginationTableProps}
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row className="align-items-md-center mt-30">
                          <Col className="inner-custom-pagination d-flex">
                            <div className="d-inline">
                              <SizePerPageDropdownStandalone
                                {...paginationProps}
                              />
                            </div>
                            <div className="text-md-right ms-auto">
                              <PaginationListStandalone {...paginationProps} />
                            </div>
                          </Col>
                        </Row>
                      </React.Fragment>
                    )}
                  </ToolkitProvider>
                )}
              </PaginationProvider>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PatientGrid;
