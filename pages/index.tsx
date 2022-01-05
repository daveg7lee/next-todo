import { NextPage } from 'next';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const index: NextPage = () => {
  return (
    <Container>
      <h1>hello Styled-Components</h1>
      <h2>hello Styled-Components</h2>
      <p>hello Styled-Components</p>
      <ul>
        <li>hello Styled-Components</li>
      </ul>
      <a>hello Styled-Components</a>
      <span>hello Styled-Components</span>
    </Container>
  );
};

export default index;
