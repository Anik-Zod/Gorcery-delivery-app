import React from "react";

function HeroOrbit({ children, size, rotation }) {
  return (
    <div className="absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-20 ">
      <div>
        <div>
          <div
            className=""
            style={{
              height: `${size}px`,
              width: `${size}px`,
              transform: `rotate(${rotation}deg)`,
            }}
          >
            <div className="border ">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroOrbit;
