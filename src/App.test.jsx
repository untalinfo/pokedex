import React from "react";
import { render } from "@testing-library/react";
import ExampleComponent from "./domains/exampleDomain/presentation/components/ExampleComponent";

describe('When everything is OK', () => {
	test('should render', async () => {
		expect(false).toBe(false);
		render(<ExampleComponent title="React" />);
	});
});
