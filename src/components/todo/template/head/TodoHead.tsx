import React from "react";
import styled from "styled-components";
import moment from "moment";

const TodoHead = () => {
  //@TODO 현재 시간을 표시해야합니다.
  const currentDate = moment().format("LL");
  const dayOfWeek = moment().format("dddd");

  const dayString = dayOfWeek;
  const dateString = currentDate;

  return (
    <TodoHeadBlock>
      <DayText>{dayString}</DayText>
      <DateText>{dateString}</DateText>
    </TodoHeadBlock>
  );
};

const TodoHeadBlock = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 52px;
  padding-bottom: 24px;
  border-bottom: 3px solid #33bb77;
`;

const DateText = styled.div`
  font-size: 26px;
  color: #119955;
  padding-left: 10px;
`;

const DayText = styled.div`
  font-size: 22px;
  color: #119955;
  padding-top: 5px;
`;

export default React.memo(TodoHead);
