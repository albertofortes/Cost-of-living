import react from 'react'

import { Box, styled } from '@mui/system'

const CustomizedBox = styled(Box)`
  padding: 10px;
  border-radius: 5px;  
  background-color: #043346;
  font-size: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  margin-bottom: .5em;
  text-align: center;

  @media (min-width: 960px) {
    width: 250px;
    height: 200px;
    margin-bottom: 2em;
  }
`;

type Props = {
  ChildComp: any
}

// FC always implies children and report error
const BoxHoc = (ChildComp: any) => {
  const ComponentWrapped = (props: any) => {
    return (
      <CustomizedBox>        
        <ChildComp {...props} />
      </CustomizedBox>
    )
  };
  return ComponentWrapped;
}

export default BoxHoc