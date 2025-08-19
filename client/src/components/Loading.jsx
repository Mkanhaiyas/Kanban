import { PulseLoader } from "react-spinners";

const Loading = () => {
  return (
    <div>
      <PulseLoader loading={true} size={9} color="#fff" />
    </div>
  );
};

export default Loading;
