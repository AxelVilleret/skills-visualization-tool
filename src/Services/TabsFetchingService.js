import { localStorageService } from "./LocalStorageService";

const fetchTabs = (key) => {
	return localStorageService.getItem(key);
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
