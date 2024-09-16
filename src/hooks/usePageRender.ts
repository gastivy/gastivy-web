import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const usePageRender = () => {
  const router = useRouter();
  const [isReadyMounted, setIsReadyMounted] = useState(false);

  useEffect(() => {
    setIsReadyMounted(router.isReady);
  }, [router]);

  return { isReadyMounted };
};

export default usePageRender;
