import { fetchData } from "./FetchDataService";

const fetchTreeData = async () => {
	let data = [];
	try {
		let formattedData;

		data = await fetchData();

		const root = findRoot(data);

		formattedData = {
			name: root.name,
			toggled: true,
			children: buildChildrenFromNode(data, root),
		};

		return formattedData;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
	return data;
};

function buildChildrenFromNode(data, node) {
	if (isLeaf(node)) return [];
	else {
		return node.children.map((childName) => ({
			name: childName,
			children: buildChildrenFromNode(data, findNodeByName(data, childName)),
		}));
	}
}

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
	const root = dataArray.find((item) => !childSet.has(item.name));

	return root;
}

function findNodeByName(data, name) {
	const foundNode = data.find((node) => node.name === name);
	return foundNode || null;
}

function isLeaf(node) {
	if (!node) {
		return true;
	}
	return node.children?.length === 0;
}

const findUpdatesByNodeName = async (name) => {
	let data = [];

	try {
		data = await fetchData();

		const node = findNodeByName(data, name);
		if (!node) {
			return {
				mastery: "-",
				trust: "-",
				cover: "-",
			};
		}
		const updatesLength = node.updates.length;

		return {
			mastery: Number(node.updates[updatesLength - 1].mastery * 100),
			trust: Number(node.updates[updatesLength - 1].trust * 100),
			cover: Number(node.updates[updatesLength - 1].cover * 100),
		};
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};
export { fetchTreeData, findUpdatesByNodeName };
