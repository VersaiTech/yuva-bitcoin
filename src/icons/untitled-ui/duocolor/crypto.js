// icon:gold | Material Design Icons https://materialdesignicons.com/ | Austin Andrews
import * as React from "react";
import Grid from '@mui/material/Grid'

function CryptoIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="#ffffff"
      height="1.4em"
      width="1.4em"
      {...props}
    >
      <path d="M1 22l1.5-5h7l1.5 5H1m12 0l1.5-5h7l1.5 5H13m-7-7l1.5-5h7l1.5 5H6m17-8.95l-3.86 1.09L18.05 11l-1.09-3.86-3.86-1.09 3.86-1.09 1.09-3.86 1.09 3.86L23 6.05z" />
    </svg>
  );
}

export default CryptoIcon;
