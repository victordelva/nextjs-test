import React from 'react';
import {Table} from "flowbite-react";

export type GTableProps = { headers: Array<string>; rows: Array<Array<any>> }

function GTable({ headers, rows }: GTableProps) {
  return (
    <>
      <Table>
        <Table.Head>
          {headers.map((header, index) => (
            <Table.HeadCell key={index}>
              {header.toUpperCase()}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body>
          {rows.map((row, rowIndex) => (
            <Table.Row key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <Table.Cell key={`${cellIndex}:${rowIndex}`} className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {cell}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>

      </Table>
      </>
  );
}

export default GTable;
