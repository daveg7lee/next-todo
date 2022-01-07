import { FC } from 'react';
import styled from 'styled-components';
import { RiBrush2Fill } from 'react-icons/ri';
import { useState } from 'react';
import palette from '../styles/palette';
import { ToDoType } from '../types/todo';
import { addTodoAPI } from '../lib/api/todo';
import { useRouter } from 'next/router';

const Container = styled.div`
  padding: 16px;
  textarea {
    width: 100%;
    border-radius: 5px;
    height: 300px;
    border-color: ${palette.gray};
    margin-top: 12px;
    resize: none;
    outline: none;
    padding: 12px;
    font-size: 16px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  font-size: 21px;
`;

const SubmitBtn = styled.button`
  padding: 4px 8px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;
  outline: none;
  font-size: 14px;
  cursor: pointer;
`;

const ColorWrapper = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
`;

const ColorList = styled.div`
  display: flex;
  .selected-color {
    border: 2px solid ${palette.gray} !important;
  }
`;

const ColorBtn = styled.button`
  cursor: pointer;
  width: 24px;
  height: 24px;
  margin-right: 16px;
  border: 0;
  outline: 0;
  border-radius: 50%;
  &:last-child {
    margin: 0;
  }
`;

const AddTodo: FC = () => {
  const router = useRouter();
  const [text, setText] = useState('');
  const [selectedColor, setSelectedColor] = useState<ToDoType['color']>();
  const addTodo = async () => {
    try {
      if (!text || !selectedColor) {
        alert('색상과 할 일을 입력해주세요');
        return;
      }
      await addTodoAPI({ text, color: selectedColor });
      router.push('/');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container>
      <Header>
        <HeaderTitle>Add Todo</HeaderTitle>
        <SubmitBtn type="button" onClick={addTodo}>
          추가하기
        </SubmitBtn>
      </Header>
      <ColorWrapper>
        <ColorList>
          {['red', 'orange', 'yellow', 'green', 'blue', 'navy'].map(
            (color, index) => (
              <ColorBtn
                key={index}
                type="button"
                className={`bg-${color} ${
                  color === selectedColor && 'selected-color'
                }`}
                onClick={() => setSelectedColor(color as ToDoType['color'])}
              />
            )
          )}
        </ColorList>
        <RiBrush2Fill size="24px" />
      </ColorWrapper>
      <textarea
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        placeholder="할 일을 입력해주세요"
      />
    </Container>
  );
};

export default AddTodo;
