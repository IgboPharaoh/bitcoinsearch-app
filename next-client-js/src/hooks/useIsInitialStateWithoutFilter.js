import { useRouter } from "next/router";
import useSearchContext from "./useSearchContext";
import useSearchQuery from "./useSearchQuery";
import { generateFilterQuery } from "@/service/URLManager/helper";

const useIsInitialStateWithoutFilter = () => {
  let hiddenBody = true;
  let hiddenHomeFacet = true;

  const { searchQuery, queryResult } = useSearchQuery();
  const router = useRouter()

  const hasFilters = generateFilterQuery(router.asPath.slice(1)).length
  
  const resultLength = queryResult.data?.hits?.total?.value;
  
  if (
    resultLength && (searchQuery || hasFilters)
  ) {
    hiddenBody = false;
  }

  if (searchQuery) {
    hiddenHomeFacet = false;
  }
  // if (state) {
  //   if (
  //     resultLength &&
  //     (searchQuery ||
  //       (state.filters.length && state.results?.length))
  //   ) {
  //     hiddenBody = false;
  //   }
  //   // hide facet if there is a searchquery
  //   if (!searchQuery) {
  //     hiddenHomeFacet = false;
  //   }
  // }
  return { hiddenBody, hiddenHomeFacet };
};

export default useIsInitialStateWithoutFilter;
