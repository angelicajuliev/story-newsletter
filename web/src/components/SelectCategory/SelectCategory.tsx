import Select from "@components/Select/Select";
import { FunctionComponent } from "react";

type SelectCategoryProps = {
  control: any;
  categoryOptions: { label: string; value: string }[];
};
const SelectCategory: FunctionComponent<SelectCategoryProps> = ({
  control,
  categoryOptions,
  ...rest
}) => (
  <Select
    name="category"
    label="Category"
    control={control}
    options={categoryOptions}
    {...rest}
  />
);

export default SelectCategory;
