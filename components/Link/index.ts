import styled from "styled-components";

import Link from 'next/link';

export const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  text-decoration: none;
  color: ${({ theme }) => theme.colors?.primaryBlack};
  align-items: center;
`;