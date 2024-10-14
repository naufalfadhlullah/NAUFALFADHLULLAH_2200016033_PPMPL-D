const sinon = require("sinon");
const { expect } = require("chai");
const Service = require("../src/service");
const PrimaryRepository = require("../src/repository");
const SecondaryRepository = require("../src/secondaryRepository");
const { describe } = require("mocha");

describe("Service Integration Tests with Multiple Stubs", () => {
  let service;
  let primaryRepositoryStub;
  let secondaryRepositoryStub;

  beforeEach(() => {
    primaryRepositoryStub = sinon.createStubInstance(PrimaryRepository);
    secondaryRepositoryStub = sinon.createStubInstance(SecondaryRepository);
    service = new Service();
    service.primaryRepository = primaryRepositoryStub;
    service.secondaryRepository = secondaryRepositoryStub;
  });

  it("Should return item from primary repository if found", () => {
    const item = { id: 1, name: "Item 1" };
    primaryRepositoryStub.getItemById.withArgs(1).returns(item);
    const result = service.getItemById(1);

    expect(result).to.equal(item);
    expect(primaryRepositoryStub.getItemById.calledOnceWith(1)).to.be.true;
    expect(secondaryRepositoryStub.getItemById.notCalled).to.be.true;
  });

  it("Should return item from secondary repository if not found in primary", () => {
    primaryRepositoryStub.getItemById.withArgs(3).returns(null);
    const item = { id: 3, name: "Item 3" };
    secondaryRepositoryStub.getItemById.withArgs(3).returns(item);
    const result = service.getItemById(3);

    expect(result).to.equal(item);
    expect(primaryRepositoryStub.getItemById.calledOnceWith(3)).to.be.true;
    expect(secondaryRepositoryStub.getItemById.calledOnceWith(3)).to.be.true;
  });

  it("Should throw an Error if item is not found in both repositories", () => {
    primaryRepositoryStub.getItemById.returns(null);
    secondaryRepositoryStub.getItemById.returns(null);

    expect(() => service.getItemById(5)).to.throw(
      "Item not found in both repositories"
    );
    expect(primaryRepositoryStub.getItemById.calledOnceWith(5)).to.be.true;
    expect(secondaryRepositoryStub.getItemById.calledOnceWith(5)).to.be.true;
  });

  it("Should remove item from primary repository if found", () => {
    const item = { id: 2, name: "Item 2" };
    primaryRepositoryStub.removeItemById.withArgs(2).returns(item);

    const result = service.removeItemById(2);

    expect(result).to.equal(item);
    expect(primaryRepositoryStub.removeItemById.calledOnceWith(2)).to.be.true;
    expect(secondaryRepositoryStub.removeItemById.notCalled).to.be.true;
  });

  it("Should remove item from secondary repository if not found in primary", () => {
    primaryRepositoryStub.removeItemById.withArgs(3).returns(null);
    const item = { id: 3, name: "Item 3" };
    secondaryRepositoryStub.removeItemById.withArgs(3).returns(item);
    const result = service.removeItemById(3);

    expect(result).to.equal(item);
    expect(primaryRepositoryStub.removeItemById.calledOnceWith(3)).to.be.true;
    expect(secondaryRepositoryStub.removeItemById.calledOnceWith(3)).to.be.true;
  });
});