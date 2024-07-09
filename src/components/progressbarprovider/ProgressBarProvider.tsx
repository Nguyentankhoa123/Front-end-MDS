"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="6px"
        color="#c3ff68"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default Providers;
