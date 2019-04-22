//@ts-check
import { FilterBarManager } from "./FilterBarManager";
import { createNameFilterConfiguration } from "./FilterConfigurations";
import { SimpleModelFieldFilterConfiguration } from "./SimpleModelFieldFilterConfiguration";
describe("Filter Bar Manager", () => {
  describe("name filter", () => {
    /**
     * @type FilterBarManager
     */
    let manager;
    /**
     * @type {SimpleModelFieldFilterConfiguration}
     */
    let nameFilter;
    beforeEach(() => {
      manager = new FilterBarManager();
      nameFilter = createNameFilterConfiguration(manager);
      manager.addFilterConfiguration(nameFilter);
    });
    it("queries like ?name=value", () => {
      manager.applyFilter(nameFilter, "some value");
      expect(manager.getQuery()).toEqual({ name: "some value" });
    });
    it("removes itself", () => {
      manager.applyFilter(nameFilter, "some value");
      manager.clearFilter(nameFilter);
      expect(manager.getQuery()).not.toHaveProperty("name");
    });
    it(`adds a chip of [Name: value]`, () => {
      const chips = manager.chips;
      manager.applyFilter(nameFilter, "some value");
      expect(manager.chips).not.toBe(chips);
      expect(manager.chips).toContainEqual({
        left: "Name",
        right: "some value",
        filterConfiguration: nameFilter
      });
    });
    it("removes the chip", () => {
      manager.applyFilter(nameFilter, "some value");
      const chips = manager.chips;
      manager.clearFilter(nameFilter);
      expect(manager.chips).not.toContainEqual({
        left: "Name",
        right: "some value",
        filterConfiguration: nameFilter
      });
    });
    it("associates from its own query", () => {
      manager.applyFilter(nameFilter, "some value");
      const query = manager.getQuery();
      const newManager = new FilterBarManager();
      const newNameFilter = createNameFilterConfiguration(newManager);
      newManager.loadFromQuery(query);
      // TODO: this is a weird way to assert that a particular filter is
      // active. . .
      expect(manager.chips).toContainEqual({
        left: "Name",
        right: "some value",
        filterConfiguration: nameFilter
      });
    });
  });
});
