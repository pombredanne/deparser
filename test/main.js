const {expect} = require('chai');
const Deparser = require('../lib/Deparser');

// Test suite
describe('Deparser dependency tests', () => {
  const deparserInstance = new Deparser('test/fixture/package.json', 'test/fixture/yarn.lock');

  it('Direct dependency test', () => {
    const directs = deparserInstance.getDirectDependencies();
    const treeJSON = deparserInstance.getDependencyTree();
    expect(directs).to.have.lengthOf(treeJSON.length);
    expect(directs[0].name).to.equal(treeJSON[0].name);
    expect(directs[0].version).to.equal(treeJSON[0].version);
    expect(directs[1].name).to.equal(treeJSON[1].name);
    expect(directs[1].version).to.equal(treeJSON[1].version);
    expect(directs[1].version).to.equal(treeJSON[1].version);
  });

  it('Package.json intents test', () => {
    const intents = deparserInstance.getAllIntents();
    expect(intents).to.have.lengthOf(5);
    expect(intents).to.have.members(
      ['moment@^2.22.2', 'react@^16.4.2', 'mocha@^5.2.0', 'fsevents@^1.2.4', 'jsonfile@^5.0.0']
    );
  });

  it ('Root package has root set to true', () => {
    expect(deparserInstance.getRootPackage().root).to.equal(true);
  });

  it('Dependency tree to include run time dependencies', () => {
    const dependencyTree = deparserInstance.getDependencyTree();
    const dependencies = dependencyTree.filter(dep => dep.dependencyType === 'dependency');
    expect(dependencies).to.have.lengthOf(3);
  });

  it('Dependency tree to include dev dependencies', () => {
    const dependencyTree = deparserInstance.getDependencyTree();
    const dependencies = dependencyTree.filter(dep => dep.dependencyType === 'devDependency');
    expect(dependencies).to.have.lengthOf(1);
    expect(dependencies[0].name).to.equal('mocha');
    expect(dependencies[0].version).to.equal('5.2.0');
  });

  it('Dependency tree to include optional dependencies', () => {
    const dependencyTree = deparserInstance.getDependencyTree();
    const dependencies = dependencyTree.filter(dep => dep.dependencyType === 'optionalDependency');
    expect(dependencies).to.have.lengthOf(1);
    expect(dependencies[0].name).to.equal('fsevents');
    expect(dependencies[0].version).to.equal('1.2.4');
  });

  it('Dependency graph to include dev dependencies', () => {
    const dependencyGraph = deparserInstance.getDependencyGraph();
    const dependencies = dependencyGraph.modules.filter(dep => dep.dependencyType === 'devDependency');
    expect(dependencies).to.have.lengthOf(1);
    expect(dependencies[0].name).to.equal('mocha');
    expect(dependencies[0].version).to.equal('5.2.0');
  });

  it('Dependency graph to include optional dependencies', () => {
    const dependencyGraph = deparserInstance.getDependencyGraph();
    const dependencies = dependencyGraph.modules.filter(dep => dep.dependencyType === 'optionalDependency');
    expect(dependencies).to.have.lengthOf(1);
    expect(dependencies[0].name).to.equal('fsevents');
    expect(dependencies[0].version).to.equal('1.2.4');
  });
  
});