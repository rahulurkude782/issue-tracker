import { Box } from "@radix-ui/themes";
import Skeleton from "@/app/components/Skeleton"

const LoadingNewIssuePage = () => {
  return (
    <Box>
      <Skeleton />
      <Skeleton height={"30rem"} />
      <Skeleton />
    </Box>
  );
};

export default LoadingNewIssuePage;
