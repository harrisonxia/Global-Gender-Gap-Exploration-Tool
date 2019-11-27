#Global Gender Gap Exploration Tool

To run:
- if you have `yarn` installed, run `yarn` in this directory to install all the dependencies.
- `yarn start` to run.

Project is live at viz.devxia.com


`src/js/components/Apps.jsx` is the entry point of the project, where is called all the related components.

`src/js/components/` contains all the visual components and some of the interactive logic.

`src/js/reducers/index.js` contains the rest of the logic behind all the interactivity. 

Tech stack:
- react
- redux for all the state management
- nivo for most of the visuals, some D3 apis were called.