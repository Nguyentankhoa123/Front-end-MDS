import Loader from "public/loading.svg";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white shadow-lg h-[100px] w-[100px]  flex items-center justify-center rounded-md overflow-hidden">
        <Image src={Loader} alt="Loading..." className="w-full h-full" />
      </div>
    </div>
  );
};

export default Loading;
