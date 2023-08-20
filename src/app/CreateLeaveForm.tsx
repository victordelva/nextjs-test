// ProductDrawer.js
import React, {useState} from 'react';
import {Button, Label, Select, TextInput} from 'flowbite-react';
import Datepicker from "tailwind-datepicker-react"
import {LeaveType, LeaveTypeEnum} from "@/domain/entities/LeaveType";


const CreateLeaveForm = ({onClose}: {onClose: Function}) => {
  const today = new Date();
  today.setHours(0,0,0,0);
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [leaveType, setLeaveType] = useState(LeaveTypeEnum.LEAVE);
  const handleSubmit = () => {
    if (validateForm()) {
      fetch('/api/leaves', {
        method: 'POST',
        body: JSON.stringify({
          startDate: startDate,
          endDate: endDate,
          leaveType: leaveType,
          durationDays: calculateDays(startDate, endDate),
        }),
      }).then((response: Response) => {
        if(response.status !== 201) {
          response.json().then((message) =>
            alert(`Failed to create leave: ${message['message']}`));
        } else {
          setStartDate(today);
          setEndDate(today);
          onClose();
        }
      }).catch((error) => {
        alert(`Failed to create leave: ${error.message}`);
      });
    }
  };

  const validateForm = () => {
    if (startDate > endDate) {
       alert("Invalid date range. Check if start date is before end date.");
       return false;
    } else if (startDate < today || endDate < today) {
      alert("Invalid date range. Check if start date and end date are in the future.");
      return false
    } else {
      return true;
    }
  };

  const calculateDays = (startDate: Date | null, endDate: Date | null) => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
    return 0;
  };

  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="startDate"
            value="Start Date"
          />
        </div>
        <Datepicker
          options={{defaultDate: today}}
          onChange={setStartDate}
          show={showStart}
          setShow={setShowStart}
        />
        <div className="mb-2 block">
          <Label
            htmlFor="endDate"
            value="End Date"
          />
        </div>
        <Datepicker
          options={{defaultDate: today}}
          onChange={setEndDate}
          show={showEnd}
          setShow={setShowEnd}
        />
        <div className="mb-2 block">
          <Label
            htmlFor="Days"
            value="Days"
          />
        </div>
        <TextInput
          disabled={true}
          value={calculateDays(startDate, endDate)}
        ></TextInput>
        <div className="mb-2 block">
          <Label
            htmlFor="Type"
            value="Leave Type"
          />
        </div>
        <Select
          id="types"
          required
          onChange={(e) => setLeaveType(e.target.value as LeaveType)}
        >
          {Object.values(LeaveTypeEnum).map((type: string, index) => (<option key={index}>{type}</option>))}
        </Select>
      </div>
      <div className="flex flex-row space-x-2">
        <Button onClick={() => {
          handleSubmit();
        }} >Save</Button>
        <Button  onClick={() => onClose()} >Cancel</Button>
      </div>
    </form>
  );
};

export default CreateLeaveForm;
