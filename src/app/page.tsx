'use client';
import GTable from "@/app/components/GTable/GTable";
import {useEffect, useState} from "react";
import CreateLeaveForm from "@/app/CreateLeaveForm";
import {Button, Modal, Table} from "flowbite-react";

export default function Home() {
  const [leaves, setLeaves] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const headers = ['Start Date', 'End Date', 'Days', 'Leave Type'];
  const rows = leaves.map(leave => {
    return [
      leave['startDate'],
      leave['endDate'],
      leave['durationDays'],
      leave['leaveType'],
    ];
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/leaves');
        const leavesData = await response.json();
        setLeaves(leavesData);
      } catch (error) {
        console.error("Failed to fetch leaves:", error);
      }
    };

    fetchData();
  }, [isOpen]);

  return (
    <main className="min-h-screen">
      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>Create a Leave</Modal.Header>
        <Modal.Body>
          <CreateLeaveForm
            onClose={() => setIsOpen(false)}
          />
        </Modal.Body>
      </Modal>
      <div>
        <div className="flex justify-end p-4">
          <Button onClick={() => {
            setIsOpen(!isOpen);
          }}>Create Leave</Button>
        </div>
        <GTable headers={headers} rows={rows} />
      </div>
    </main>
  );
}


