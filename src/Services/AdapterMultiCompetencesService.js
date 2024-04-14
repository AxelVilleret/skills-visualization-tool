function convertFormatAtoB(dataArray, inputDate, root, metric) {
    
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
            return new Date(b.timestamp) - new Date(a.timestamp)
        }
        );

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
            tree.value = tree.children.reduce((acc, child) => acc + child.value, 0) / tree.children.length;
        } else {
            let closestDate = findClosestDate(data.updates);
            // If the data is a leaf, add the updates to the tree
            switch (metric) {
                case "mastery":
                    tree.value = data.updates[closestDate].mastery;
                    break;
                case "trust":
                    tree.value = data.updates[closestDate].trust;
                    break;
                case "cover":
                    tree.value = data.updates[closestDate].cover;
                    break;
                default:
                    tree.value = data.updates[closestDate].mastery;
                    break;
            }
        }
        return tree;
    }

    // Use the function to build the tree from your data
    if (root) {
        return buildTree(findNodeByName(dataArray, root));
    }
    return buildTree(dataArray[0]);
}

export { convertFormatAtoB };