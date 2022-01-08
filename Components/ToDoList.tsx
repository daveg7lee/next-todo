import { useCallback, useMemo, useState } from 'react';
import { BsTrashFill, BsCheckLg } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { checkTodoAPI, deleteTodoAPI } from '../lib/api/todo';
import { todoActions } from '../store/todo';
import palette from '../styles/palette';

const Container = styled.div`
  width: 100%;
`;

const Header = styled.div`
  padding: 12px;
  position: relative;
  border-bottom: 1px solid ${palette.gray};

  .list-header-colors {
    display: flex;
    .list-header-color-num {
      display: flex;
      margin-right: 8px;
      p {
        font-size: 14px;
        line-height: 16px;
        margin: 0;
        margin-left: 6px;
      }
    }
    .list-header-round-color {
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }
  }
`;

const LastToDo = styled.p`
  font-size: 14px;
  margin: 0 0 8px;
  span {
    margin-left: 12px;
  }
`;

const List = styled.ul``;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 52px;
  border-bottom: 1px solid ${palette.gray};

  .left-side {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    .color-block {
      width: 12px;
      height: 100%;
    }

    .checked-text {
      color: ${palette.gray};
      text-decoration: line-through;
    }

    .text {
      margin-left: 12px;
      font-size: 16px;
    }
  }

  .right-side {
    display: flex;
    margin-right: 12px;

    svg {
      cursor: pointer;
      &:first-child {
        margin-right: 16px;
      }
    }
    .trash-can {
      width: 16px;
      path {
        fill: ${palette.deep_red};
      }
    }

    .check-mark {
      fill: ${palette.deep_green};
    }

    .button {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid ${palette.gray};
      background-color: transparent;
      outline: none;
      cursor: pointer;
    }
  }
`;

const ToDoList = () => {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  const getTodoColorNums = useCallback(() => {
    let red = 0;
    let orange = 0;
    let yellow = 0;
    let green = 0;
    let blue = 0;
    let navy = 0;

    todos.forEach((todo) => {
      switch (todo.color) {
        case 'red':
          red += 1;
          break;
        case 'orange':
          orange += 1;
          break;
        case 'yellow':
          yellow += 1;
          break;
        case 'green':
          green += 1;
          break;
        case 'blue':
          blue += 1;
          break;
        case 'navy':
          navy += 1;
          break;
        default:
          break;
      }
    });

    return {
      red,
      orange,
      yellow,
      green,
      blue,
      navy,
    };
  }, [todos]);

  const todoColorNums = useMemo(getTodoColorNums, [todos]);

  const checkTodo = async (id: number) => {
    try {
      await checkTodoAPI(id);
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      });
      dispatch(todoActions.setTodo(newTodos));
    } catch (e) {
      console.log(e);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await deleteTodoAPI(id);
      const newTodos = todos.filter((todo) => todo.id !== id);
      dispatch(todoActions.setTodo(newTodos));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Header>
        <LastToDo>
          남은 TODO<span>{todos.length}개</span>
        </LastToDo>
        <div className="list-header-colors">
          {Object.keys(todoColorNums).map((color, index) => (
            <div className="list-header-color-num" key={index}>
              <div className={`list-header-round-color bg-${color}`} />
              <p>{todoColorNums[color]}개</p>
            </div>
          ))}
        </div>
      </Header>
      <List>
        {todos.map((todo) => (
          <Item key={todo.id}>
            <div className="left-side">
              <div className={`color-block bg-${todo.color}`} />
              <p className={`text ${todo.checked && 'checked-text'}`}>
                {todo.text}
              </p>
            </div>
            <div className="right-side">
              {todo.checked ? (
                <>
                  <BsTrashFill
                    className="trash-can"
                    onClick={() => {
                      deleteTodo(todo.id);
                    }}
                  />
                  <BsCheckLg
                    className="check-mark"
                    onClick={() => {
                      checkTodo(todo.id);
                    }}
                  />
                </>
              ) : (
                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    checkTodo(todo.id);
                  }}
                />
              )}
            </div>
          </Item>
        ))}
      </List>
    </Container>
  );
};

export default ToDoList;
