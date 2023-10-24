import React, { useEffect, useState } from "react";

const Clock = () => {
  // Clock
  const [clock, setClock] = useState(0);

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClock(date.toLocaleTimeString());
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="w-1/2 font-mono font-thin text-5xl text-center mt-4">
        Current Time
      </div>
      <div className="w-1/2">
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">{clock}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clock;
