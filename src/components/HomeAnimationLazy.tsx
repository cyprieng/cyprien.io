import { Suspense, lazy, useEffect, useState } from "react";

const HomeAnimation = lazy(() => import("./HomeAnimation"));

const HomeAnimationLazy = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {!isMounted ? null : (
        <Suspense fallback={null}>
          <HomeAnimation />
        </Suspense>
      )}
    </>
  );
};

export default HomeAnimationLazy;
