
const PendingWithdrawalIcon = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M9 12h6m-3-4v6"
      />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" />
    </svg>
  );
  
  export default PendingWithdrawalIcon;
  