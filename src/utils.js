// Utility functions
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function isLeaf(node) {
    return node.children?.length === 0;
}

const findNode = (node, nodeName) => {
    if (node.name === nodeName) {
        return node;
    }
    if (node.children) {
        for (let child of node.children) {
            const found = findNode(child, nodeName);
            if (found) {
                return found;
            }
        }
    }
    return null;
};

function findClosestDate(updates, inputDate) {
    let date = new Date(inputDate);
    updates.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return updates.findIndex(update => new Date(update.timestamp) <= date);
}

function findNodeByName(data, name) {
    return data.find(node => node.name === name) || null;
}

// Main functions
function findRoot(dataArray) {
    const childSet = new Set();
    dataArray.forEach((item) => {
        item.children.forEach((child) => {
            childSet.add(child);
        });
    });
    return dataArray.find((item) => !childSet.has(item.name)).name;
}

function adaptDataFormat(dataArray, inputDate, root) {
    if (!dataArray) {
        return {};
    }

    function buildTree(data) {
        let tree = {};

        if (data.name) {
            tree.name = data.name;
        }

        if (!isLeaf(data)) {
            tree.children = data.children.map(child => buildTree(findNodeByName(dataArray, child)));
            tree.value = tree.children.reduce((acc, child) => {
                acc.mastery += child.value.mastery;
                acc.trust += child.value.trust;
                acc.cover += child.value.cover;
                return acc;
            }, { mastery: 0, trust: 0, cover: 0 });

            tree.value.mastery /= tree.children.length;
            tree.value.trust /= tree.children.length;
            tree.value.cover /= tree.children.length;
        } else {
            let closestDate = findClosestDate(data.updates, inputDate);
            tree.value = {
                mastery: data.updates[closestDate].mastery,
                trust: data.updates[closestDate].trust,
                cover: data.updates[closestDate].cover
            };
        }
        return tree;
    }

    if (root) {
        return buildTree(findNodeByName(dataArray, root));
    }
    return buildTree(dataArray[0]);
}

function updateTreeValues(tree, metric) {
    if (!tree) {
        return null;
    }

    const clonedTree = deepClone(tree);

    function updateValue(node) {
        if (node.children) {
            node.children.forEach(child => updateValue(child));
        }
        if (node.value) {
            node.value = node.value[metric];
        }
    }

    updateValue(clonedTree);

    return clonedTree;
}

export { adaptDataFormat, updateTreeValues, findRoot, findNode, deepClone, isLeaf, findClosestDate, findNodeByName };
