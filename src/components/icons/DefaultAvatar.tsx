import React from "react";

const DefaultAvatar = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 12c-3.866 0-7 1.493-7 3.5V20h14v-2.5c0-2.007-3.134-3.5-7-3.5z" />
    </svg>
  );
};

export default DefaultAvatar;
