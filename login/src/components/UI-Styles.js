import styled from '@emotion/styled';

export const Button = styled.button`
  border: none;
  margin: 0;
  padding: 0;
  font-size: 100%;
  font: inherit;
  color: inherit;
  vertical-align: baseline;
  overflow: visible;
  background: transparent;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;
  cursor: pointer;
  text-align: center;
  margin: 0 auto;
  line-height: 2rem;
  border-radius: 8px;
  padding: 0.5rem;
  font-size: 2rem;
  color: white;
  background-image: linear-gradient(
    45deg,
    rgb(11, 140, 229) 0%,
    rgb(11, 140, 229) 16.667%,
    rgb(36, 162, 230) 16.667%,
    rgb(36, 162, 230) 33.334%,
    rgb(62, 184, 232) 33.334%,
    rgb(62, 184, 232) 50.001000000000005%,
    rgb(87, 207, 233) 50.001%,
    rgb(87, 207, 233) 66.668%,
    rgb(113, 229, 235) 66.668%,
    rgb(113, 229, 235) 83.33500000000001%,
    rgb(138, 251, 236) 83.335%,
    rgb(138, 251, 236) 100.002%
  );
  background-size: 300%;
  background-position: left;
  transition: background-position 1s;
  box-shadow: 2px 6px 8px 0 rgba(73, 34, 34, 0.35),
    2px 6px 12px 0 rgba(0, 0, 0, 0.4);
  width: 300px;
  font-weight: bold;
  &:hover,
  &:focus {
    background-position: right;
    text-decoration: none;
  }
`;
