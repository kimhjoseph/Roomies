import ChoreList from './ChoreList.js';
 const renderer = require('react-test-renderer');
 const React = require('react');


test('snapshot tests chore list', () => {
	const component = renderer.create(<ChoreList />,);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
