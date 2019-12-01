import App from './App.js';
 const renderer = require('react-test-renderer');
 const React = require('react');


test('fake test', () => {
  expect(true).toBeTruthy();
});

test('snapshot tests', () => {
	const component = renderer.create(<App />,);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
