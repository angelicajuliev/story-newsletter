import { FunctionComponent, useEffect } from "react";
import { categoryApi } from "@data/api";
import SelectCategory from "./SelectCategory";

import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_ERROR,
  FETCH_CATEGORIES_SUCCESS,
} from "@data/state/ActionConstants";

import {
  useNewsletterDispatch,
  useNewsletterState,
} from "@data/state/NewsletterContext";

type SelectCategoryProps = {
  control: any;
  label?: string;
  extraOptions?: { label: string; value: string }[];
};
const SelectCategoryC: FunctionComponent<SelectCategoryProps> = (props) => {
  const state = useNewsletterState();
  const dispatch = useNewsletterDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: FETCH_CATEGORIES });

      try {
        const response = await categoryApi.list();
        const categories = response?.data;

        dispatch({
          type: FETCH_CATEGORIES_SUCCESS,
          payload: categories,
        });
      } catch (error) {
        dispatch({
          type: FETCH_CATEGORIES_ERROR,
          payload: "Error getting the category list",
        });
      }
    };

    fetchData();
  }, [dispatch]);

  const buildCategoryOptions = () => {
    const categories = state.categories ?? [];
    const options = categories.map((category) => ({
      label: category.name,
      value: category.id.toString(),
    }));

    return [...options, ...(props.extraOptions ?? [])];
  };

  return <SelectCategory categoryOptions={buildCategoryOptions()} {...props} />;
};

export default SelectCategoryC;
