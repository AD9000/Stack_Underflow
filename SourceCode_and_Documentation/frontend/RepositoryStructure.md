# Repository Structure

A tree diagram of the repository is as follows:

```
frontend/
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── README.md
├── src
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── assets
│   │   ├── globe.png
│   │   ├── playButton.png
│   │   └── reef.jpeg
│   ├── components
│   │   ├── Context
│   │   │   ├── AppContext.tsx
│   │   │   └── AuthContext.tsx
│   │   ├── CreateTag
│   │   │   ├── CreateTagButton.tsx
│   │   │   ├── CreateTagForm
│   │   │   │   ├── ImagePreview.tsx
│   │   │   │   └── index.tsx
│   │   │   └── CreateTagHook.tsx
│   │   ├── Interfaces.tsx
│   │   ├── LoginForm.tsx
│   │   ├── Map
│   │   │   ├── Animate.tsx
│   │   │   ├── index.tsx
│   │   │   ├── MapComponents.tsx
│   │   │   └── MaxBounds.tsx
│   │   ├── Navbar
│   │   │   ├── DashboardNav.tsx
│   │   │   ├── HomeNav.tsx
│   │   │   └── NavBar.tsx
│   │   ├── Profile
│   │   │   ├── MyProfile.tsx
│   │   │   └── MyTags.tsx
│   │   ├── RegisterDialog.tsx
│   │   ├── Sidebar
│   │   │   └── Sidebar.tsx
│   │   ├── Spotify-Api
│   │   │   ├── MusicPlayer.tsx
│   │   │   ├── spotifyApi.tsx
│   │   │   └── SpotifyLogin.tsx
│   │   └── Tag
│   │       ├── TagList.tsx
│   │       ├── TagPreviewList.tsx
│   │       ├── TagPreview.tsx
│   │       └── TagView.tsx
│   ├── DummyData.tsx
│   ├── helpers
│   │   ├── api.ts
│   │   └── token.ts
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── pages
│   │   ├── AboutPage.tsx
│   │   ├── Dashboard.tsx
│   │   ├── HelpPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── Profile.tsx
│   │   ├── RegisterSuccess.tsx
│   │   └── Settings.tsx
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
├── tsconfig.json
└── yarn.lock
```

## Details

We follow a standard ReactJs frontend structure

### package.json

- contains the packages needed for the application

### public/

- folder contains the static part of the site, such as the html file that loads all of the react components, and the logos, and robots.txt

### src/

This folder contains most of the code that is used to run the frontend, along with the CSS files used.

We use Material UI's makeStyles (https://material-ui.com/styles/basics/) hook, which is a version of "CSS-in-JS" concept, which means there aren't many CSS files in the whole app. Instead we have useStyles() function that contain styles relating to one component.

**_Note: For more details, each component exported has a comment that explains its use if needed_**

From a high level point of view, some of the main files/folders from our app are:

- index.tsx
  - Entry Point into the app, renders the main app
- App.tsx
  - The wrapper around our main app. It contains the router that lets the user view different pages while letting us make our app a the single page app (SPA)
- helpers/
  - This folder contains some utility functions used in our app, along with a connector to the backend's api, so we can decouple the api itself from any of the frontend code.
- pages/
  - This folder contains all the pages that are part of the app. eg: The Home/Landing page, Dashboard, Profile page and so on.
- components/
  - The components folder contains all the reusable react components that we then reuse throughout the app. eg: the Tag, Navbar, Sidebar, Map etc.
- context/
  - This folder exports the AppContext which is used to maintain the global state of the app. It acts as a lightweight version of Redux (although they are very different in how they work) and works very well along with the Single Page Application structure. For more information, have a look at https://reactjs.org/docs/context.html
