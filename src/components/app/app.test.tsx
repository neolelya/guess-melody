import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {App} from './app';
import {NameSpace} from '../../reducer/name-space';
import {AuthorizationStatus} from '../../reducer/user/user';
import {GameType, QuestionArtist, QuestionGenre} from '../../types';

export const noop = () => {
  //  do nothing
};

const mockStore = configureStore([]);

const questions: (QuestionArtist | QuestionGenre)[] = [
  {
    type: GameType.GENRE,
    genre: `rock`,
    answers: [
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `rock`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `blues`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `jazz`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `rock`,
      },
    ],
  },
  {
    type: GameType.ARTIST,
    song: {
      artist: `Jim Beam`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    },
    answers: [
      {
        picture: `https://api.adorable.io/avatars/128/1`,
        artist: `John Snow`,
      },
      {
        picture: `https://api.adorable.io/avatars/128/2`,
        artist: `Jack Daniels`,
      },
      {
        picture: `https://api.adorable.io/avatars/128/3`,
        artist: `Jim Beam`,
      },
    ],
  },
];

describe(`Render App`, () => {
  it(`Render WelcomeScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 0,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              maxMistakesCount={3}
              mistakes={0}
              questions={questions}
              onUserAnswer={noop}
              onWelcomeButtonClick={noop}
              step={-1}
              resetGame={noop}
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              login={noop}
            />
          </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render GenreQuestionScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 0,
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              maxMistakesCount={3}
              mistakes={0}
              questions={questions}
              onUserAnswer={noop}
              onWelcomeButtonClick={noop}
              step={0}
              resetGame={noop}
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              login={noop}
            />
          </Provider>,
          {
            createNodeMock: () => {
              return {};
            },
          }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render ArtistQuestionScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 0,
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              maxMistakesCount={3}
              mistakes={0}
              questions={questions}
              onUserAnswer={noop}
              onWelcomeButtonClick={noop}
              step={1}
              resetGame={noop}
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              login={noop}
            />
          </Provider>,
          {
            createNodeMock: () => {
              return {};
            },
          }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render GameOverScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 3,
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              maxMistakesCount={3}
              mistakes={3}
              questions={questions}
              onUserAnswer={noop}
              onWelcomeButtonClick={noop}
              step={1}
              resetGame={noop}
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              login={noop}
            />
          </Provider>,
          {
            createNodeMock: () => {
              return {};
            },
          }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render WinScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 3,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              maxMistakesCount={3}
              mistakes={0}
              questions={questions}
              onUserAnswer={noop}
              onWelcomeButtonClick={noop}
              step={3}
              resetGame={noop}
              authorizationStatus={AuthorizationStatus.AUTH}
              login={noop}
            />
          </Provider>,
          {
            createNodeMock: () => {
              return {};
            },
          }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render AuthorizationScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 3,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              maxMistakesCount={3}
              mistakes={0}
              questions={questions}
              onUserAnswer={noop}
              onWelcomeButtonClick={noop}
              step={3}
              resetGame={noop}
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              login={noop}
            />
          </Provider>,
          {
            createNodeMock: () => {
              return {};
            },
          }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});