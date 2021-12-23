import { useLocation } from "react-router-dom";

// HOOK PERSONALIZADO

export function useQuery() {
  // const location = useLocation();
  // console.log("location", location.search); // Same
  // console.log(useLocation().search); // Same

  const { search } = useLocation();
  return new URLSearchParams(search);
}
