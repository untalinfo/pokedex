export const importFiles = async (importPaths) => {
	const importPathArray = Object.values(importPaths).map((importPath) => importPath());
	const result = await Promise.all(importPathArray.map((path) => path));
	return result;
};

export default {};
