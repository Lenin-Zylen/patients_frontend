import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Col, Row } from "reactstrap";

const BreadCrumbs = (props) => {
  return (
    <div>
      <Row>
        <Col xs="12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-0 font-size-18">{props.breadcrumbItem}</h4>
            <div className="page-title-right">
              <Breadcrumb listClassName="m-0">
                <BreadcrumbItem>
                  <Link to="#">{props.title}</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <Link to="#">{props.breadcrumbItem}</Link>
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BreadCrumbs;
