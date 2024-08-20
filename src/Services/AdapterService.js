function findRoot(dataArray) {
    // Create a set to store all child names
    const childSet = new Set();

    // Iterate through the dataArray and add all children to the set
    dataArray.forEach((item) => {
        item.children.forEach((child) => {
            childSet.add(child);
        });
    });

    // Find the element that is not in the set, i.e., the root
    const root = dataArray.find((item) => !childSet.has(item.name)).name;

    return root;
}

function adaptDataFormat(dataArray, inputDate, root) {

    if (!dataArray) {
        return {};
    }

    // Convert inputDate to a Date object
    let date = new Date(inputDate);

    function isLeaf(node) {
        return node.children?.length === 0;
    }

    // Function to find the closest date
    function findClosestDate(updates) {
        // Sort updates by date in descending order
        updates.sort((a, b) => {
            return new Date(b.timestamp) - new Date(a.timestamp);
        });

        // Find the update with the most recent date that is not after the input date
        return updates.findIndex(update => new Date(update.timestamp) <= date);
    }

    function findNodeByName(data, name) {
        const foundNode = data.find(node => node.name === name);
        return foundNode || null;
    }

    // Function to build the tree
    function buildTree(data) {
        let tree = {};

        // If the data has a name, add it to the tree
        if (data.name) {
            tree.name = data.name;
        }

        // If the data has children, recursively build the tree for each child
        if (!isLeaf(data)) {
            tree.children = data.children.map(child => buildTree(findNodeByName(dataArray, child)));
            tree.value = tree.children.reduce((acc, child) => {
                acc.mastery += child.value.mastery;
                acc.trust += child.value.trust;
                acc.cover += child.value.cover;
                return acc;
            }, { mastery: 0, trust: 0, cover: 0 });

            // Average the values
            tree.value.mastery /= tree.children.length;
            tree.value.trust /= tree.children.length;
            tree.value.cover /= tree.children.length;
        } else {
            let closestDate = findClosestDate(data.updates);
            // If the data is a leaf, add the updates to the tree
            tree.value = {
                mastery: data.updates[closestDate].mastery,
                trust: data.updates[closestDate].trust,
                cover: data.updates[closestDate].cover
            };
        }
        return tree;
    }

    
    // Use the function to build the tree from your data
    if (root) {
        const tree = buildTree(findNodeByName(dataArray, root));
        return tree;
    }
    return buildTree(dataArray[0]);
}

function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function updateTreeValues(tree, metric) {
    if (!tree) {
        return null;
    }

    // Clone profondément l'arbre pour ne pas modifier l'original
    const clonedTree = deepClone(tree);

    // Fonction pour mettre à jour la valeur en fonction du metric
    function updateValue(node) {
        if (node.children) {
            node.children.forEach(child => updateValue(child));
        }
        if (node.value) {
            node.value = node.value[metric];
        }
    }

    // Démarre la mise à jour de l'arbre depuis la racine
    updateValue(clonedTree);

    return clonedTree; // Retourne l'arbre modifié
}




export { adaptDataFormat, updateTreeValues, findRoot };
