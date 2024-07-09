import { NextRouter, useRouter } from "next/router";

type NavbarDetailProps = {
  params: {
    id: string;
  };
};

const NavbarDetail: React.FC<NavbarDetailProps> = ({ params }) => {
  return (
    <div>
      NavbarDetail
      <p>{params.id}</p>
    </div>
  );
};

export default NavbarDetail;
