import React from 'react';
import renderer from 'react-test-renderer';
import AuthorizationScreen from './authorization-screen.jsx';

it(`Should AuthorizationScreen render correctly`, () => {
  const tree = renderer
    .create(
        <AuthorizationScreen onSubmit={() => {}} onReplayButtonClick={() => {}} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
