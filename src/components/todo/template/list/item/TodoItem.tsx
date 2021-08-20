import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Modal } from "antd";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { Itodo } from "components/todo/TodoService";

interface TodoItemProps {
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  todo: Itodo;
}

const TodoItem = ({ toggleTodo, removeTodo, todo }: TodoItemProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleToggle = () => {
    return toggleTodo(todo.id);
  };

  const handleRemove = () => {
    !todo.done ? setIsModalVisible(true) : removeTodo(todo.id);
  };

  const handleModalOk = () => {
    removeTodo(todo.id);
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <TodoItemBlock>
      <CheckCircle done={todo.done} onClick={handleToggle}>
        {todo.done && <CheckOutlined />}
      </CheckCircle>
      <Text done={todo.done}>{todo.text}</Text>
      <DueDate done={todo.done}>{todo.dueDate}</DueDate>
      <Remove onClick={handleRemove}>
        <DeleteOutlined />
      </Remove>
      <Modal
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="삭제"
        cancelText="취소"
        okButtonProps={{ danger: true }}
        centered={true}
        width="300px"
        bodyStyle={{ textAlign: "center" }}>
        <span>
          아직 완료하지 않은 항목입니다! <br />
          그래도 삭제하시겠습니까?
        </span>
      </Modal>
    </TodoItemBlock>
  );
};

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #119955;
  font-size: 16px;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div<{ done: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 16px;
  border: 1px solid #33bb77;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #dddddd;
      color: #dddddd;
    `}
`;

const Text = styled.div<{ done: boolean }>`
  flex: 1;
  font-size: 16px;
  color: #119955;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;

const DueDate = styled.div<{ done: boolean }>`
  margin-right: 30px;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;

export default React.memo(TodoItem);
