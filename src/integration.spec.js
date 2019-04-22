//@ts-check
import { FilterBarManager } from "./FilterBarManager";
import { createNameFilterConfiguration } from "./FilterConfigurations";

describe("Filter Bar Manager", () => {
  describe("name filter", () => {
    const manager = new FilterBarManager();
    const nameFilter = createNameFilterConfiguration(manager);
    manager.addFilterConfiguration(nameFilter);
    manager.applyFilter(nameFilter, "some value");
    expect(manager.getQuery(undefined)).toEqual({name: "some value"});
  });
});