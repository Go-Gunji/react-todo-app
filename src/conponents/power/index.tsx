import { useState } from "react";

type Props = {
  name: string;
};

export const Power = (props: Props) => {
  const [power, setPower] = useState(false);
  const nomalStyle = "bg-sky-500";
  const disabledStyle = "bg-gray-500/10";
  return (
    <div style={{ margin: "2em" }}>
      <h1 className="text-xl">
        {props.name} {power ? "ON" : "OFF"}{" "}
      </h1>
      <button
        className={power ? disabledStyle : nomalStyle}
        onClick={() => setPower(true)}
        disabled={power ? true : false}
      >
        ON
      </button>
      <button
        className={power ? nomalStyle : disabledStyle}
        onClick={() => setPower(false)}
        disabled={!power ? true : false}
      >
        OFF
      </button>
    </div>
  );
};

export default Power;
