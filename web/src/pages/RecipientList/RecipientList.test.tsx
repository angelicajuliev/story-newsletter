import { render, screen } from "@testing-library/react";
import RecipientListC from "./RecipientListC";
import { withMockProviders } from "src/tests/withMockProviders";

describe("RecipientList", () => {
  it("renders the list of recipients", () => {
    render(withMockProviders(RecipientListC));

    expect(screen.getByText("mock@email.com")).toBeInTheDocument();
    expect(screen.getByText("mock2@randomemail.com")).toBeInTheDocument();
  });
});
