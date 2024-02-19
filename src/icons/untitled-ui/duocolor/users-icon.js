const UsersIcon = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        fill="currentColor"
        d="M17.5 16.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 21.5v-2a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2M6 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM18 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM12 15a9 9 0 0 1 9 9"
      />
    </svg>
  );
  
  export default UsersIcon;
  