import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { route } from "@/constants/route";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    router.push(route.activityApp.home.path);
  }, []);
  return null;
};

export default Home;
