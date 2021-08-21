import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { DatePicker, Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Itodo } from "components/todo/TodoService";
import { ALERT_MESSAGE } from "utils/constants";

interface TodoCreateProps {
  nextId: number;
  createTodo: (todo: Itodo) => void;
  incrementNextId: () => void;
}

const TodoCreate = ({ nextId, createTodo, incrementNextId }: TodoCreateProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [dueDateValue, setDueDateValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const disabledDate = (current: any) => {
    return current && current < moment().endOf("day").subtract(1, "d");
  };

  const handleDate = (date: any, dateString: any) => {
    setDueDateValue(dateString);
  };
  const handleToggle = () => setOpen(!open);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지

    if (!value) {
      setAlertMessage(ALERT_MESSAGE.INPUT_NULL);
      return setIsModalVisible(true);
    }

    const blankSpace = /^\s+|\s+$/g;
    if (value.replace(blankSpace, "") === "") {
      setAlertMessage(ALERT_MESSAGE.INPUT_SPACE);
      return setIsModalVisible(true);
    }

    if (!dueDateValue) {
      setAlertMessage(ALERT_MESSAGE.DATE_NULL);
      return setIsModalVisible(true);
    }

    createTodo({
      id: nextId,
      text: value,
      done: false,
      dueDate: dueDateValue,
    });
    incrementNextId(); // nextId 하나 증가

    setValue(""); // input 초기화
    setOpen(false); // open 닫기
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <InsertFormPositioner>
        <InsertForm onSubmit={handleSubmit}>
          <Input
            autoFocus
            placeholder="해야 할 일을 적어주세요 ✍"
            onChange={handleChange}
            value={value}
          />
          <DatePicker
            onChange={handleDate}
            disabledDate={disabledDate}
            placeholder="목표일 설정 🙌"
          />
          <CircleButton onClick={handleToggle} open={open}>
            <PlusCircleOutlined />
          </CircleButton>
          <Modal
            visible={isModalVisible}
            onOk={handleModalOk}
            onCancel={handleModalOk}
            cancelButtonProps={{ style: { display: "none" } }}
            okText="확인"
            centered={true}
            width="300px"
            bodyStyle={{ textAlign: "center" }}>
            <span>{alertMessage}</span>
          </Modal>
        </InsertForm>
      </InsertFormPositioner>
    </>
  );
};

const CircleButton = styled.button<{ open: boolean }>`
  background: #33bb77;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  left: 50%;
  transform: translate(50%, 0%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  border-bottom: 1px solid #eeeeee;
`;

const InsertForm = styled.form`
  display: flex;
  justify-content: center;
  background: #eeeeee;
  padding-left: 40px;
  padding-top: 36px;
  padding-right: 60px;
  padding-bottom: 36px;
`;

const Input = styled.input`
  margin-right: 20px;
  padding: 12px;
  border: 1px solid #dddddd;
  width: 70%;
  outline: none;
  font-size: 21px;
  box-sizing: border-box;
  color: #119955;
  &::placeholder {
    color: #dddddd;
    font-size: 16px;
  }
`;

export default React.memo(TodoCreate);
