const fetchTabs = (key) => {
	const tabs = JSON.parse(localStorage.getItem(key));
	return tabs || null;
};

const sortTabs = (savedTabsArray, tabs) => {
	if (savedTabsArray) {
		const sortedTabs = Array(savedTabsArray.length);

		savedTabsArray.forEach((tabName, index) => {
			sortedTabs[index] = tabs.find((tab) => tab.title == tabName) || null;
		});

		return sortedTabs;
	}

	return tabs;
};

export { fetchTabs, sortTabs };
