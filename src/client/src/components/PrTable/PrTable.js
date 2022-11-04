import "./PrTable.css";
import React, { useEffect, useState } from "react";
import { Table, Header, Button } from "semantic-ui-react";
import axios from "axios";
import ImageModal from "./ImageModal/ImageModal";

const TableExamplePagination = () => {
  const [prs, setPrs] = useState([]);
  const [prIdImageModal, setPrIdImageModalOpen] = useState(false);

  // get data
  const getData = async () => {
    const res = await axios.get("http://localhost:8000/api");
    setPrs(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const renderRow = () => {
    return prs.map((pr) => {
      return (
        <Table.Row key={pr._id}>
          <Table.Cell>{pr._id}</Table.Cell>
          <Table.Cell>{pr.html_url}</Table.Cell>
          <Table.Cell>{pr.state}</Table.Cell>
          <Table.Cell>{pr.title}</Table.Cell>
          <Table.Cell>{pr.created_at}</Table.Cell>
          <Table.Cell>{pr.closed_at || "none"}</Table.Cell>
          <Table.Cell>{pr.merged_at || "none"}</Table.Cell>
          <Table.Cell id="table-button">
            {
              <Button
                primary
                onClick={() => {
                  setPrIdImageModalOpen(pr._id);
                }}
              >
                Display Image
              </Button>
            }
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  return (
    <div className="table-container">
      <Header
        id="header"
        as="h2"
        icon="setting"
        content="Github logs - Pull request"
      />

      <Table celled striped textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell >PR ID</Table.HeaderCell>
            <Table.HeaderCell>Url</Table.HeaderCell>
            <Table.HeaderCell>Pr State</Table.HeaderCell>
            <Table.HeaderCell>Pr Title</Table.HeaderCell>
            <Table.HeaderCell>Created date</Table.HeaderCell>
            <Table.HeaderCell>Closed date</Table.HeaderCell>
            <Table.HeaderCell>Merged date</Table.HeaderCell>
            <Table.HeaderCell>Image</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{renderRow()}</Table.Body>
      </Table>

      {/* Image Modal */}
      <ImageModal
        prIdImageModal={prIdImageModal}
        setPrIdImageModalOpen={setPrIdImageModalOpen}
      />
    </div>
  );
};

export default TableExamplePagination;
